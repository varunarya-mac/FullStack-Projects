import express from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@va-ticketing/common";
import  Jwt from "jsonwebtoken";

const route = express.Router();

route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
  ],validateRequest,
  async (req: express.Request, res: express.Response ) => {

    const { email, password } = req.body;

    console.log("Creating a user...");

    const existingUser = await User.findOne({ email });
    if(existingUser){
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });

    const token = Jwt.sign( { id: user.id, email: user.email }, process.env.JWT_KEY! );
    req.session = { jwt: token };

    await user.save();
    
    res.status(201).send(user);
  }
);

export { route as signupRouter };
