import express from "express";
import { createCars, getCars } from "../controllers/car.controller.js";

const router = express.Router();

router.route("/car").post(createCars);
router.route("/car").get(getCars);

export default router;
