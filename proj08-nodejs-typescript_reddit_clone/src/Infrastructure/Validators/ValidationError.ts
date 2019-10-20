

class ValidationError {

    private _message: string;
    
    private _parameter: string;


    constructor(message: string, parameter: string) {
        this._message = message;
        this.parameter = parameter;
    }


    public get message(): string { return this._message; }
    public set message(value: string) { this._message = value; }

    public get parameter(): string { return this._parameter; }
    public set parameter(value: string) { this._parameter = value; }

}

export default ValidationError;
