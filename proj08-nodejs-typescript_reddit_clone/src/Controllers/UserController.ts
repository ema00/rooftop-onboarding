import { Request, Response } from "express";
import User from "../Entities/User";


export class UserController {

    public static async save(req: Request, res: Response) {
        const hash = require("object-hash");

        const { name, dni, password } = req.body;
        
        const user = new User();
        console.log(user);
        user.name = name;
        user.dni = dni;
        user.pass = hash(password, { algorithm: 'sha3-512', encoding: 'base64' });

        try {
            await user.save();
            user.pass = "";
            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async read(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne(id);
        if (user) { user.pass = ""; }
        res.status(200).json({ user });
    }

}
