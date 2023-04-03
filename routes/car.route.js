import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
  getMyCar,
  deleteCar,
  getNumberOfRentals,
  changeCarInfo,
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
  .patch(auth.required, toggleRented)
  .delete(auth.required, deleteCar);
router.route("/car/:id").get(getCarInfo);
router
  .route("/car/number-of-rental/:id")
  .get(auth.required, getNumberOfRentals);

router.route("/car/me/:username").get(auth.required, getMyCar);
router
  .route("/car/change-car-info")
  .patch(
    auth.required,
    upload.fields([{name: "car_images", maxCount:10}]),
    changeCarInfo
  );

export default router;
