import express from "express";

const route = express.Router();

route.post("/api/users/signout", (req, res) => {
  res.send("Hi there!");
}
);

export { route as signoutRouter}