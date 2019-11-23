import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { isArray, isNullOrUndefined } from "util";
import TYPES from "../../types";
import AuthenticationService from "../../Application/Services/AuthenticationService";
import RepositoryFactory from "../../Domain/Repositories/RepositoryFactory";
import Session from "../../Domain/Entities/Session";


@injectable()
class AuthenticationController {

    private repositoryFactory: RepositoryFactory;
    private authenticationService: AuthenticationService;


    constructor(
        @inject(TYPES.RepositoryFactory) repositoryFactory: RepositoryFactory,
        @inject(TYPES.AuthenticationService) authenticationService: AuthenticationService
    ) {
        this.repositoryFactory = repositoryFactory;
        this.authenticationService = authenticationService;
    }


    public login = async (req: Request, res: Response) => {
        const { name, password } = req.body;

        try {
            const userRepository = this.repositoryFactory.getUserRepository();
            const user = await userRepository.findOne({ where: { name: name } });
            if (user) {
                const session = await this.authenticationService.login(user, password);
                if (session) {
                    res.status(200).
                        header("id", String(session.userId)).
                        header("token", session.token).json();
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
        const userId = Number(req.headers["id"]);
        const token = req.headers["token"];
        
        try {
            if (isNaN(userId) || isNullOrUndefined(token) || isArray(token)) {
                res.status(400).json();
                return;
            }
            const userRepository = this.repositoryFactory.getUserRepository();
            const session = new Session(userId, token);
            const user = await userRepository.findOne({ where: { id: userId } });
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
