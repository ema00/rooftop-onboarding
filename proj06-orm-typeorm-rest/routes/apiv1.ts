import { Router } from 'express'
import { createPost, listPosts } from './Controllers/PostController';
import { createUser } from './Controllers/UserContoller';

const router = Router();

router.post('/user', createUser);
router.post('/post', createPost);
router.get('/post', listPosts);
router.get('/', (req, res) => {
    res.end('API Entry Point.');
})

export {router}
