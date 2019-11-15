import { Express } from "express";
import { inject } from "inversify";
import bodyParser = require("body-parser");
import AuthenticationMiddleware from "../Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "../Middlewares/UserValidatorMiddleware";
import AuthenticationController from "../Controllers/AuthenticationController";
import PostController from "../Controllers/PostController";
import UserController from "../Controllers/UserController";


class Router {

    private express: Express;
    private authenticationMiddleware: AuthenticationMiddleware;
    private userValidatorMiddleware: UserValidatorMiddleware;
    private authenticationController: AuthenticationController;
    private userController: UserController;
    private postController: PostController;


    constructor(
        express: Express,
        @inject(AuthenticationMiddleware) authenticationMiddleware: AuthenticationMiddleware,
        @inject(UserValidatorMiddleware) userValidatorMiddleware: UserValidatorMiddleware,
        @inject(AuthenticationController) authenticationController: AuthenticationController,
        @inject(UserController) userController: UserController,
        @inject(PostController) postController: PostController
    ) {
        this.express = express;
        this.authenticationMiddleware = authenticationMiddleware;
        this.userValidatorMiddleware = userValidatorMiddleware;
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
        this.express.post(
            "/users", this.userValidatorMiddleware.validateCreate, this.userController.create);
        this.express.use("/users/:id", this.authenticationMiddleware.redirectIfNotAuth);
        this.express.get("/users/:id", this.userController.read);
        this.express.patch(
            "/users/:id", this.userValidatorMiddleware.validateUpdate, this.userController.update);
    }

    private setLoginRoutes() {
        this.express.post("/login", this.authenticationController.login);
        this.express.post("/logout",this.authenticationController.logout);
    }

    private setPostRoutes() {
        this.express.use("/posts", this.authenticationMiddleware.redirectIfNotAuth);
        this.express.post("/posts", this.postController.create);
        this.express.get("/posts/:id",this.postController.read);
        this.express.get("/posts",this.postController.search);
    }

}

export default Router;
