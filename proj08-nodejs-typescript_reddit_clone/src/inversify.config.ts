import { Container } from "inversify";
import TYPES from "./types";
import { UserController } from "./Infrastructure/Controllers/UserController";
import { AuthenticationController } from "./Infrastructure/Controllers/AuthenticationController";
import { PostController } from "./Infrastructure/Controllers/PostController";


var container = new Container();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();
container.bind<PostController>(PostController).toSelf();

export default container;
