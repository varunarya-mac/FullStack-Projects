import express from "express";

const route = express.Router();

route.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
}
);

export { route as currentUserRouter}