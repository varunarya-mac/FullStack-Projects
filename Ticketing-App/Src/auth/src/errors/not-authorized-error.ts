import { CustomError } from './custom-error';

export class RequireAuthError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, RequireAuthError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}