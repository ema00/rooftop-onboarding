import { Request, Response, Express } from "express";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";
import { AuthController } from "../Controllers/AuthController";


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
        //this.express.use(bodyParser());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
    }

    private setUserRoutes() {
        this.express.post('/users', UserController.save);
        this.express.get('/users/:id', UserController.read);
    }

    private setLoginRoutes() {
        this.express.post("/authorize", AuthController.getToken);
    }

}

export default Router;
