import UserRoleType from "../../Domain/ValueObjects/UserRoleType";


/* Validation constraints */
const DNI_MIN: number = 1000000;
const DNI_MAX: number = 100000000;

/* Validation error messages */
//


const USER_UPDATE_SCHEMA = Object({
    id: {
        in: ["params"],
        isInt: true
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

export default USER_UPDATE_SCHEMA;
