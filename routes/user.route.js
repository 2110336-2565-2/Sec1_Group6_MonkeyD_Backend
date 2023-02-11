import express from "express";
import {
  carRented,
  createUser,
  login,
  logout,
  getNavbarInfo,
  checkLogin,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/user").post(createUser);
router.route("/user/login").post(login);
router.route("/user/logout").post(auth.required, logout);
router.route("/user").patch(auth.required, carRented);
router.route("/user/navbar").get(auth.required, getNavbarInfo);
router.route("/user/checkLogin").get(auth.required, checkLogin);

export default router;
