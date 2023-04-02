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
  toggleStatus,
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
router.route("/car/change-car-info").patch(auth.required, changeCarInfo);
router.route("/car/status").patch(toggleStatus);
// router.route("/car/status").patch(auth.required, toggleStatus);
export default router;
