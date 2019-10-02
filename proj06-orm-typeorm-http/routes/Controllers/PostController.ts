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


export const searchPosts = async (req, res) => {
    try {
        if (req.body.id) {
            await searchPostsForUser(req, res);
        }
        else if (req.body.categoryName) {
            await searchForPostsByCategory(req, res);
        }
        else {
            res.status(400);
        }
    }
    catch {
        res.status(500, "DB Error.");
    }
}


const searchPostsForUser = async (req, res) => {
    const id = req.body.id;
    const categoryName = req.body.categoryName;
    
    let user = (await User.find({ where: { id: id } }))[0];
    let posts = [];
    
    if (user) {
        if (categoryName) {
            let category = await Category.findOne({ where: { name: categoryName } });
            posts = await Post.find({ where: { user: user, category: category } });
        }
        else {
            posts = await Post.find({ where: { user: user } });
        }
            res.status(200);
        }
    else {
        res.status(404);
    }
    res.json(posts);
}


const searchForPostsByCategory = async (req, res) => {
    const categoryName = req.body.categoryName;
    
    let posts = [];
    
    let category = await Category.findOne({ where: { name: categoryName } });
    posts = await Post.find({ where: { category: category } });
    category ? res.status(200) : res.status(404);
    res.json(posts);
}
