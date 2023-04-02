import express from "express";
import {get} from "mongoose";
import {
  carRented,
  createUser,
  localLogin,
  logout,
  forgotPassword,
  resetPassword,
  getNavbarInfo,
  updateRoleLessor,
  updateRoleAdmin,
  checkLogin,
  addUserInfo,
  getUserInfo,
  getUserRole,
  // facebookLogin,
  // facebookCallback,
  googleAuth,
  googleCallback,
  getUsersBySearch,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import auth from "../middlewares/jwt.middleware.js";
import {upload} from "../middlewares/image.middleware.js";

const router = express.Router();

router
  .route("/user")
  .post(createUser)
  .patch(
    // auth.required,
    upload.fields([
      {name: "drivingLicenseImage", maxCount: 1},
      {name: "IDCardImage", maxCount: 1},
    ]),
    carRented); // register & add rented count of renter and lessor
router.route("/user/login").post(localLogin); // login
// router.route("/user/login/facebook").get(facebookLogin);
// router.route("/auth/facebook/callback").get(facebookCallback);
router.route("/auth/google").get(googleAuth);
router.route("/auth/google/callback").get(googleCallback);
router.route("/user/role").post(auth.required, getUserRole);

router
  .route("/user/info")
  .post(auth.required, getUserInfo)
  .patch(auth.required, upload.single("image"), addUserInfo); // get user's info & update user info
router.route("/user/logout").post(auth.required, logout); // logout
router.route("/user/forgot-password").post(forgotPassword); // send resetlink to email
router.route("/user/reset-password").post(resetPassword); // reset password
router.route("/user/navbar").get(auth.required, getNavbarInfo); // get navbar info
router                                                           // change role
  .route("/user/update-role")
  .patch(
    auth.required,
    upload.fields([
      {name: "drivingLicenseImage", maxCount: 1},
      {name: "IDCardImage", maxCount: 1},
    ]),
  updateRoleLessor);
router.route("/user/update-role-admin").patch(auth.required, updateRoleAdmin); // change role
router.route("/user/check-login").get(auth.required, checkLogin); // check if user login
//router.route("/user/lesser-info").patch(auth.required, addLesserInfo); // check if user login
router.route("/user/admin").get(getUsersBySearch); //get users by search and filter

export default router;
