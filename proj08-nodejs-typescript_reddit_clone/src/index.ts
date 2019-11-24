import express, { Express } from "express";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { container, asyncContainerModule, syncContainerModule } from "./inversify.config";
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
    }
    

    public async run() {
        try {
            // This is necessary in order to set the DB connection before loading the bindings
            // ORM Repositories are obtained from DB connection, so DB connection is first
            await container.loadAsync(asyncContainerModule);
            container.load(syncContainerModule);
        }
        catch (error) {
            throw new Error().message = "Fail loading IoC container.";
        }
        finally {
            this.router = new Router(
                this.app,
                container.get(AuthenticationMiddleware),
                container.get(UserValidatorMiddleware),
                container.get(PostValidatorMiddleware),
                container.get(AuthenticationController),
                container.get(UserController),
                container.get(PostController)
            );
            this.startServer();
            this.router.init();
        }
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
