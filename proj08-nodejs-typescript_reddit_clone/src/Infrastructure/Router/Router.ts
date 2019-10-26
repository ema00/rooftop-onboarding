import { Express } from "express";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";
import { AuthenticationController } from "../Controllers/AuthenticationController";


class Router {

    private express: Express;


    constructor(express: Express) {
        this.express = express;
    }


    public init() {
        this.setBodyParser();
        this.setUserRoutes();
        this.setLoginRoutes();
    }

    private setBodyParser() {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
    }

    private setUserRoutes() {
        this.express.post('/users', UserController.create);
        this.express.get('/users/:id', UserController.read);
        this.express.patch('/users/:id', UserController.update);
    }

    private setLoginRoutes() {
        this.express.post("/login", AuthenticationController.login);
        this.express.post("/logout", AuthenticationController.logout);
    }

}

export default Router;
