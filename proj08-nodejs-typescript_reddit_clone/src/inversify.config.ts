import { Container } from "inversify";
import TYPES from "./types";

import HashService from "./Application/Services/HashService";
import TokenService from "./Application/Services/TokenService";
import UserService from "./Application/Services/UserService";
import AuthenticationService from "./Application/Services/AuthenticationService";
import PostService from "./Application/Services/PostService";
import RepositoryFactory from "./Domain/Repositories/RepositoryFactory";

import UserServiceImpl from "./Application/Services/UserServiceImpl";
import AuthenticationServiceImpl from "./Application/Services/AuthenticationServiceImpl";
import PostServiceImpl from "./Application/Services/PostServiceImpl";

import AuthenticationMiddleware from "./Presentation/Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "./Presentation/Middlewares/UserValidatorMiddleware";
import PostValidatorMiddleware from "./Presentation/Middlewares/PostValidatorMiddleware";

import UserController from "./Presentation/Controllers/UserController";
import AuthenticationController from "./Presentation/Controllers/AuthenticationController";
import PostController from "./Presentation/Controllers/PostController";

import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import TokenServiceRandomjs from "./Infrastructure/Services/TokenServiceRandomjs";
import RepositoryFactoryImpl from "./Infrastructure/Persistence/RepositoryFactoryImpl";


var container = new Container();

// Middlewares
container.bind<AuthenticationMiddleware>(AuthenticationMiddleware).toSelf();
container.bind<UserValidatorMiddleware>(UserValidatorMiddleware).toSelf();
container.bind<PostValidatorMiddleware>(PostValidatorMiddleware).toSelf();

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

// Repository Factory
container.bind<RepositoryFactory>(TYPES.RepositoryFactory).to(RepositoryFactoryImpl).inSingletonScope();


export default container;
