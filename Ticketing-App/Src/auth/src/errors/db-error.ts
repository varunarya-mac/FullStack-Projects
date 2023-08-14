import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DBError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500;

    serializeErrors() {
        return [{ message: this.reason }]; 
    }

    constructor(public error: ValidationError) {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DBError.prototype);
    }
}