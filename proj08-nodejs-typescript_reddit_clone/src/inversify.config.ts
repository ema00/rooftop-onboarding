import { Container } from "inversify";
import TYPES from "./types";
import UserController from "./Infrastructure/Controllers/UserController";
import AuthenticationController from "./Infrastructure/Controllers/AuthenticationController";
import PostController from "./Infrastructure/Controllers/PostController";
import HashService from "./Application/Services/HashService";
import TokenService from "./Application/Services/TokenService";
import UserService from "./Application/Services/UserService";
import AuthenticationService from "./Application/Services/AuthenticationService";
import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import TokenServiceRandomjs from "./Infrastructure/Services/TokenServiceRandomjs";
import UserServiceImpl from "./Application/Services/UserServiceImpl";
import AuthenticationServiceImpl from "./Application/Services/AuthenticationServiceImpl";


var container = new Container();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();
container.bind<PostController>(PostController).toSelf();

// Services
container.bind<HashService>(TYPES.HashService).to(HashServiceObjecthash);
container.bind<TokenService>(TYPES.TokenService).to(TokenServiceRandomjs);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceImpl);

export default container;
