import { isUndefined, isNull } from "util";
import { Like } from "typeorm";
import { injectable } from "inversify";
import PostService from "./PostService";
import User from "../../Domain/Entities/User";
import Post from "../../Domain/Entities/Post";


@injectable()
class PostServiceImpl implements PostService {

    private readonly MAX_PAGE_SIZE = 50;


	public async create(userId: number, title: string, content: string): Promise<Post> {
        const user = await User.findOne(userId);

        if (!user) { throw new Error().message = "Not valid User id."; }
		if (!title) { throw new Error().message = "Post title cannot be empty."; }
		if (!content) { throw new Error().message = "Post content cannot be empty."; }
		if (!user.canPost()) {
			throw new Error().message = "User has no privilege for creating a Post.";
		}

		const otherPostSameTitle = await Post.findOne({ where: { title: title } });
		if (otherPostSameTitle) { throw new Error().message = "Post title already exists"; }

		const post = new Post(title, content, user);
		await post.save();
		return post;
	}
    
    public async count(
		userId: number | undefined, title: string | undefined, content: string | undefined)
		: Promise<number> {
        
		const predicate: any = { };
		if (userId) { predicate.user = { id: userId }; }
		if (title) { predicate.title = Like(`%${title}%`); }
        if (content) { predicate.content = Like(`%${content}%`); }
        
		return await Post.count({ where: predicate });
	}

	public async find(
		userId: number | undefined, title: string | undefined, content: string | undefined,
		size: number | undefined, page: number | undefined): Promise<Post[]> {

        if (!isUndefined(size) && !isNull(size) && !isNaN(size) &&
            !isUndefined(page) && !isNull(page) && !isNaN(page)) {
            size = (0 < size && size <= this.MAX_PAGE_SIZE) ? size : this.MAX_PAGE_SIZE;
            page = (0 <= page) ? page : 0;
		}
		else {
			size = this.MAX_PAGE_SIZE;
			page = 0;
		}

		const predicate: any = { };
		if (userId) { predicate.user = { id: userId }; }
		if (title) { predicate.title = Like(`%${title}%`); }
        if (content) { predicate.content = Like(`%${content}%`); }
        
		return await Post.find({ where: predicate, take: size, skip: size * page });
	}

	public async findOne(id: number): Promise<Post | undefined> {
        return await Post.findOne(id, { relations: ["user"] });
    }
    
    public maxPageSize(): number {
        return this.MAX_PAGE_SIZE;
    }

}

export default PostServiceImpl;
