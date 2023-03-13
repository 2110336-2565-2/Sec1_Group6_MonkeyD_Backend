import express from "express";
import {
  createCars,
  getCars,
  getCarInfo,
  toggleRented,
  getMyCar,
  deleteCar,
  changeCarInfo,
} from "../controllers/car.controller.js";
import auth from "../middlewares/jwt.middleware.js";

const router = express.Router();

router
  .route("/car")
  .get(getCars)
  .post(createCars)
  //.post(auth.required, createCars)
  .patch(auth.required, toggleRented)
  .delete(auth.required, deleteCar);
router.route("/car/:id").get(getCarInfo);
router.route("/car/me/:username").get(getMyCar);
//router.route("/car/me/:username").get(auth.required, getMyCar);
router.route("/car/change-car-info").patch(changeCarInfo);

export default router;
