import { Request, Response } from "express";
import { injectable } from "inversify";
import ValidatorCreateUser from "../Validators/ValidatorCreateUser";
import HashServiceObjecthash from "../Services/HashServiceObjecthash";
import HashService from "../../Application/Services/HashService";
import UserService from "../../Application/Services/UserService";
import UserServiceImpl from "../../Application/Services/UserServiceImpl";


@injectable()
export class UserController {

    private userService: UserService;
    private hashService: HashService;


    constructor() {
        this.hashService = new HashServiceObjecthash();
        this.userService = new UserServiceImpl(this.hashService);
    }


    public create = async (req: Request, res: Response) => {
        const { name, dni, password, role, email } = req.body;

        try {
            const validator = new ValidatorCreateUser(req);
            const errors = await validator.validationResult();
            if (errors.length == 0) {
                const user = await this.userService.create(name, Number(dni), password, role, email);
                res.status(201).json(user.toJson());
            }
            else {
                res.status(400).json(errors);
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public read = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await this.userService.findOne(Number(id));
            if (user) {
                res.status(200).json(user.toJson());
            }
            else {
                res.status(204).json();
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    
    public update = async (req: Request, res: Response) => {
        const { id, dni, email } = req.body;

        try {
            const user = await this.userService.update(id, dni, email);
            if (user) {
                res.status(200).json(user.toJson());
            }
            else {
                res.status(204).json();
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}
