import express from "express";
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
  googleAuth,
  googleCallback,
  toggleStatus,
  getUsersBySearch,
  getAllChat,
  getCSRF,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/image.middleware.js";

const router = express.Router();

router
  .route("/user")
  .post(createUser)
  .patch(
    authenticateUser.required,
    upload.fields([
      {name: "drivingLicenseImage", maxCount: 1},
      {name: "IDCardImage", maxCount: 1},
    ]),
    carRented
  ); // register & add rented count of renter and lessor
router.route("/user/login").post(localLogin); // login
router.route("/auth/google").get(googleAuth);
router.route("/auth/google/callback").get(googleCallback);
router.route("/user/role").post(authenticateUser.required, getUserRole);

router
  .route("/user/info")
  .post(authenticateUser.required, getUserInfo)
  .patch(authenticateUser.required, upload.single("image"), addUserInfo); // get user's info & update user info
router.route("/user/logout").post(authenticateUser.required, logout); // logout
router.route("/user/forgot-password").post(forgotPassword); // send resetlink to email
router.route("/user/reset-password").post(resetPassword); // reset password
router.route("/user/navbar").get(authenticateUser.required, getNavbarInfo); // get navbar info
router // change role
  .route("/user/update-role")
  .patch(
    authenticateUser.required,
    upload.fields([
      {name: "drivingLicenseImage", maxCount: 1},
      {name: "IDCardImage", maxCount: 1},
    ]),
    updateRoleLessor
  );
router
  .route("/user/update-role-admin")
  .patch(authenticateUser.required, updateRoleAdmin); // change role
router.route("/user/check-login").get(authenticateUser.required, checkLogin); // check if user login
//router.route("/user/lesser-info").patch(auth.required, addLesserInfo); // check if user login
router.route("/user/status").patch(authenticateUser.required, toggleStatus);
router.route("/user/admin").get(getUsersBySearch); //get users by search and filter
router
  .route("/api/user/chatRooms/:userId")
  .get(authenticateUser.required, getAllChat);
router.route("/csrf-token").get(authenticateUser.required, getCSRF);

export default router;
