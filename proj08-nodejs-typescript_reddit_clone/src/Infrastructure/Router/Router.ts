import { Express } from "express";
import { inject } from "inversify";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";
import { AuthenticationController } from "../Controllers/AuthenticationController";


class Router {

    private express: Express;
    private userController: UserController;
    private authenticationController: AuthenticationController;


    constructor(
        express: Express,
        @inject(AuthenticationController) authenticationController: AuthenticationController,
        @inject(UserController) userController: UserController
    ) {
        this.express = express;
        this.authenticationController = authenticationController;
        this.userController = userController;
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
        this.express.post('/users', this.userController.create);
        this.express.get('/users/:id', this.userController.read);
        this.express.patch('/users/:id', this.userController.update);
    }

    private setLoginRoutes() {
        this.express.post("/login", this.authenticationController.login);
        this.express.post("/logout",this.authenticationController.logout);
    }

}

export default Router;
