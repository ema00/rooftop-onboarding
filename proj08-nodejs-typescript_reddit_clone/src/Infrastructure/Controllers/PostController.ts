import { Request, Response } from "express";
import { injectable } from 'inversify';
import Post from "../../Domain/Entities/Post";
import User from "../../Domain/Entities/User";
import UserRoleType from "../../Domain/Entities/UserRoleType";
import { Like } from "typeorm";


@injectable()
export class PostController {

	public async create(req: Request, res: Response) {
        const { userId, title, content } = req.body;

        try {
            const user = await User.findOneOrFail(userId);
            if (user.hasRoleType(UserRoleType.ADMIN) || user.hasRoleType(UserRoleType.ZEEPER)) {
                const post = new Post(title, content, user);
                await post.save();
                res.status(201).json(post.toJson());
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public async search(req: Request, res: Response) {
        const MAX_PAGE_SIZE = 50;
        const { userId, title, content } = req.body;
        let size = Number(req.body.size);
        let page = Number(req.body.page);

        try {
            const predicate: any = { };
            if (userId) { predicate.user = { id: userId }; }
            if (title) { predicate.title = Like(`%${title}%`); }
            if (content) { predicate.content = Like(`%${content}%`); }

            if (size !== undefined && page !== undefined && !isNaN(size) && !isNaN(page)) {
                size = (0 < size && size <= MAX_PAGE_SIZE) ? size : MAX_PAGE_SIZE;
                page = (0 <= page) ? page : 0;
            }
            else {
                size = MAX_PAGE_SIZE;
                page = 0;
            }

            const [posts, count] =
                await Post.findAndCount({ where: predicate, take: size, skip: size * page });
            res.status(200).json({ posts: posts, size: size, page: page, total: count });
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public async read(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const post = await Post.findOne(id, { relations: ["user"] });
            if (post) {
                res.status(200).json(post.toJson());
            }
            else {
                res.status(200).json();
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}

export default PostController;
