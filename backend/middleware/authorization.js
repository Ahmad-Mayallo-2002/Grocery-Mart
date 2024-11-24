import { config } from "dotenv";
import pkg from "jsonwebtoken";

config();

const { verify } = pkg;

export const authorizationFunction = (req, res, next) => {
  const reqHeader = req.headers && req.headers;
  const token = reqHeader["authorization"].split(" ")[1];
  if (!token)
    return res
      .status(403)
      .json({ msg: "Token is Expired or Nor Found Please Sign In Again" });
  verify(token, process.env.JWT_KEY, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
  });
  next();
};
