import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { ValidationChain, validationResult } from "express-validator";


@injectable()
abstract class AbstractValidatorMiddleware {

    protected validate = (validations: ValidationChain[]) => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            else {
                res.status(422).json(errors.array());
            }
        };
    };

}

export default AbstractValidatorMiddleware;
