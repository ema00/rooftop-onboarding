import { isUndefined, isNull } from "util";
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import PostService from "../../Application/Services/PostService";


@injectable()
class PostController {

    private postService: PostService;


    constructor(@inject(TYPES.PostService) postService: PostService) {
        this.postService = postService;
    }

    
	public create = async (req: Request, res: Response) => {
        const { userId, title, content } = req.body;

        try {
            const post = await this.postService.create(userId, title, content);
            res.status(201).json(post.toJson());
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public search = async (req: Request, res: Response) => {
        const { userId, title, content } = req.body;
        let size = Number(req.body.size);
        let page = Number(req.body.page);
        const MAX_PAGE_SIZE = this.postService.maxPageSize();

        try {
            if (!isUndefined(size) && !isNull(size) && !isNaN(size) &&
                !isUndefined(page) && !isNull(page) && !isNaN(page)) {
                size = (0 < size && size <= MAX_PAGE_SIZE) ? size : MAX_PAGE_SIZE;
                page = (0 <= page) ? page : 0;
		    }
		    else {
			    size = MAX_PAGE_SIZE;
			    page = 0;
		    }
            const count = await this.postService.count(userId, title, content);
			const posts = await this.postService.find(userId, title, content, size, page);
            res.status(200).json({ posts: posts, size: size, page: page, total: count });
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public read = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const post = await this.postService.findOne(Number(id));
            if (post) {
                res.status(200).json(post.toJson());
            }
            else {
                res.status(204).json();
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}

export default PostController;
