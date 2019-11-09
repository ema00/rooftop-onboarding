import { Container } from "inversify";
import TYPES from "./types";
import UserController from "./Infrastructure/Controllers/UserController";
import AuthenticationController from "./Infrastructure/Controllers/AuthenticationController";
import PostController from "./Infrastructure/Controllers/PostController";
import HashService from "./Application/Services/HashService";
import UserService from "./Application/Services/UserService";
import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import UserServiceImpl from "./Application/Services/UserServiceImpl";


var container = new Container();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();
container.bind<PostController>(PostController).toSelf();

// Services
container.bind<HashService>(TYPES.HashService).to(HashServiceObjecthash);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

export default container;
