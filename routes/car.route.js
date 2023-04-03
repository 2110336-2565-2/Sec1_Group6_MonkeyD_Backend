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
import auth from "../middlewares/jwt.middleware.js";
import {upload} from "../middlewares/image.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(
    auth.required,
    upload.fields([
      {name: "registration_book_image", maxCount: 1},
      {name: "car_images", maxCount: 10},
    ]),
    createCars
  )
  .patch(auth.required, carRented)
  .delete(auth.required, deleteCar);

router.route("/car/admin").get(getCarsInfoFilterSearch);

router.route("/car/me/:id").post(getMyCar);

router.route("/car/:id").get(getCarInfo);
router.route("/car/busy/:id").get(getUnavailableTimes);
router
  .route("/car/number-of-rental/:id")
  .get(auth.required, getNumberOfRentals);

router.route("/car/me/:username").get(auth.required, getMyCar);
router
  .route("/car/change-car-info")
  .patch(
    // auth.required,
    upload.fields([{name: "car_images", maxCount:10}]),
    changeCarInfo
  );


router.route("/car/status").patch(auth.required, toggleStatus);

router.route("/car/reserve").patch(carReserved);

export default router;
