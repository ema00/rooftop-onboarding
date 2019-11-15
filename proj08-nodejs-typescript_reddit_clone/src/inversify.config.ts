import { Container } from "inversify";
import TYPES from "./types";

import AuthenticationMiddleware from "./Infrastructure/Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "./Infrastructure/Middlewares/UserValidatorMiddleware";

import UserController from "./Infrastructure/Controllers/UserController";
import AuthenticationController from "./Infrastructure/Controllers/AuthenticationController";
import PostController from "./Infrastructure/Controllers/PostController";

import HashService from "./Application/Services/HashService";
import TokenService from "./Application/Services/TokenService";
import UserService from "./Application/Services/UserService";
import AuthenticationService from "./Application/Services/AuthenticationService";
import PostService from "./Application/Services/PostService";

import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import TokenServiceRandomjs from "./Infrastructure/Services/TokenServiceRandomjs";

import UserServiceImpl from "./Application/Services/UserServiceImpl";
import AuthenticationServiceImpl from "./Application/Services/AuthenticationServiceImpl";
import PostServiceImpl from "./Application/Services/PostServiceImpl";


var container = new Container();

// Middlewares
container.bind<AuthenticationMiddleware>(AuthenticationMiddleware).toSelf();
container.bind<UserValidatorMiddleware>(UserValidatorMiddleware).toSelf();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();
container.bind<PostController>(PostController).toSelf();

// Services
container.bind<HashService>(TYPES.HashService).to(HashServiceObjecthash);
container.bind<TokenService>(TYPES.TokenService).to(TokenServiceRandomjs);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceImpl);
container.bind<PostService>(TYPES.PostService).to(PostServiceImpl);

export default container;
