import { Request, Response } from "express";
import { injectable } from "inversify";
import HashServiceObjecthash from "../Services/HashServiceObjecthash";
import TokenServiceRandomjs from "../Services/TokenServiceRandomjs";
import AuthenticationService from "../Services/AuthenticationService";
import HashService from "../../Application/Services/HashService";
import TokenService from "../../Application/Services/TokenService";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


@injectable()
export class AuthenticationController {

    private hashService: HashService;
    private tokenService: TokenService;


    constructor() {
        this.hashService = new HashServiceObjecthash();
        this.tokenService = new TokenServiceRandomjs();
    }


    public login = async (req: Request, res: Response) => {
        const hashService = this.hashService;
        const tokenService = this.tokenService;
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

    public logout = async (req: Request, res: Response) => {
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
