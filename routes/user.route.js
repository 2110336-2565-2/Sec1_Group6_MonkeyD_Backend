import express from "express";
import {
  carRented,
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getNavbarInfo,
  checkLogin,
  AddInform,
  ViewInfo,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/user").post(createUser);
router.route("/user").patch(auth.required, carRented);
router.route("/user/login").post(login);
router.route("/user/info").patch(AddInform);
router.route("/user/info").get(ViewInfo);
router.route("/user/logout").post(auth.required, logout);
router.route("/user/forgot-password").post(forgotPassword);
router.route("/user/reset-password").post(resetPassword);
router.route("/user/navbar").get(auth.required, getNavbarInfo);
router.route("/user/check-login").get(auth.required, checkLogin);

export default router;
