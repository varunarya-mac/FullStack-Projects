import e, { Response, Request, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

const errorhandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } 

  res.status(400).send({
    errors: [{ message: err.message }],
  });
};

export default errorhandler;
