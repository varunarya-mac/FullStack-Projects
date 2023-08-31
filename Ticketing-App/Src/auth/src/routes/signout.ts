import express from "express";

const route = express.Router();

route.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({});
}
);

export { route as signoutRouter}