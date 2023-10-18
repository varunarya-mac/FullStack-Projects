import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "@va-ticketing/common";
const route = express.Router();

route.get("/api/users/currentuser", currentUser, (req, res) => {
    
  res.send({currentUser: req.currentUser || null});
  

}
);

export { route as currentUserRouter}