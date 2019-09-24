import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';
import { Category } from '../../orm/entity/Category';

export const createPost = async (req, res) => {

    // Get the Post data

    const {title, content, userId, category_name} = req.body;

    // Create the Post

    const post = new Post();
    post.title = title;
    post.content = content;

    // Get the User and Category entity,

    const user = await User.findOne({id: userId});
    
    if (user) { // Validar si existe el usuario!
      post.craftedBy = user;
    }
    else {
      res.status(404);
    }

    // const category = await Category({name: category});
    // Si no existe la categoria crearla
    // post.category = category;
    let category = await Category.findOne({name: category_name});

    if (category) {
      post.category = category;
    }
    else {
      category = new Category();
      category.name = category_name;
      category.save();
      post.category = category; 
    }

    // await post.save();

    // Respond

    res.json({ post: Post, message: "The post was created succesfully" });

}

export const listPosts = async (req, res) => {

  //const posts = Post.find();

  res.json({posts: "posts"});
}
