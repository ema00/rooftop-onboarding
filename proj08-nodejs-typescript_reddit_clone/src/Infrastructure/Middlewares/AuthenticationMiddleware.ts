import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../../types";
import AuthenticationService from "../../Application/Services/AuthenticationService";
import Session from "../../Domain/Entities/Session";


@injectable()
class AuthenticationMiddleware {

    private authenticationService: AuthenticationService;


    constructor(
        @inject(TYPES.AuthenticationService) authenticationService: AuthenticationService) {
        
        this.authenticationService = authenticationService;
    }

    
    public redirectIfNotAuth = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, token } = req.body;

        try {
            const session = new Session(userId, token);
            const isLoggedIn = await this.authenticationService.isLoggedIn(session);
            if(!isLoggedIn) {
                res.status(401).json(new Error().message = "Not authenticated.");
            }
            else {
                next();
            }
        }
        catch (error) {
            res.status(401).json(new Error().message = "Not authenticated.");
        }
    }

}

export default AuthenticationMiddleware;
