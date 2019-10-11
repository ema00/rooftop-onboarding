import { Request, Response, Express } from "express";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";
import { LoginController } from "../Controllers/LoginController";


class Router {

    private express: Express;


    constructor(express: Express) {
        this.express = express;
    }


    public init() {
        this.setUserRoutes();
        this.setLoginRoutes();
    }

    private setUserRoutes() {
        this.express.use(bodyParser());
        //this.express.get('/', function(req: Request,res: Response) {
        //})
        this.express.post('/users', UserController.save);
        this.express.get('/users/:id', UserController.read);
    }

    private setLoginRoutes() {
        this.express.use(bodyParser());
        this.express.post("/login", LoginController.getToken);
    }

}

export default Router;
