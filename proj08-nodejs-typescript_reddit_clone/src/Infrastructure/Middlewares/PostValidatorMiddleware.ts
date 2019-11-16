import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { checkSchema } from "express-validator";
import AbstractValidatorMiddleware from "./AbstractValidatorMiddleware";
import POST_CREATE_SCHEMA from "../Validators/PostCreateSchema";
import POST_UPDATE_SCHEMA from "../Validators/PostUpdateSchema";


@injectable()
class PostValidatorMiddleware extends AbstractValidatorMiddleware {

	public validateCreate = (req: Request, res: Response, next: NextFunction): any => {
		const validations = checkSchema(POST_CREATE_SCHEMA);
		this.validate(validations)(req, res, next);
	}

	public validateUpdate = (req: Request, res: Response, next: NextFunction): any => {
		const validations = checkSchema(POST_UPDATE_SCHEMA);
		this.validate(validations)(req, res, next);
	}

}

export default PostValidatorMiddleware;
