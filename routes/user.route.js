import express from "express";
import {
  carRented,
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getNavbarInfo,
  updateRoleLessor,
  updateRoleAdmin,
  checkLogin,
  addUserInfo,
  getUserInfo,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/user").post(createUser).patch(auth.required, carRented); // register & add rented count of renter and lessor
router.route("/user/login").post(login); // login
router
  .route("/user/info")
  .post(auth.required, getUserInfo)
  .patch(auth.required, addUserInfo); // get user's info & add user info
router.route("/user/logout").post(auth.required, logout); // logout
router.route("/user/forgot-password").post(forgotPassword); // send resetlink to email
router.route("/user/reset-password").post(resetPassword); // reset password
router.route("/user/navbar").get(auth.required, getNavbarInfo); // get navbar info
router.route("/user/update-role").patch(auth.required, updateRoleLessor); // change role
router.route("/user/update-role-admin").patch(auth.required, updateRoleAdmin); // change role
router.route("/user/check-login").get(auth.required, checkLogin); // check if user login

export default router;
