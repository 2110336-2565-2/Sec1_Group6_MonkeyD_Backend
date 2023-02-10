import express from "express";
import {createCars, getCars, toggleRented} from "../controllers/car.controller.js";

const router = express.Router();

router.route("/car").post(createCars);
router.route("/car").get(getCars);
router.route("/car").patch(toggleRented);

export default router;
