import { Container } from "inversify";
import TYPES from "./types";
import { UserController } from "./Infrastructure/Controllers/UserController";


var container = new Container();

// Controllers
container.bind<UserController>(UserController).toSelf();

export default container;
