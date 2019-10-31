import { Request, Response } from "express";
import { injectable } from 'inversify';
import ValidatorCreateUser from "../Validators/ValidatorCreateUser";
import HashService from "../Services/HashService"
import User from "../../Domain/Entities/User";
import UserRole from "../../Domain/Entities/UserRole";
import UserRoleType from "../../Domain/Entities/UserRoleType";


@injectable()
export class UserController {

    public async create(req: Request, res: Response) {
        const hashService = new HashService();

        const { name, dni, password, role, email } = req.body;
        
        const user = new User();
        user.name = name;
        user.dni = dni;
        let userRole = await UserRole.findOne({ type: role });
        if (!userRole) { userRole = new UserRole(UserRoleType.ZEEPER); }
        user.addRole(userRole);
        user.email = email;
        user.pass = hashService.getStringHash(password);

        try {
            const validator = new ValidatorCreateUser(req);
            const errors = await validator.validationResult();
            if (errors.length == 0) {
                await user.save();
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

    public async read(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne(id);

        if (user) {
            res.status(200).json(user.toJson());
        }
        else {
            res.status(200).json();
        }
    }
    
    public async update(req: Request, res: Response) {
        const { id, dni, email } = req.body;

        try {
            const user = await User.findOne(id);
            if (user) {
                user.dni = dni ? dni : user.dni;
                user.email = email ? email : user.email;
                await user.save();
                res.status(200).json(user.toJson());
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}
