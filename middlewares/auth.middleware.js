import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

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
    const cookies = socket.handshake.headers.cookie;
    const authCookie = cookies
      .split("; ")
      .find((cookie) => cookie.startsWith("auth="));
    const authToken = authCookie
      ? authCookie.split("auth=")[1].split(";")[0]
      : null;

    if (!authToken) {
      return next(new Error("Authentication error: No token provided"));
    }
    jwt.verify(authToken, secret, (err, decoded) => {
      if (err) {
        return next(
          new Error(`Authentication error:${authToken} Invalid token`)
        );
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
    userProperty: "userCredential",
    getToken: getTokenFromCookie,
    credentialsRequired: true,
  }),
  optional: jwtMiddleware({
    userProperty: "userCredential",
    getToken: getTokenFromCookie,
    credentialsRequired: false,
  }),
  socket: jwtSocketMiddleware,
};

export const authorizeUser = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.userCredential.id}, {role: 1});
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role ${user.role} is not authorized to access this route.`,
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};
