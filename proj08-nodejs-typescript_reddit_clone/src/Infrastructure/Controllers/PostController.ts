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
        const { userId, title, content } = req.body;

        try {
            let predicate: any = { };
            if (userId) { predicate.user = { id: userId }; }
            if (title) { predicate.title = Like(`%${title}%`); }
            if (content) { predicate.content = Like(`%${content}%`); }

            let posts = await Post.find({ where: predicate });
            res.status(200).json(posts);
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
