import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { checkSchema } from "express-validator";
import AbstractValidatorMiddleware from "./AbstractValidatorMiddleware";
import USER_CREATE_SCHEMA from "../Validators/UserCreateSchema";
import USER_UPDATE_SCHEMA from "../Validators/UserUpdateSchema";


@injectable()
class UserValidatorMiddleware extends AbstractValidatorMiddleware {

    public validateCreate = (req: Request, res: Response, next: NextFunction): any => {
        const validations = checkSchema(USER_CREATE_SCHEMA);
        this.validate(validations)(req, res, next);
    }

    public validateUpdate = (req: Request, res: Response, next: NextFunction): any => {
		const validations = checkSchema(USER_UPDATE_SCHEMA);
		this.validate(validations)(req, res, next);
	}

}

export default UserValidatorMiddleware;
