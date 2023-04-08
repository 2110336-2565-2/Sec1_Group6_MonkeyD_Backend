import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const secret = process.env.JWT_SECRET;

const getTokenFromCookie = (req) => {
  return req.cookies.auth;
};

const jwtMiddleware = (options) => {
  return (req, res, next) => {
    const token = options.getToken(req);
    if (!token) {
      if (options.credentialsRequired) {
        return res.status(401).send("No authentication token provided.");
      } else {
        return next();
      }
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid authentication token.");
      }
      req[options.userProperty] = decoded;
      next();
    });
  };
};

const jwtSocketMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie.split("=")[1];

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error: Invalid token"));
      }
      socket.decoded_token = decoded;
      next();
    });
  } catch (err) {
    next(new Error("Authentication error: " + err.message));
  }
};

export const authenticateUser = {
  required: jwtMiddleware({
    userProperty: "payload",
    getToken: getTokenFromCookie,
    credentialsRequired: true,
  }),
  optional: jwtMiddleware({
    userProperty: "payload",
    getToken: getTokenFromCookie,
    credentialsRequired: false,
  }),
  socket: jwtSocketMiddleware,
};
