import { Request, Response } from "express";
import User from "../Entities/User";


export class UserController {

    public static async save(req: Request, res: Response) {
        const hash = require("object-hash");

        const { name, dni, password } = req.body;
        
        const user = new User();
        user.name = name;
        user.dni = dni;
        user.pass = hash(password, {algorithm: 'sha3-512', encoding: 'base64'});

        try{
            await user.save();
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
