import { Request } from "express";
import { check, validationResult } from "express-validator";
import Validator from "./Validator";
import ValidationError from "./ValidationError";
import UserRoleType from "../../Domain/ValueObjects/UserRoleType";


/* Validation constraints */
const NAME_MIN_LENGTH: number = 5;
const NAME_MAX_LENGTH: number = 12;
const PASSWORD_MIN_LENGTH: number = 6;
const PASSWORD_MAX_LENGTH: number = 20;
const DNI_MIN: number = 1000000;
const DNI_MAX: number = 100000000;
const ROLES = [UserRoleType.ADMIN, UserRoleType.ZEEPER, UserRoleType.GUEST];

/* Validation error messages */
const MSG_NAME_CONSTRAINTS = `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters length`;
const MSG_PASSWORD_CONSTRAINTS = `Password must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters length`;
const MSG_ROLE_CONSTRAINTS = `Role must be one of: ${ROLES}`;


class ValidatorCreateUser implements Validator {

    private _req: Request;
    

    constructor(req: Request) {
        this._req = req;
    }

    
    public async validationResult(): Promise<Array<ValidationError>> {
        await check("name")
            .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
            .withMessage(MSG_NAME_CONSTRAINTS)
            .run(this._req);
        await check("password")
            .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
            .withMessage(MSG_PASSWORD_CONSTRAINTS)
            .run(this._req);
        await check("role").isIn(ROLES)
            .withMessage(MSG_ROLE_CONSTRAINTS)
            .run(this._req);
        await check("dni").isInt({ min: DNI_MIN, max: DNI_MAX })
            .run(this._req);
        await check("email").isEmail().normalizeEmail()
            .run(this._req);
        
        const errors = validationResult(this._req);
        
        return errors.array().map((error) => new ValidationError(error.msg, error.param));
    }

}

export default ValidatorCreateUser;
