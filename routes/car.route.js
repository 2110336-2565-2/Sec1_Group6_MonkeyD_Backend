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
