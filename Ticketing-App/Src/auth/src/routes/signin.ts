import express ,{ Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validate-request";
import {User} from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import Jwt from "jsonwebtoken";
import { Password } from "../services/password";


const route = express.Router();

route.post("/api/users/signin",[
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password")
], validateRequest, async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if(!existingUser){
    throw new BadRequestError("Invalid credentials");
  }

  const passwordMatch = await Password.compare(existingUser.password, password);
  if(!passwordMatch){
    throw new BadRequestError("Invalid credentials");
  }

  // Generate JWT
  const userJwt = Jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!);

  req.session = { jwt: userJwt };

  res.status(400).send(existingUser);
}
);

export { route as signinRouter}