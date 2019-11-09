import express, { Express } from "express";
import "reflect-metadata";
import * as dotenv from "dotenv";
import container from "./inversify.config";
import { createConnectionDB } from "./Infrastructure/Database/Configuration";
import Router from "./Infrastructure/Router/Router";
import UserController from "./Infrastructure/Controllers/UserController";
import AuthenticationController from "./Infrastructure/Controllers/AuthenticationController";
import PostController from "./Infrastructure/Controllers/PostController";


class App {

    private app: Express;
    private router: Router;


    constructor() {
        dotenv.config();
        this.app = express();
        createConnectionDB();
        this.router = new Router(
            this.app,
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
            console.log("Server is run in port " + port);
        });
    }

}

const app = new App();
app.run();
