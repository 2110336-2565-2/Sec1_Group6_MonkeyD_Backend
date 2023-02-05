import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const CarSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: [
        "Pending",
        "Verified",
        "Updating",
        "Unavailable",
        "Available",
        "Rented",
        "WaitForInspectation",
        "Inspected",
        "FixingOrPreparing",
        "CarChecking",
      ],
    },
    brand: {
      type: String,
      required: [true, "can't be blank"],
    },
    model: {
      type: String,
      required: [true, "can't be blank"],
    },
    gear_type: {
      type: String,
      enum: ["Manual", "Auto"],
      required: [true, "can't be blank"],
    },
    age: {
      type: Number,
      required: [true, "can't be blank"],
    },
    license_plate: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    registration_book_id: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    registration_book_url: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    energy_types: [
      {
        type: String,
        enum: [
          "DieselB7",
          "DieselB10",
          "Gasohol95",
          "Gasohol91",
          "E20",
          "E85",
          "LPG",
          "NGV",
          "EV",
        ],
        required: [true, "can't be blank"],
      },
    ],
    location: {
      //GeoJSON
      type: {
        type: String,
        enum: ["Point"],
        required: [true, "can't be blank"],
      },
      coordinates: {
        type: [Number], //[long,lat]
        required: [true, "can't be blank"],
      },
    },
    available_times: [
      {
        start: {
          type: Date,
          required: [true, "can't be blank"],
        },
        end: {
          type: Date,
          required: [true, "can't be blank"],
        },
      },
    ],
    rental_price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    car_images: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);

CarSchema.methods.setLocation = function (latitude, longitude) {
  this.location = {
    type: "Point",
    coordinates: [longitude, latitude],
  };
};

CarSchema.methods.setAvailableTimes = function (times) {
  let available_times = times;
  available_times.map(strToDate);
  function strToDate(x) {
    return {
      start: new Date(x.start),
      end: new Date(x.end),
    };
  }
  this.available_times = available_times;
};

CarSchema.methods.toAuthJSON = function () {
  return {
    owner: this.owner,
    brand: this.brand,
    model: this.model,
    license_plate: this.license_plate,
    gear_type: this.gear_type,
    age: this.age,
    energy_types: this.energy_types,
    location: this.location,
    available_times: this.available_times.map((x) => ({
      start: x.start,
      end: x.end,
    })),
    rental_price: this.rental_price,
    car_images: this.car_images,
  };
};

const Car = mongoose.model("Car", CarSchema);
export default Car;
