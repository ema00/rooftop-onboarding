import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import UserService from "../../Application/Services/UserService";


@injectable()
class UserController {

    private userService: UserService;


    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }


    public create = async (req: Request, res: Response) => {
        const { name, dni, password, role, email } = req.body;

        try {
            const user = await this.userService.create(name, Number(dni), password, role, email);
            res.status(201).json(user.toJson());
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    public read = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json();
            return;
        }

        try {
            const user = await this.userService.findOne(id);
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
        const id = Number(req.params.id);
        const userId = Number(req.headers["id"]);
        const { dni, email } = req.body;
        if (isNaN(id) || !userId || id !== userId) {
            res.status(400).json();
            return;
        }

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

export default UserController;
