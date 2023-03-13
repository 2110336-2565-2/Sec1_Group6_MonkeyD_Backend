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

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  // .post(auth.required, createCars)
  .post(createCars)
  .patch(auth.required, toggleRented)
  .delete(auth.required, deleteCar);
router.route("/car/:id").get(getCarInfo);
router.route("/car/number-of-rental/:id").get(auth.required, getNumberOfRentals);

router.route("/car/me/:username").get(auth.required, getMyCar);
router.route("/car/change-car-info").patch(auth.required, changeCarInfo);

export default router;
