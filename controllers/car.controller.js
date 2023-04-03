import express from "express";
import mongoose from "mongoose";
import Car from "../models/car.model.js";
import Match from "../models/match.model.js";
import User from "../models/user.model.js";
import {uploadImage, getImageUrl, deleteImage} from "../utils/gcs.utils.js";
import {ObjectId} from "bson";

export const createCars = async (req, res, next) => {
  const car = new Car();

  const {
    owner,
    status = "Pending",
    brand,
    model,
    year,
    gear_type,
    license_plate,
    registration_book_id,
    description,
    available_location,
    energy_types,
    province,
    available_times,
    passenger,
    rating = 0,
    rental_price,
  } = req.body;

  const id = req.body.owner_user_id;
  const carId = new ObjectId();

  const car_images = req.files["car_images"];
  const car_image_uris = [];
  for (const car_image of car_images) {
    const imageUri = await uploadImage(
      car_image,
      process.env.GCS_CAR_IMAGES_BUCKET,
      `${id}/${carId}`,
      null
    );
    car_image_uris.push(imageUri);
  }

  const registration_book_image = req.files["registration_book_image"];

  const registration_book_image_uri = await uploadImage(
    registration_book_image[0],
    process.env.GCS_CAR_REGISTRATION_BOOK_BUCKET,
    "",
    carId
  );
  console.log(energy_types);
  car._id = carId;
  if (owner) car.owner = owner;
  if (status) car.status = status;
  if (brand) car.brand = brand;
  if (model) car.model = model;
  if (year) car.year = year;
  if (gear_type) car.gear_type = gear_type;
  if (license_plate) car.license_plate = license_plate;
  if (registration_book_id) car.registration_book_id = registration_book_id;
  if (registration_book_image_uri)
    car.registration_book_url = registration_book_image_uri;
  if (description) car.description = description;
  if (available_location) car.available_location = available_location;
  if (energy_types) car.energy_types = energy_types;
  if (province) car.province = province;
  if (rental_price) car.rental_price = rental_price;
  if (passenger) car.passenger = passenger;
  if (rating) car.rating = rating;
  if (car_image_uris.length) car.car_images = car_image_uris;
  if (available_times) car.setAvailableTimes(available_times);

  car
    .save()
    .then(function () {
      return res.json({car: car.toAuthJSON()});
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).send({
          error:
            "license_plate or registration_book_id or registration_book_url already exists",
        });
      }
      console.log(error);
      next(error);
    });
};

export const getCars = async (req, res, next) => {
  const show_attrs = {
    owner: 1,
    brand: 1,
    model: 1,
    gear_type: 1,
    energy_types: 1,
    passenger: 1,
    rating: 1,
    province: 1,
    rental_price: 1,
    car_images: 1,
    reviewCount: 1,
  };

  let condition = {renter: null || ""};
  if (req.query.minprice || req.query.maxprice) {
    condition.rental_price = {
      $gte: parseFloat(req.query.minprice) || 0,
      $lte: parseFloat(req.query.maxprice) || 10000000,
    };
  }
  if (req.query.minrating || req.query.maxrating) {
    condition.rating = {
      $gte: parseFloat(req.query.minrating) || 0,
      $lte: parseFloat(req.query.maxrating) || 5,
    };
  }
  if (req.query.startdate && req.query.enddate) {
    // condition.available_times = {
    //   $elemMatch: {
    //     start: {$lte: new Date(req.query.startdate)},
    //     end: {$gte: new Date(req.query.enddate)},
    //   },
    // };
    condition.unavailable_times = {
      $not: {
        $elemMatch: {
          $or: [
            {
              start: {
                $gte: new Date(req.query.startdate),
                $lte: new Date(req.query.enddate),
              },
            },
            {
              end: {
                $gte: new Date(req.query.startdate),
                $lte: new Date(req.query.enddate),
              },
            },
            {
              start: {$lte: new Date(req.query.startdate)},
              end: {$gte: new Date(req.query.enddate)},
            },
          ],
        },
      },
    };
    // console.log(new Date(req.query.startdate), new Date(req.query.enddate));
  }
  if (req.query.province) {
    console.log(req.query.province);
    condition.province = req.query.province;
  }
  if (req.query.brandlist) {
    try {
      const encoded_brandlist = req.query.brandlist;
      const brandlist = JSON.parse(decodeURIComponent(encoded_brandlist));
      if (brandlist.length) {
        condition.brand = {
          $in: brandlist,
        };
      }
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  }

  try {
    let cars = await Car.find(condition, show_attrs).lean();
    for (const car of cars) {
      if (car.car_images && car.car_images.length) {
        const user = await User.findOne(
          {username: car.owner},
          {_id: 1, image: 1}
        );
        let userImageUrl;
        userImageUrl = await getImageUrl(
          process.env.GCS_PROFILE_BUCKET,
          null,
          user.image
        );
        car.user_image = userImageUrl;

        const carImageUrl = await getImageUrl(
          process.env.GCS_CAR_IMAGES_BUCKET,
          null,
          car.car_images[0]
        );

        car.car_image = carImageUrl;
        delete car.car_images;
      }
    }
    return res.json(cars);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getCarInfo = async (req, res, next) => {
  const {id} = req.params;
  try {
    let car = await Car.findOne({_id: id}).lean();
    const user = await User.findOne(
      {username: car.owner},
      {_id: 1, image: 1, rating: 1}
    );

    let car_url = [];

    for (const car_image in car.car_images) {
      console.log(car.car_images[car_image]);
      let carImageUrl = await getImageUrl(
        process.env.GCS_CAR_IMAGES_BUCKET,
        null,
        car.car_images[car_image]
      );
      car_url.push(carImageUrl);
    }

    const user_image = await getImageUrl(
      process.env.GCS_PROFILE_BUCKET,
      null,
      user.image
    );
    car.car_images = car_url;
    car.user_image = user_image;
    car.user_rating = user.rating;
    car.owner_id = user._id;
    return res.json(car);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getMyCar = async (req, res, next) => {
  const username = req.params.id;
  const sortBy = req.body.sortBy;
  const province = req.body.province;

  let query = {owner: username};
  if (province) {
    query.province = province;
  }

  try {
    let cars = await Car.find(query, {
      status: 1,
      energy_types: 1,
      rating: 1,
      reviewCount: 1,
      rentedOutCount: 1,
      brand: 1,
      model: 1,
      gear_type: 1,
      available_location: 1,
      rental_price: 1,
      passenger: 1,
      car_images: 1,
      available_times: 1,
      unavailable_times: 1,
    }).lean();

    for (const car of cars) {
      if (car.car_images && car.car_images.length) {
        const correctURLs = [];
        for (let i = 0; i < car.car_images.length; i += 1) {
          const carImageUrl = await getImageUrl(
            process.env.GCS_CAR_IMAGES_BUCKET,
            null,
            car.car_images[i]
          );
          if (i == 0) car.car_image = carImageUrl;
          correctURLs.push(carImageUrl);
        }
        car.show_images = correctURLs;
      }
    }

    if (sortBy == "highest rating") {
      cars.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else if (sortBy == "lowest rating") {
      cars.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (sortBy == "highest price") {
      cars.sort(function (a, b) {
        return b.rental_price - a.rental_price;
      });
    } else if (sortBy == "lowest price") {
      cars.sort(function (a, b) {
        return a.rental_price - b.rental_price;
      });
    } else {
      cars.sort(function (a, b) {
        return b.rental_price - a.rental_price || b.rating - a.rating;
      });
    }

    return res.json(cars);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const carRented = async (req, res, next) => {
  const car_id = req.headers.car_id;
  // const renter_id = req.headers.renter_id;
  // const pickUpDateTime = req.body.pickUpDateTime;
  // const returnDateTime = req.body.returnDateTime;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }

  // let renter;
  // try {
  //   renter = await User.findById(renter_id);
  //   if (renter == null) {
  //     return res.status(404).json({message: "Cannot find user"});
  //   }
  // } catch (err) {
  //   console.log(err.message);
  //   return res.status(500).json({message: err.message});
  // }

  // car.status = car.status === "Rented" ? "Rented" : "Available";
  car.rentedOutCount += 1;
  // car.unavailable_times.push({
  //   start: pickUpDateTime,
  //   end: returnDateTime,
  //   username: renter.username,
  // });
  car.save();
  res.send("car rented");
};

export const deleteCar = async (req, res, next) => {
  const car_id = req.headers.car_id;
  let car;
  try {
    car = await Car.findByIdAndDelete(car_id);
    if (car == null) {
      return res.status(404).send({message: "Cannot find car"});
    }
    res.send({message: `Car with ID ${car_id} deleted successfully`});
  } catch (err) {
    console.log.error(err.message);
    return res.status(500).json({message: err.message});
  }
};

export const getNumberOfRentals = async (req, res, next) => {
  const {id} = req.params;
  try {
    let car = await Car.findOne({_id: id}, {rentedOutCount: 1});
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    } else {
      return res.json(car);
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const changeCarInfo = async (req, res, next) => {
  const id = req.headers.user_id;
  const car_id = req.headers.car_id;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    }
    //console.log(req.body);
    //console.log(req.body.status);
    if (
      req.body.status &&
      req.body.status !== "Unavailable" &&
      req.body.status !== "Available"
    ) {
      return res
        .status(400)
        .json({message: "Status can only be changed to Unavailable"});
    }
    //Remove image//
    const imagesToRemove = [];
    const car_images_uris = [];

    if (req.body.delete_image) {
      let delete_images = [];
      if (typeof req.body.delete_image !== "object") {
        delete_images = [req.body.delete_image];
      } else {
        delete_images = req.body.delete_image;
      }
      for (const url of delete_images) {
        //console.log(url);
        const regex = /monkeyd-car-images\/(.+?)\?GoogleAccessId/;
        //const regex = new RegExp(`${car_id}/(.*?)\\?GoogleAccessId`);
        const match = url.match(regex);

        if (match && match[1]) {
          const desiredSubstring = match[1];
          imagesToRemove.push(desiredSubstring);
        } else {
          console.log("Pattern not found");
        }
      }
      //console.log(imagesToRemove);
      Car.findOneAndUpdate(
        {_id: car_id},
        {
          $pull: {car_images: {$in: imagesToRemove}},
        },
        {new: true},
        (err, car) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    for (const image of imagesToRemove) {
      deleteImage(process.env.GCS_CAR_IMAGES_BUCKET, "", image);
    }

    //Add image//
    if (req.files && req.files["car_images"]) {
      for (const image of req.files["car_images"]) {
        const imageUri = await uploadImage(
          image,
          process.env.GCS_CAR_IMAGES_BUCKET,
          `${id}/${car_id}`,
          null
        );
        car_images_uris.push(imageUri);
      }
      Car.findOneAndUpdate(
        {_id: car_id},
        {
          $push: {car_images: {$each: car_images_uris}},
        },
        {new: true},
        (err, car) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    Car.findOneAndUpdate(
      {_id: car_id},
      {$set: req.body},
      {new: true},
      (err, car) => {
        if (err) {
          console.log(err);
        } else {
          console.log(car);
        }
      }
    );
    res.send({message: `Car with ID ${car_id} updated successfully`});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
};

export const toggleStatus = async (req, res, next) => {
  const car_id = req.body.car_id;
  const action = req.body.action;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
  if (car.status == "Pending") {
    if (action == "Approve") {
      car.status = "Available";
    } else if (action == "Reject") {
      car.status = "Rejected";
    }
  } else if (car.status == "Rejected") {
    if (action == "Approve") {
      car.status = "Available";
    } else return res.json({message: "No Action can be taken"});
  } else {
    return res.json({message: "No Action can be taken"});
  }
  car.save();
  res.send("Car status changed");
};

export const getCarsInfoFilterSearch = async (req, res, next) => {
  const show_attrs = {
    _id: 1,
    owner: 1,
    renter: 1,
    brand: 1,
    model: 1,
    year: 1,
    registration_book_url: 1,
    registration_book_id: 1,
    license_plate: 1,
    status: 1,
  };
  let filter;
  let search;
  if (req.query.filter) {
    filter = req.query.filter;
  }
  if (req.query.search) {
    search = req.query.search;
  }
  let cars;
  try {
    if (filter == "approved") {
      cars = await Car.find(
        {status: {$in: ["Available", "Rented", "Unavailable"]}},
        show_attrs
      );
    } else if (filter == "rejected") {
      cars = await Car.find({status: "Rejected"}, show_attrs);
    } else if (filter == "pending") {
      cars = await Car.find({status: "Pending"}, show_attrs);
    } else if ((filter == "all") | (filter == null)) {
      cars = await Car.find({}, show_attrs);
    }
    if (search != null) {
      cars = cars.filter((car) =>
        car.license_plate.match(new RegExp(search, "i"))
      );
    }
    // console.log(sendUsers, "in");
    for (const car of cars) {
      const registration_book_image = car.registration_book_url
        ? await getImageUrl(
            process.env.GCS_CAR_REGISTRATION_BOOK_BUCKET,
            null,
            car.registration_book_url
          )
        : "";
      car.registration_book_url = registration_book_image;
    }
    return res.json({cars: cars, count: cars.length});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const carReserved = async (req, res, next) => {
  const {
    carID,
    lessorID,
    renterID,
    status,
    pickupLocation,
    pickUpDateTime,
    returnLocation,
    returnDateTime,
    price,
  } = req.body.match;

  if (renterID == lessorID)
    return res.send({message: "You can't rent your car."});

  let car;
  try {
    car = await Car.findById(carID);
    if (car == null) {
      return res.status(404).send({message: "Cannot find car"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  const isUnavailable = car.unavailable_times.some((interval) => {
    const intervalStart = new Date(interval.start).getTime();
    const intervalEnd = new Date(interval.end).getTime();
    const pickUpTime = new Date(pickUpDateTime).getTime();
    const returnTime = new Date(returnDateTime).getTime();

    return pickUpTime < intervalEnd && returnTime > intervalStart;
  });
  console.log(isUnavailable);
  console.log(pickUpDateTime);
  console.log(returnDateTime);
  console.log(car.unavailable_times);

  if (isUnavailable) return res.send("The target time is unavailable.");

  let renter;
  try {
    renter = await User.findById(renterID);
    if (renter == null) {
      return res.status(404).send({message: "Cannot find user"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  car.unavailable_times.push({
    start: pickUpDateTime,
    end: returnDateTime,
    username: renter.username,
  });

  const match = new Match();
  if (carID) match.carID = carID;
  if (status) match.status = status;
  if (lessorID) match.lessorID = lessorID;
  if (renterID) match.renterID = renterID;
  if (pickupLocation) match.pickupLocation = pickupLocation;
  if (pickUpDateTime) match.pickUpDateTime = new Date(pickUpDateTime);
  if (returnLocation) match.returnLocation = returnLocation;
  if (returnDateTime) match.returnDateTime = new Date(returnDateTime);
  if (price) match.price = price;

  try {
    await car.save();
    await match.save();
    return res.json({match: match.toAuthJSON()});
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({
        error: "something already exists",
      });
    }
    console.log(error);
    next(error);
  }
};

export const getUnavailableTimes = async (req, res, next) => {
  const {id} = req.params;
  try {
    let car = await Car.findOne({_id: id}, {unavailable_times: 1}).lean();
    const user = await User.findOne(
      {username: car.owner},
      {_id: 1, image: 1, rating: 1}
    );

    return res.json(car);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};
