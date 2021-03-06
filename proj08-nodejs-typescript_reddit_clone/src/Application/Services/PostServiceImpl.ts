import { isNullOrUndefined } from "util";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import { Like } from "typeorm";
import PostService from "./PostService";
import PostRepository from "../../Domain/Repositories/PostRepository";
import UserRepository from "../../Domain/Repositories/UserRepository";
import Post from "../../Domain/Entities/Post";


@injectable()
class PostServiceImpl implements PostService {

	private readonly MAX_PAGE_SIZE = 50;
	
	private readonly postRepository: PostRepository;
	private readonly userRepository: UserRepository;


	constructor(
		@inject(TYPES.PostRepository) postRepository: PostRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository,
	) {
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}


	public async create(userId: number, title: string, content: string): Promise<Post> {
        const user = await this.userRepository.findOne(userId);

        if (!user) { throw new Error().message = "Not valid User id."; }
		if (!title) { throw new Error().message = "Post title cannot be empty."; }
		if (!content) { throw new Error().message = "Post content cannot be empty."; }
		if (!user.canPost()) {
			throw new Error().message = "User has no privilege for creating a Post.";
		}

		const otherPostSameTitle = await this.postRepository.findOne({ where: { title: title } });
		if (otherPostSameTitle) { throw new Error().message = "Post title already exists"; }

		const post = new Post(title, content, user);
		return this.postRepository.save(post);
	}
    
    public async count(
		userId: number | undefined, title: string | undefined, content: string | undefined
	): Promise<number> {
		const predicate: any = { };
		if (userId) { predicate.user = { id: userId }; }
		if (title) { predicate.title = Like(`%${title}%`); }
        if (content) { predicate.content = Like(`%${content}%`); }
		
		return this.postRepository.count({ where: predicate });
	}

	public async find(
		userId: number | undefined, title: string | undefined, content: string | undefined,
		size: number | undefined, page: number | undefined
	): Promise<Post[]> {
		if (!isNullOrUndefined(size) && !isNaN(size) && !isNullOrUndefined(page)&& !isNaN(page)) {
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
		
		return this.postRepository.find({ where: predicate, take: size, skip: size * page });
	}

	public async findOne(id: number): Promise<Post | undefined> {
        return this.postRepository.findOne(id, { relations: ["user"] });
    }
    
    public maxPageSize(): number {
        return this.MAX_PAGE_SIZE;
    }

}

export default PostServiceImpl;
