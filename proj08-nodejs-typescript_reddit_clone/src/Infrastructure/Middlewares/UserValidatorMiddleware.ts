import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { checkSchema } from "express-validator";
import AbstractValidatorMiddleware from "./AbstractValidatorMiddleware";
import USER_CREATE_SCHEMA from "../Validators/UserCreateSchema";


@injectable()
class UserValidatorMiddleware extends AbstractValidatorMiddleware {

    public validateCreate = (req: Request, res: Response, next: NextFunction): any => {
        const validations = checkSchema(USER_CREATE_SCHEMA);
        this.validate(validations)(req, res, next);
    }

}

export default UserValidatorMiddleware;
