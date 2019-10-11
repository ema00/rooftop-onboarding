import express, { Express } from "express";
import Router from "./Router/Router";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnectionDB } from "./Database/Configuration";


class App {

    private app: Express;
    private router: Router;


    constructor() {
        dotenv.config();
        this.app = express();
        createConnectionDB();
        this.router = new Router(this.app);
    }
    

    public run() {
        this.startServer();
        this.router.init();
    }

    private startServer() {
        const port = 3000;
        this.app.listen(port, function() {
            console.log("Server is run in port 3000");
        });
    }

}

const app = new App();
app.run();
