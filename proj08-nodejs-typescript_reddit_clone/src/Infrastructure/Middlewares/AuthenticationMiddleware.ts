import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { isArray, isNullOrUndefined } from "util";
import TYPES from "../../types";
import AuthenticationService from "../../Application/Services/AuthenticationService";
import Session from "../../Domain/Entities/Session";


@injectable()
class AuthenticationMiddleware {

    private authenticationService: AuthenticationService;


    constructor(
        @inject(TYPES.AuthenticationService) authenticationService: AuthenticationService
    ) {    
        this.authenticationService = authenticationService;
    }

    
    public redirectIfNotAuth = async (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.headers["id"]);
        const token = req.headers["token"];

        try {
            if (isNaN(userId) || isNullOrUndefined(token) || isArray(token)) {
                res.status(400).json();
                return;
            }
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
