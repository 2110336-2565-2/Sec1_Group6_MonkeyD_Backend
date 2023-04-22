/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - username
 *        - email
 *        - status
 *        - rating
 *       properties:
 *         googleId:
 *           type: string
 *           description: The Google ID of the user.
 *         username:
 *           type: string
 *           description: The unique username of the user.
 *         email:
 *           type: string
 *           description: The unique email address of the user.
 *         image:
 *           type: string
 *           description: The URL of the user's profile image.
 *         status:
 *           type: string
 *           description: The status of the user's account.
 *           enum:
 *             - Unverified
 *             - Rejected
 *             - Verified
 *         owncars:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of car IDs that the user owns.
 *         isLessor:
 *           type: boolean
 *           description: Whether the user is a lessor or not.
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin or not.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         rating:
 *           type: number
 *           description: The user's rating out of 5.
 *         prefix:
 *           type: string
 *           description: The user's prefix.
 *         rentedCount:
 *           type: number
 *           description: The number of times the user has rented a car.
 *         rentedOutCount:
 *           type: number
 *           description: The number of times the user has rented out a car.
 *         drivingLicenseNumber:
 *           type: string
 *           description: The user's driving license number.
 *         IDCardNumber:
 *           type: string
 *           description: The user's ID card number.
 *         drivingLicenseImage:
 *           type: string
 *           description: The URL of the user's driving license image.
 *         IDCardImage:
 *           type: string
 *           description: The URL of the user's ID card image.
 *         omiseCustomerId:
 *           type: string
 *           description: The user's Omise customer ID.
 *         omiseRecipientId:
 *           type: string
 *           description: The user's Omise recipient ID.
 *         chatRooms:
 *           type: array
 *           items:
 *             type: string
 *             description: An array of chat room IDs that the user is a member of.
 *           description: The chat rooms that the user is a member of.
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * 
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       description: User data to be registered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. User data is invalid or incomplete.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update rented count of renter and lessor
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated the rented count of renter and lessor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. User data is invalid or incomplete.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       500:
 *         description: Internal server error.
 *
 * /user/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     requestBody:
 *       description: User credentials to be authenticated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JSON Web Token to be used in subsequent requests
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. User data is invalid or incomplete.
 *       401:
 *         description: Unauthorized. User credentials are invalid.
 *       500:
 *         description: Internal server error.
 *
 * /auth/google:
 *   get:
 *     summary: Google authentication
 *     tags:
 *       - User
 *     responses:
 *       302:
 *         description: Redirect to Google sign in page
 *
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags:
 *       - User
 *     responses:
 *       302:
 *         description: Redirect to application home page with authentication token
 *
 * /user/role:
 *   post:
 *     summary: Get the role of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/info:
 *   post:
 *     summary: Get the information of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *   patch:
 *     summary: Update the information of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/logout:
 *   post:
 *     summary: Log out the authenticated user 
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/forgot-password:
 *   post:
 *     summary: Send a reset password link to the user's email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/reset-password:
 *   post:
 *     summary: Reset the user's password using a token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *               - password
 *               - token
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/navbar:
 *   get:
 *     summary: Get information for the navbar of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/update-role:
 *   patch:
 *     summary: Update the role of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               drivingLicenseImage:
 *                 type: string
 *                 format: binary
 *               IDCardImage:
 *                 type: string
 *                 format: binary
 *             required:
 *               - drivingLicenseImage
 *               - IDCardImage
 *     responses:
 *       200:
 *         description: OK
 * 
 * /user/update-role-admin:
 *   patch:
 *     summary: Change the role of a user by an admin
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to update
 *               role:
 *                 type: string
 *                 description: The new role of the user (either "renter" or "lessor")
 *             required:
 *               - userId
 *               - role
 *     responses:
 *       200:
 *         description: The updated user object
 * 
 * /user/check-login:
 *   get:
 *     summary: Check if a user is currently logged in
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a JSON object indicating the user is logged in
 * 
 * /user/status:
 *   patch:
 *     summary: Toggle the status of a user (active or inactive)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the user (either "active" or "inactive")
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: The updated user object
 * 
 * /user/admin:
 *   get:
 *     summary: Get a list of users filtered by search parameters
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
 *         description: Search query for filtering users by email or name
 *     responses:
 *       200:
 *         description: Returns a list of user objects matching the search query
 * 
 * /api/user/chatRooms/{userId}:
 *   get:
 *     summary: Get all chat rooms for a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose chat rooms to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a list of chat room objects for the user
 * 
 * /csrf-token:
 *   get:
 *     summary: Get a CSRF token for authenticated requests
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a JSON object with the CSRF token
 */




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
  beLessor,
  toggleRequestTobeLessor,
} from "../controllers/user.controller.js";
import {errorHandler} from "../middlewares/error-handler.middleware.js";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
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
router // request role
  .route("/user/update-role")
  .patch(
    authenticateUser.required,
    upload.fields([
      {name: "drivingLicenseImage", maxCount: 1},
      {name: "IDCardImage", maxCount: 1},
    ]),
    updateRoleLessor
  );
router.route("/user/lessor").patch(authenticateUser.required, beLessor); // change role
router.route("/user/togglereqLessor").patch(authenticateUser.required, toggleRequestTobeLessor); // toggle requestTobeLessor
router
  .route("/user/update-role-admin")
  .patch(authenticateUser.required, updateRoleAdmin); // change role
router.route("/user/check-login").get(authenticateUser.required, checkLogin); // check if user login
//router.route("/user/lesser-info").patch(auth.required, addLesserInfo); // check if user login
router
  .route("/user/status")
  .patch(authenticateUser.required, authorizeUser("admin"), toggleStatus);
router
  .route("/user/admin")
  .get(authorizeUser("admin"), getUsersBySearch); //get users by search and filter
  // .get(authenticateUser.required, authorizeUser("admin"), getUsersBySearch); //get users by search and filter
router
  .route("/api/user/chatRooms/:userId")
  .get(authenticateUser.required, getAllChat);
router.route("/csrf-token").get(authenticateUser.required, getCSRF);

export default router;
