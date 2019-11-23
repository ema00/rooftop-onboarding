import express, { Express } from "express";
import "reflect-metadata";
import * as dotenv from "dotenv";
import container from "./inversify.config";
import Router from "./Presentation/Router/Router";
import AuthenticationMiddleware from "./Presentation/Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "./Presentation/Middlewares/UserValidatorMiddleware";
import PostValidatorMiddleware from "./Presentation/Middlewares/PostValidatorMiddleware";
import UserController from "./Presentation/Controllers/UserController";
import AuthenticationController from "./Presentation/Controllers/AuthenticationController";
import PostController from "./Presentation/Controllers/PostController";


class App {

    private app: Express;
    private router: Router;


    constructor() {
        dotenv.config();
        this.app = express();
        this.router = new Router(
            this.app,
            container.get(AuthenticationMiddleware),
            container.get(UserValidatorMiddleware),
            container.get(PostValidatorMiddleware),
            container.get(AuthenticationController),
            container.get(UserController),
            container.get(PostController)
        );
    }
    

    public run() {
        this.startServer();
        this.router.init();
    }

    private startServer() {
        const port = 3000;
        this.app.listen(port, function() {
            console.log("Server is running in port " + port);
        });
    }

}

const app = new App();
app.run();
