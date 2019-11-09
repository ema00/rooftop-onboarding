import { Request, Response } from "express";
import { injectable } from "inversify";
import HashServiceObjecthash from "../Services/HashServiceObjecthash";
import TokenServiceRandomjs from "../Services/TokenServiceRandomjs";
import AuthenticationService from "../../Application/Services/AuthenticationServiceImpl";
import HashService from "../../Application/Services/HashService";
import TokenService from "../../Application/Services/TokenService";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


@injectable()
class AuthenticationController {

    private hashService: HashService;
    private tokenService: TokenService;
    private authenticationService: AuthenticationService;


    constructor() {
        this.hashService = new HashServiceObjecthash();
        this.tokenService = new TokenServiceRandomjs();
        this.authenticationService =
            new AuthenticationService(this.tokenService, this.hashService);
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
            res.status(500).json({ error });;
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
