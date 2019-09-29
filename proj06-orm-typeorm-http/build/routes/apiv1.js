"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("./Controllers/PostController");
const UserController_1 = require("./Controllers/UserController");
const UserController_2 = require("./Controllers/UserController");
const router = express_1.Router();
exports.router = router;
router.get('/user', UserController_2.readUser);
router.post('/user', UserController_1.createUser);
router.post('/post', PostController_1.createPost);
router.get('/post', PostController_1.listPosts);
router.get('/', (req, res) => {
    res.end('API Entry Point.');
});
//# sourceMappingURL=apiv1.js.map