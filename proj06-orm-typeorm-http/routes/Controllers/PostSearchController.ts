import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';
import { Category } from '../../orm/entity/Category';


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
