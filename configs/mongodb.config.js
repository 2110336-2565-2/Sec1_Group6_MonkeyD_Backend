import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const isProduction = process.env.NODE_ENV === "production";

// deprecate **change later**
mongoose.set("strictQuery", true);

const connectToDatabase = () => {
  if (isProduction) {
    mongoose.connect(process.env.MONGO_URI);
  } else {
    mongoose.connect("mongodb://127.0.0.1:27017/testDatabase");
    mongoose.set("debug", true);
  }
};

export default connectToDatabase;
