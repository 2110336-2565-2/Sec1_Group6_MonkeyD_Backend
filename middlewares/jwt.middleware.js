import jwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const secret = process.env.JWT_SECRET;

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};
const getTokenFromCookie = (req, res) => {
  console.log(req.cookies.auth);
  //   return req.headers.cookie;
  return req.cookies.auth;
};

const auth = {
  required: jwt({
    secret: secret,
    userProperty: "payload",
    getToken: getTokenFromCookie,
  }),
  optional: jwt({
    secret: secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromCookie,
  }),
};

export default auth;
