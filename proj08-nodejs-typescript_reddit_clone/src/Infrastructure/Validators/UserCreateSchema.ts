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


const USER_CREATE_SCHEMA = Object({
    name: {
        in: ["body"],
        isLength: { 
            options: { min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH },
            errorMessage: MSG_NAME_CONSTRAINTS
        }
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
            errorMessage: MSG_PASSWORD_CONSTRAINTS
        }
    },
    role: {
        custom: {
            options: (value: UserRoleType) => {
                return ROLES.includes(value);
            }
        },
        errorMessage: MSG_ROLE_CONSTRAINTS
    },
    dni: {
        in: ["body"],
        isInt: {
            options: { min: DNI_MIN, max: DNI_MAX }
        }
    },
    email: {
        in: ["body"],
        isEmail: true,
        normalizeEmail: true
    }
});

export default USER_CREATE_SCHEMA;
