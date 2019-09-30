"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("../../orm/entity/Post");
const User_1 = require("../../orm/entity/User");
const Category_1 = require("../../orm/entity/Category");
exports.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Get the Post data
    const { title, content, userId, category_name } = req.body;
    // Create the Post
    const post = new Post_1.Post();
    post.title = title;
    post.content = content;
    // Get the User and Category entity,
    const user = yield User_1.User.findOne({ id: userId });
    if (user) { // Validar si existe el usuario!
        post.craftedBy = user;
    }
    else {
        res.status(404);
    }
    // const category = await Category({name: category});
    // Si no existe la categoria crearla
    // post.category = category;
    let category = yield Category_1.Category.findOne({ name: category_name });
    if (category) {
        post.category = category;
    }
    else {
        category = new Category_1.Category();
        category.name = category_name;
        category.save();
        post.category = category;
    }
    // await post.save();
    // Respond
    res.json({ post: Post_1.Post, message: "The post was created succesfully" });
});
exports.listPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    //const posts = Post.find();
    res.json({ posts: "posts" });
});
//# sourceMappingURL=PostController.js.map