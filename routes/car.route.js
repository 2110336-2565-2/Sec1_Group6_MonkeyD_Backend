/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - owner
 *         - status
 *         - brand
 *         - model
 *         - gear_type
 *         - year
 *         - license_plate
 *         - registration_book_id
 *         - registration_book_url
 *         - energy_types
 *         - province
 *         - rental_price
 *         - passenger
 *         - hygieneRating
 *         - carConditionRating
 *         - serviceRating
 *         - rating
 *         - reviewCount
 *       properties:
 *         owner:
 *           type: string
 *           description: The owner of the car.
 *           example: "john_doe"
 *         renter:
 *           type: string
 *           description: The renter of the car.
 *           example: "jane_doe"
 *         status:
 *           type: string
 *           enum: [ "Pending", "Rejected", "Unavailable", "Available" ]
 *           description: The status of the car.
 *           example: "Pending"
 *         brand:
 *           type: string
 *           description: The brand of the car.
 *           example: "Toyota"
 *         model:
 *           type: string
 *           description: The model of the car.
 *           example: "Camry"
 *         gear_type:
 *           type: string
 *           enum: [ "Manual", "Auto" ]
 *           description: The type of the car's gear.
 *           example: "Manual"
 *         year:
 *           type: number
 *           description: The year of the car.
 *           example: 2022
 *         description:
 *           type: string
 *           description: A description of the car.
 *           example: "A brand new car!"
 *         license_plate:
 *           type: string
 *           description: The license plate of the car.
 *           example: "ABC123"
 *         registration_book_id:
 *           type: string
 *           description: The ID of the registration book of the car.
 *           example: "123456789"
 *         registration_book_url:
 *           type: string
 *           description: The URL of the registration book of the car.
 *           example: "https://example.com/registration_book.pdf"
 *         available_location:
 *           type: string
 *           description: The location where the car is available for rent.
 *           example: "Bangkok"
 *         energy_types:
 *           type: array
 *           items:
 *             type: string
 *             enum: [ "DieselB7", "DieselB10", "Gasohol95", "Gasohol91", "E20", "E85", "LPG", "NGV", "EV" ]
 *             description: The energy types of the car.
 *             example: [ "DieselB7", "DieselB10" ]
 *         province:
 *           type: string
 *           description: The province where the car is located.
 *           example: "Bangkok"
 *         unavailable_times:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the car's unavailability.
 *                 example: '2022-01-01T12:00:00Z'
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: '2022-01-02T12:00:00Z'
 *               username:
 *                 type: string
 *                 example: john_doe
 *           description: An array of times when the car is unavailable for rental
 *           example: [{start: '2022-01-01T12:00:00Z', end: '2022-01-02T12:00:00Z', username: john_doe}]
 *         car_images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs for the car
 *           example: ['https://example.com/car-image1.jpg', 'https://example.com/car-image2.jpg']
 *         rental_price:
 *           type: number
 *           minimum: 0
 *           description: The rental price for the car
 *           example: 5000
 *         passenger:
 *           type: number
 *           minimum: 0
 *           description: The number of passengers the car can accommodate
 *           example: 4
 *         hygieneRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The hygiene rating for the car, on a scale of 0 to 5
 *           example: 3
 *         carConditionRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The condition rating for the car, on a scale of 0 to 5
 *           example
 *         serviceRating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 5
 *           description: The service rating for the car rental provider, on a scale of 0 to 5
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           default: 0
 *           description: The overall rating for the car, based on customer reviews, on a scale of 0 to 5
 *         reviewCount:
 *           type: number
 *           default: 0
 *           description: The number of customer reviews for the car
 *         rentedOutCount:
 *           type: number
 *           default: 0
 *           description: The number of times the car has been rented out
 */
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: API for managing cars.
 * 
 * /car:
 *   get:
 *     summary: Get a list of all available cars.
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: A list of all available cars.
 *   post:
 *     summary: Create a new car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               registration_book_image:
 *                 type: string
 *                 format: binary
 *               car_images:
 *                 type: string
 *                 format: binary
 *             required:
 *               - registration_book_image
 *               - car_images
 *     responses:
 *       201:
 *         description: Car created successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 *   patch:
 *     summary: Mark a car as rented.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car marked as rented successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 *   delete:
 *     summary: Delete a car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car deleted successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/admin:
 *   get:
 *     summary: Get a list of all cars with filter and search functionality for admin.
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: A list of all cars.
 * 
 * /car/me/{id}:
 *   post:
 *     summary: Get the details of a user's car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details retrieved successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/{id}:
 *   get:
 *     summary: Get the details of a car.
 *     tags: [Car]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details retrieved successfully.
 *       400:
 *         description: Invalid request body.
 * 
 * /car/busy/{id}:
 *   get:
 *     summary: Get the unavailable times for a specific car.
 *     tags: [Car]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to get unavailable times for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of unavailable times for the specified car.
 * 
 * /car/number-of-rental/{id}:
 *   get:
 *     summary: Get the number of rentals for a specific car.
 *     tags: [Car]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to get the number of rentals for.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Number of rentals for the specified car.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/me/{username}:
 *   get:
 *     summary: Get details of a user's car.
 *     tags: [Car]
 *     parameters:
 *       - name: username
 *         in: path
 *         description: Username of the user whose car details to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the user's car.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/change-car-info:
 *   patch:
 *     summary: Change the information of a car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               car_images:
 *                 type: string
 *                 format: binary
 *             required:
 *               - car_images
 *     responses:
 *       200:
 *         description: Car information changed successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/status:
 *   patch:
 *     summary: Toggle the status of a car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car status toggled successfully.
 *       401:
 *         description: Unauthorized access.
 * 
 * /car/reserve:
 *   patch:
 *     summary: Reserve a car.
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car reserved successfully.
 *       401:
 *         description: Unauthorized access.
 */


import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  getMyCar,
  deleteCar,
  getNumberOfRentals,
  changeCarInfo,
  toggleStatus,
  carReserved,
  getCarsInfoFilterSearch,
  carRented,
  getUnavailableTimes,
} from "../controllers/car.controller.js";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/image.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(
    authenticateUser.required,
    authorizeUser("lessor"),
    upload.fields([
      {name: "registration_book_image", maxCount: 1},
      {name: "car_images", maxCount: 10},
    ]),
    createCars
  )
  .patch(authenticateUser.required, carRented)
  .delete(
    authenticateUser.required,
    authorizeUser("lessor", "admin"),
    deleteCar
  );

router
  .route("/car/admin")
  .get(
    authenticateUser.required,
    authorizeUser("admin"),
    getCarsInfoFilterSearch
  );

router
  .route("/car/me/:username")
  .post(authenticateUser.required, authorizeUser("lessor"), getMyCar);

router.route("/car/:id").get(getCarInfo);
router.route("/car/busy/:id").get(getUnavailableTimes);
router.route("/car/number-of-rental/:id").get(getNumberOfRentals);

router
  .route("/car/change-car-info")
  .patch(
    authenticateUser.required,
    authorizeUser("lessor", "admin"),
    upload.fields([{name: "car_images", maxCount: 10}]),
    changeCarInfo
  );

router
  .route("/car/status")
  .patch(authenticateUser.required, authorizeUser("admin"), toggleStatus);

router.route("/car/reserve").patch(carReserved);

export default router;

