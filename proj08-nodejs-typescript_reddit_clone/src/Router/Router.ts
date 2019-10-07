import { Request, Response, Express } from "express";
import bodyParser = require("body-parser");
import { UserController } from "../Controllers/UserController";


class Router {

    private express: Express;


    constructor(express: Express) {
        this.express = express;
    }


    public init() {
        this.setUserRoutes();
    }

    private setUserRoutes() {
        this.express.use(bodyParser());
        this.express.get('/', function(req: Request,res: Response) {
        })
        this.express.post('/users', UserController.save);
        this.express.get('/users/:id', UserController.read);
    }

}

export default Router;
