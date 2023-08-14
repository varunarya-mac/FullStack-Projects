import express from "express";
import { body,validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

const route = express.Router();

route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
  ],
  (req: express.Request, res: express.Response ) => {

    const errors =  validationResult(req);

    if(!errors.isEmpty()){
      // throw new Error("Invalid email or password");
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    return res.status(201).send({});
  }
);

export { route as signupRouter };
