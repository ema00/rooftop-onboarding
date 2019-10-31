import { Container } from "inversify";
import TYPES from "./types";
import { UserController } from "./Infrastructure/Controllers/UserController";
import { AuthenticationController } from "./Infrastructure/Controllers/AuthenticationController"


var container = new Container();

// Controllers
container.bind<UserController>(UserController).toSelf();
container.bind<AuthenticationController>(AuthenticationController).toSelf();

export default container;
