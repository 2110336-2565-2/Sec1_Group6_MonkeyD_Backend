import jwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const secret = process.env.JWT_SECRET;

const getTokenFromCookie = (req, res) => {
  console.log(req.cookies.auth);
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
