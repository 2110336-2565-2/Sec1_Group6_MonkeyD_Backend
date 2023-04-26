/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - status
 *         - role
 *         - rating
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated unique identifier of the user.
 *         googleId:
 *           type: string
 *           description: The Google ID associated with the user.
 *         username:
 *           type: string
 *           description: The unique username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The unique email address of the user.
 *         image:
 *           type: string
 *           description: The profile image URL of the user.
 *         status:
 *           type: string
 *           enum: [Unverified, Rejected, Verified]
 *           description: The verification status of the user.
 *         owncars:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of car IDs that are owned by the user.
 *         role:
 *           type: string
 *           enum: [renter, lessor, admin]
 *           description: The role of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user.
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           description: The rating of the user.
 *         prefix:
 *           type: string
 *           enum: [(Not Specific), Mr., Mrs., Miss, Ms., not set]
 *           default: not set
 *           description: The prefix used for the user's name.
 *         rentedCount:
 *           type: number
 *           default: 0
 *           description: The number of times the user has rented a car.
 *         rentedOutCount:
 *           type: number
 *           default: 0
 *           description: The number of times the user has rented out their cars.
 *         drivingLicenseNumber:
 *           type: string
 *           description: The driving license number of the user.
 *         IDCardNumber:
 *           type: string
 *           description: The ID card number of the user.
 *         drivingLicenseImage:
 *           type: string
 *           description: The URL of the user's driving license image.
 *         IDCardImage:
 *           type: string
 *           description: The URL of the user's ID card image.
 *         omiseCustomerId:
 *           type: string
 *           description: The customer ID of the user in Omise payment gateway.
 *         omiseRecipientId:
 *           type: string
 *           description: The recipient ID of the user in Omise payment gateway.
 *         chatRooms:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the chat rooms the user is a member of.
 *           description: An array of chat room IDs.
 *         muteList:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the chat rooms the user has muted.
 *           description: An array of chat room IDs.
 *         requestTobeLessor:
 *           type: boolean
 *           description: for checking if user request to be a lessor or not.
 *       example:
 *         {
 *           "_id": "61d11f8b1d7b1c2e2a13d4c8",
 *         "googleId": "1234567890",
 *         "username": "johndoe",
 *         "email": "johndoe@example.com",
 *         "image": "profile.png",
 *         "status": "Verified",
 *         "owncars": [
 *           "61d11f8b1d7b1c2e2a13d4c9",
 *           "61d11f8b1d7b1c2e2a13d4ca"
 *         ],
 *         "role": "renter",
 *         "firstName": "John",
 *         "lastName": "Doe",
 *         "phoneNumber": "+1234567890",
 *         "rating": 4.8,
 *         "prefix": "Mr.",
 *         "rentedCount": 10,
 *         "rentedOutCount": 5,
 *         "drivingLicenseNumber": "1234567890",
 *         "IDCardNumber": "0987654321",
 *         "drivingLicenseImage": "driving_license.png",
 *         "IDCardImage": "id_card.png",
 *         "omiseCustomerId": "cus_1234567890",
 *         "omiseRecipientId": "rec_1234567890",
 *         "chatRooms": [
 *           "61d11f8b1d7b1c2e2a13d4cb",
 *           "61d11f8b1d7b1c2e2a13d4cc"
 *         ],
 *         "muteList": [
 *           "61d11f8b1d7b1c2e2a13d4cd",
 *           "61d11f8b1d7b1c2e2a13d4ce"
 *         ],
 *         "requestTobeLessor": true,
 *         "createdAt": "2022-01-01T00:00:00.000Z",
 *         "updatedAt": "2022-01-02T00:00:00.000Z"
 *       }
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * 
 */
/**
 * Creates a new user account.
 * 
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     summary: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             example:
 *               user:
 *                 username: johndoe
 *                 email: johndoe@examle.com
 *                 password: password123
 *     responses:
 *       200:
 *         description: User account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Create account successfully
 *       400:
 *         description: Invalid request body or username/email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username or E-mail already exists
 */
/**
 * Logs in user with email and password using local strategy.
 *
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Logs in user with email and password.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   required: true
 *                   example: "johndoe@example.com"
 *                 password:
 *                   type: string
 *                   required: true
 *                   example: "password123"
 *     responses:
 *       200:
 *         description: Login success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Login success"
 *       401:
 *         description: Invalid email or password
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "can't be blank"
 *                 password:
 *                   type: string
 *                   example: "can't be blank"
 *       422:
 *         description: Invalid email or password
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "Invalid email or password"
 */
/**
 * Authenticate with Google OAuth.
 *
 * @swagger
 *
 * /auth/google:
 *   get:
 *     tags:
 *       - User
 *     summary: Authenticate with Google OAuth.
 *     responses:
 *       200:
 *         description: User is already logged in.
 *       302:
 *         description: Redirect to Google OAuth consent screen.
 */

/**
 * Handles the callback URL for Google authentication. If the authentication is
 * successful, sets an authentication cookie and redirects the user to the home page.
 *
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - User
 *     summary: Handles the callback URL for Google authentication
 *     responses:
 *       '302':
 *         description: Redirect to the home page
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             description: Authentication cookie and user information
 *       '401':
 *         description: Authentication failed
 */
/**
 * @swagger
 *
 * /user/info:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user information
 *     description: Update user information, including username, image, cars, and personal information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User information to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               owncars:
 *                 type: array
 *                 items:
 *                   type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               prefix:
 *                 type: string
 *               IDCardNumber:
 *                 type: string
 *               drivingLicenseNumber:
 *                 type: string
 *             example:
 *               username: johndoe
 *               image: profile.png
 *               owncars: [
 *                  61d11f8b1d7b1c2e2a13d4c9,
 *                  61d11f8b1d7b1c2e2a13d4ca
 *               ]
 *               firstName: John
 *               lastName: Doe
 *               phoneNumber: 1234567890
 *               prefix: Mr.
 *               IDCardNumber: 1234567890123
 *               drivingLicenseNumber: 1234567890123456
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Complete!
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Username already exists
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Cannot find user
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Internal server error
 */
/**
 * Get user info by ID
 * @swagger
 * /user/info:
 *   get:
 *     summary: Retrieve user information by ID
 *     description: Retrieve user information by the given ID.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: id
 *         schema:
 *           type: string
 *         example:
 *           id: 60c5b1821a697e1c9005f5d5
 *         required: true
 *         description: The ID of the user to retrieve information for
 *     responses:
 *       '200':
 *         description: A successful response, returns the user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               _id: 60c5b1821a697e1c9005f5d5
 *               googleId: null
 *               username: john_doe
 *               email: john_doe@gmail.com
 *               image: john_doe.jpg
 *               status: Verified
 *               owncars: ['60c5b1821a697e1c9005f5d6', '60c5b1821a697e1c9005f5d7']
 *               role: renter
 *               firstName: John
 *               lastName: Doe
 *               phoneNumber: 1234567890
 *               rating: 4.5
 *               prefix: Mr.
 *               rentedCount: 2
 *               rentedOutCount: 5
 *               drivingLicenseNumber: AB1234567
 *               IDCardNumber: 1234567890123
 *               drivingLicenseImage: john_doe_dl.jpg
 *               IDCardImage: john_doe_id.jpg
 *               omiseCustomerId: null
 *               omiseRecipientId: null
 *               chatRooms: ['60c5b1821a697e1c9005f5d8', '60c5b1821a697e1c9005f5d9']
 *               muteList: ['60c5b1821a697e1c9005f5da']
 *               requestTobeLessor: false
 *               createdAt: '2022-01-01T00:00:00.000Z'
 *               updatedAt: '2022-01-02T00:00:00.000Z'
 *       '400':
 *         description: Invalid input parameter
 *       '404':
 *         description: User with the given ID not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout the user by clearing the cookies
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cookie_name:
 *                 type: string
 *                 description: The name of the cookie to clear
 *                 example: access_token
 *     responses:
 *       200:
 *         description: Successfully logged out the user
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: logout successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while logging out the user
 */
/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Sends password reset instructions to the user's email
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
 *                 description: The email of the user requesting to reset their password
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Password reset instructions sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset instructions sent
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while sending password reset instructions
 */
/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset user password using a token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token sent to user's email to reset password
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *               password:
 *                 type: string
 *                 description: User's new password
 *                 example: new_password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Rents a car
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               prefix:
 *                 type: string
 *                 description: The renter's prefix
 *                 example: Mr.
 *               first_name:
 *                 type: string
 *                 description: The renter's first name
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: The renter's last name
 *                 example: Doe
 *               phone_number:
 *                 type: string
 *                 description: The renter's phone number
 *                 example: "1234567890"
 *               driving_license:
 *                 type: string
 *                 description: The renter's driving license number
 *                 example: "1234567890"
 *               identification_number:
 *                 type: string
 *                 description: The renter's identification number
 *                 example: "1234567890"
 *               drivingLicenseImage:
 *                 type: string
 *                 format: binary
 *                 description: The renter's driving license image
 *                 example: "image/png"
 *               IDCardImage:
 *                 type: string
 *                 format: binary
 *                 description: The renter's identification card image
 *                 example: "image/png"
 *     responses:
 *       200:
 *         description: Successfully rented the car
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: car rented
 *       404:
 *         description: Renter or lessor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find renter
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while renting the car
 */
/**
 * @swagger
 * /user/navbar:
 *   get:
 *     summary: Get the user's navbar info
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved navbar info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user's navbar info
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61787f7f103c620006cb2f5d
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     profileImageUrl:
 *                       type: string
 *                       example: https://example.com/profile-image.jpg
 *                   required:
 *                     - _id
 *                     - firstName
 *                     - lastName
 *                     - email
 *                 message:
 *                   type: string
 *                   example: Navbar info retrieved successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /user/lessor:
 *   patch:
 *     summary: Set user's role as lessor.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user_id
 *         required: true
 *         description: ID of the user to set as lessor.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: this user is lessor right now
 *       404:
 *         description: User with the given ID not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: cannot find user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /user/togglereqLessor:
 *   patch:
 *     summary: Toggle a user's request to become a lessor
 *     description: Toggles the `requestTobeLessor` field of a user to `true` to indicate their request to become a lessor.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The user ID in JSON format
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to update
 *                 example: "613a5c5d8e25f122a87a7a50"
 *     responses:
 *       200:
 *         description: Success message and updated user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "This user is on verification"
 *                 user:
 *                   type: object
 *                   description: The updated user object
 *                   example: 
 *                     _id: "613a5c5d8e25f122a87a7a50"
 *                     name: "John Doe"
 *                     email: "johndoe@example.com"
 *                     role: "user"
 *                     requestTobeLessor: true
 */
/**
 * @swagger
 * /user/update-role:
 *   patch:
 *     summary: Update user's role to lessor and related personal information for verification
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               prefix:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *               driving_license:
 *                 type: string
 *               identification_number:
 *                 type: string
 *               drivingLicenseImage:
 *                 type: string
 *                 format: binary
 *               IDCardImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Role lessor updated
 *       400:
 *         description: Invalid request body
 */
/**
 * @swagger
 * /user/update-role-admin:
 *   patch:
 *     summary: Update user role to admin
 *     description: Update the role of the user with the given user ID to "admin"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user to update
 *             example:
 *               user_id: 12345
 *     responses:
 *       200:
 *         description: The role of the user has been updated to "admin"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the update was successful
 *                   example: role admin updated
 *       404:
 *         description: The user with the given ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the user was not found
 *                   example: cannot find user
 *       500:
 *         description: An error occurred while attempting to update the user's role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating what went wrong
 *                   example: An error occurred while updating the user's role
 */
/**
 * @swagger
 * /user/check-login:
 *   get:
 *     summary: Check if a user is logged in
 *     description: Returns a JSON object indicating whether a user is logged in or not.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a JSON object with a boolean indicating whether the user is logged in.
 *         example:
 *           { "isLogin": true }
 */
/**
 * @swagger
 * /user/role:
 *   get:
 *     summary: Get user role by ID
 *     description: Retrieve the role of a user by their ID.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to retrieve the role for.
 *     responses:
 *       200:
 *         description: User role retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userRole:
 *                   type: string
 *                   description: The user's role.
 *                   example: "admin"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Cannot find user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /user/status:
 *   patch:
 *     summary: Toggle user status and update associated matches
 *     description: Toggle user status to Verified or Rejected and update associated matches to Wait for payment or Cancelled, respectively
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user_id
 *         description: ID of user whose status is being toggled
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *         example:
 *           user_id: 61319f92d1350a15f49fa33d
 *       - in: body
 *         name: action
 *         description: Action to take on user status - Approve or Reject
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             action:
 *               type: string
 *               enum: [Approve, Reject]
 *         example:
 *           action: Approve
 *     responses:
 *       '200':
 *         description: User and associated matches updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User and Match status has been updated
 *       '400':
 *         description: Invalid request body format or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request body format
 *       '404':
 *         description: User with specified ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot find user
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating user status
 */
/**
 * @swagger
 * /user/admin:
 *   get:
 *     summary: Search for users by status, name, or ID card/driving license image.
 *     description: Returns a list of users matching the specified search parameters.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         description: The status of the user account.
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         description: The search query to match against the user's name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         description: The field to sort the results by (newest date, oldest date, or default).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users matching the search parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 count:
 *                   type: integer
 *                   description: The number of users returned in the response.
 *                   example: 2
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A description of the error that occurred.
 *                   example: Internal server error.
 */
/**
 * Returns all chat rooms for a given user.
 *
 * @swagger
 * /api/user/chatRooms/{userId}:
 *   get:
 *     summary: Get all chat rooms for a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose chat rooms are to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of chat rooms for the given user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 612cb54b6d027b0289a2fc8d
 *                       name:
 *                         type: string
 *                         example: JohnDoe
 *                       allowedUsers:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 612cb53c6d027b0289a2fc8b
 *                       messages:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: 612cb5ba6d027b0289a2fc8e
 *                             sender:
 *                               type: string
 *                               example: 612cb53c6d027b0289a2fc8b
 *                             content:
 *                               type: string
 *                               example: Hello there!
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-04-26T12:35:15.476Z"
 *                       matchID:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 612cb6ab6d027b0289a2fc92
 *                           carID:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 612cb6706d027b0289a2fc90
 *                               make:
 *                                 type: string
 *                                 example: Toyota
 *                               model:
 *                                 type: string
 *                                 example: Camry
 *                               year:
 *                                 type: number
 *                                 example: 2020
 *                               color:
 *                                 type: string
 *                                 example: Blue
 *                               mileage:
 *                                 type: number
 *                                 example: 12000
 *                               price:
 *                                 type: number
 *                                 example: 15000
 *                             example:
 *                               _id: 612cb6706d027b0289a2fc90
 *                               make: Toyota
 *                               model: Camry
 *                               year: 2020
 *                               color: Blue
 *                               mileage: 12000
 *                               price: 15000
 *       404:
 *         description: The user with the given ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating user status
 */
/**
 * @swagger
 * /csrf:
 *   get:
 *     summary: Generate a CSRF token for the client to use in forms.
 *     description: Returns a CSRF token for the client to include in form submissions to prevent CSRF attacks.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A CSRF token to include in form submissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The CSRF token.
 *                   example: "r3O8O7WGL2vz6cZL4cxq3z1sA2lIeRdS"
 *       500:
 *         description: An error occurred while generating the CSRF token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A description of the error that occurred.
 *                   example: Internal server error.
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
router
  .route("/user/togglereqLessor")
  .patch(authenticateUser.required, toggleRequestTobeLessor); // toggle requestTobeLessor
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
  .get(authenticateUser.required, authorizeUser("admin"), getUsersBySearch); //get users by search and filter
router
  .route("/api/user/chatRooms/:userId")
  .get(authenticateUser.required, getAllChat);
router.route("/csrf-token").get(authenticateUser.required, getCSRF);

export default router;
