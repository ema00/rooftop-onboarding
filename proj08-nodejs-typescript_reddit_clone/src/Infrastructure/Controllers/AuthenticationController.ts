import { Request, Response } from "express";
import HashFactory from "../Services/HashFactory"
import TokenFactory from "../Services/TokenFactory"
import AuthenticationService from "../Services/AuthenticationService";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User"


export class AuthenticationController {

    public static async login(req: Request, res: Response) {
        const hashFactory = new HashFactory();
        const tokenFactory = new TokenFactory();
        const authenticationService = new AuthenticationService();

        const { name, password } = req.body;

        try {
            const user = await User.findOne({ where: { name: name } });
            const pass = hashFactory.getStringHash(password);
            const token = tokenFactory.getToken();

            if (user && user.pass.valueOf() == pass.valueOf()) {
                const session = await authenticationService.createSession(user, token);
                res.status(200).json(session.toJson());
            }
            else {
                res.status(400).json();
            }
        }
        catch (error) {
            res.status(500).json({error});;
        }
    }

    public static async logout(req: Request, res: Response) {
        const authenticationService = new AuthenticationService();

        const { userId, token } = req.body;
        const userSession = new Session(userId, token);
        
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                res.status(400).json();
            }
            else {
                const currentSession = await authenticationService.readSession(user);
                if (currentSession && currentSession.equals(userSession)) {
                    authenticationService.deleteSession(user);
                    res.status(200).json();
                }
                else {
                    res.status(400).json();
                }
            }
        }
        catch (error) {
            res.status(500).json({error});
        }
    }

}
