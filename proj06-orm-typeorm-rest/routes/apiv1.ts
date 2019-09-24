import { Router } from 'express'
import { createPost, listPosts } from './Controllers/PostController';

const router = Router()

router.post('/post', createPost);
router.get('/post', listPosts);

export {router}
