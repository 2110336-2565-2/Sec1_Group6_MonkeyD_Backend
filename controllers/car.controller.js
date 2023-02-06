import express from "express";
import mongoose from "mongoose";
import Car from "../models/car.model.js";

export const createCars = (req, res, next) => {
  console.log(req.body);
  const car = new Car();
  const {
    owner,
    status,
    brand,
    model,
    age,
    gear_type,
    license_plate,
    registration_book_id,
    registration_book_url,
    energy_types,
    latitude,
    longitude,
    available_times,
    passenger,
    rental_price,
    car_images,
  } = req.body.car;
  car.owner = owner;
  car.status = status;
  car.brand = brand;
  car.model = model;
  car.age = age;
  car.gear_type = gear_type;
  car.license_plate = license_plate;
  car.registration_book_id = registration_book_id;
  car.registration_book_url = registration_book_url;
  car.energy_types = energy_types;
  car.rental_price = rental_price;
  car.passenger = passenger;
  car.car_images = car_images;
  car.setLocation(latitude, longitude);
  car.setAvailableTimes(available_times);

  car
    .save()
    .then(function () {
      return res.json({ car: car.toAuthJSON() });
    })
    .catch(function (error) {
      if (error.code === 11000) {
        return res.status(400).send({
          error:
            "license_plate or registration_book_id or registration_book_url already exists",
        });
      }
      next(error);
    });
};

export const getCars = (req, res, next) => {
  res.send("get cars");
};
