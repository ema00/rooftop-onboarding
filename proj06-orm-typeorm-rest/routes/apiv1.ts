import { Router } from 'express'
import { createPost, listPosts } from './Controllers/PostController';
import { createUser } from './Controllers/UserController';
import { searchUser } from './Controllers/UserController';


const router = Router();

router.get('/users', searchUser);
router.post('/users', createUser);
router.post('/posts', createPost);
router.get('/posts', listPosts);
router.get('/', (req, res) => {
    res.end('API Entry Point.');
})

export {router}
