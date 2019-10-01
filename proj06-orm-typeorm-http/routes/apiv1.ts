import { Router } from 'express'
import { createPost, searchPostsForUser } from './Controllers/PostController';
import { createUser } from './Controllers/UserController';
import { searchUser } from './Controllers/UserController';
import { searchPostContent } from './Controllers/PostContentController';


const router = Router();

router.post('/users', createUser);
router.get('/users', searchUser);
router.post('/posts', createPost);
router.get('/posts', searchPostsForUser);
router.get('/content', searchPostContent);
router.get('/', (req, res) => {
    res.end('API Entry Point.');
})

export {router}
