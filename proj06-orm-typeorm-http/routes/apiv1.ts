import { Router } from 'express'
import { createPost } from './Controllers/PostCreateController';
import { searchPosts } from './Controllers/PostSearchController';
import { createUser } from './Controllers/UserCreateController';
import { searchUser } from './Controllers/UserSearchController';
import { searchPostContent } from './Controllers/PostContentController';


const router = Router();

router.post('/users', createUser);
router.get('/users', searchUser);
router.post('/posts', createPost);
router.get('/posts', searchPosts);
router.get('/content', searchPostContent);
router.get('/', (req, res) => {
    res.end('API Entry Point.');
})

export {router}
