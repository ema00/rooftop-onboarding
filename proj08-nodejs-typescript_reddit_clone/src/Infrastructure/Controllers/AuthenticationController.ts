import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import AuthenticationService from "../../Application/Services/AuthenticationService";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


@injectable()
class AuthenticationController {

    private authenticationService: AuthenticationService;


    constructor(
        @inject(TYPES.AuthenticationService) authenticationService: AuthenticationService) {
        
        this.authenticationService = authenticationService;
    }


    public login = async (req: Request, res: Response) => {
        const { name, password } = req.body;

        try {
            const user = await User.findOne({ where: { name: name } });
            if (user) {
                const session = await this.authenticationService.login(user, password);
                if (session) {
                    res.status(200).json(session.toJson());
                }
                else {
                    res.status(400).json();
                }
            }
            else {
                res.status(400).json();
            }
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }

    public logout = async (req: Request, res: Response) => {
        const { userId, token } = req.body;
        const session = new Session(userId, token);
        
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (user) {
                this.authenticationService.logout(user, session);
                res.status(200).json();
            }
            else {
                res.status(400).json();
            }
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }

}

export default AuthenticationController;
