import { Request, Response } from "express";
import ValidatorCreateUser from "../Validators/ValidatorCreateUser";
import User from "../../Domain/Entities/User";


export class UserController {

    public static async save(req: Request, res: Response) {
        const hash = require("object-hash");

        const { name, dni, password, role, email } = req.body;
        
        const user = new User();
        user.name = name;
        user.dni = dni;
        user.roles = [];
        user.addRole(role);
        user.email = email;
        user.pass = hash(password, { algorithm: 'sha3-512', encoding: 'base64' });

        try {
            const validator = new ValidatorCreateUser(req);
            const errors = await validator.validationResult();
            if (errors.length == 0) {
                await user.save();
                res.status(201).json({ user: { name: user.name, id: user.id } });
            }
            else {
                res.status(400).json(errors);
            }
        }
        catch (error) {
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
