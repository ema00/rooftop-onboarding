import { Request, Response } from "express";
import { injectable } from 'inversify';
import HashService from "../Services/HashService";
import TokenService from "../Services/TokenService";
import AuthenticationService from "../Services/AuthenticationService";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


@injectable()
export class AuthenticationController {

    public async login(req: Request, res: Response) {
        const hashService = new HashService();
        const tokenService = new TokenService();
        const authenticationService = new AuthenticationService();

        const { name, password } = req.body;

        try {
            const user = await User.findOne({ where: { name: name } });
            const pass = hashService.getStringHash(password);
            const token = tokenService.getToken();

            if (user && user.pass.valueOf() == pass.valueOf()) {
                const session = await authenticationService.createSession(user, token);
                res.status(200).json(session.toJson());
            }
            else {
                res.status(400).json();
            }
        }
        catch (error) {
            res.status(500).json({ error });;
        }
    }

    public async logout(req: Request, res: Response) {
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
            res.status(500).json({ error });
        }
    }

}
