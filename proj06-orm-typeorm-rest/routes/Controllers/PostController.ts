import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';

export const createPost = async (req, res) => {

    // Get the Post data

    const {title, content, userId, category} = req.body;

    // Create the Post

    const post = new Post();
    post.title = title;
    post.content = content;

    // Get the User and Category entity,

    const user = await User.findOne({id: userId});
    post.craftedBy = user;                    // Validar si existe el usuario!

    // const category = await Category({name: category});
    // Si no existe la categoria crearla
    // post.category = category;

    // await post.save();

    // Respond

    res.json({ post: Post, message: "The post was created succesfully" });

}

export const listPosts = async (req, res) => {

  //const posts = Post.find();

  res.json({posts: "posts"});
}
