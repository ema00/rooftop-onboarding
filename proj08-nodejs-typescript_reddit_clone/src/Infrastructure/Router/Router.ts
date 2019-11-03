import { Express } from "express";
import { inject } from "inversify";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";
import { AuthenticationController } from "../Controllers/AuthenticationController";
import { PostController } from "../Controllers/PostController";


class Router {

    private express: Express;
    private userController: UserController;
    private authenticationController: AuthenticationController;
    private postController: PostController;


    constructor(
        express: Express,
        @inject(AuthenticationController) authenticationController: AuthenticationController,
        @inject(UserController) userController: UserController,
        @inject(PostController) postController: PostController
    ) {
        this.express = express;
        this.authenticationController = authenticationController;
        this.userController = userController;
        this.postController = postController;
    }


    public init() {
        this.setBodyParser();
        this.setUserRoutes();
        this.setLoginRoutes();
        this.setPostRoutes();
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

    private setPostRoutes() {
        this.express.post("/posts", this.postController.create);
        this.express.get("/posts",this.postController.read);
    }

}

export default Router;
