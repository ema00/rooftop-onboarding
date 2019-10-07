import express, { Request, Response, Express } from "express";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";


class Router {

    private express: Express;

    constructor(express: Express) {
        this.express = express;
    }

    public up() {
        this.userRouts()
    }

    private userRouts() {
        this.express.use(bodyParser());
        this.express.get('/', function(req: Request,res: Response) {
            
        })
        this.express.post('/user', UserController.store);
        this.express.get('/user/:id', UserController.show);
    }
}

export default Router;
