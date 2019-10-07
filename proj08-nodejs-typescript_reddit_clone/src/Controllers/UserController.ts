import { Request, Response } from "express";
import User from "../Entity/User";


export class UserController {

    public static save(req: Request, res: Response) {
        const { name, dni } = req.body;

        const user = new User();
        user.name = name;
        user.dni = dni;

        try{
            user.save();
        } catch (error) {
            res.status(500).json(error);
        }
        
        res.status(200).json({ user });
    }

    public static async read(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne(id);
        res.status(200).json({ user });
    }

}
