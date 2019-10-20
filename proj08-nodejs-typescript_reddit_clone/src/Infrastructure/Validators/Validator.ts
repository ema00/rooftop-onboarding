import ValidationError from "./ValidationError";


interface Validator {

    validationResult(): Promise<Array<ValidationError>>;

}

export default Validator;
