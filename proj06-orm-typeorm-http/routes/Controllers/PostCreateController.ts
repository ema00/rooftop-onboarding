import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';
import { Category } from '../../orm/entity/Category';


export const createPost = async (req, res) => {
    const {title, content, categoryName, userId} = req.body;
    
    try {
        const post = new Post();
        post.title = title;
        post.content = content;

        const user = await User.findOne({ id: userId });
        if (user.id == userId) {
            post.craftedBy = user;
            res.status(201);
        }
        else {
            res.status(404);
        }

        let category = await Category.findOne({ name: categoryName });
        if (category) {
            post.category = category;
        }
        else {
            category = new Category();
            category.name = categoryName;
            await category.save();
            post.category = category; 
        }

        await post.save();
        res.json({post: post});
    }
    catch {
        res.status(500, "DB Error.");
    }
}
