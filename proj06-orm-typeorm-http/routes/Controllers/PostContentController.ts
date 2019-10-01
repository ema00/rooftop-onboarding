import { Post } from '../../orm/entity/Post';
import {Like} from "typeorm";


export const searchPostContent = async (req, res) => {
    const content = req.body.content;

    try {
        const posts = await Post.find({ content: Like(`%${content}%`)});
        res.status(200).json({posts: posts});
    }
    catch {
        res.status(500, "DB Error");
    }
}
