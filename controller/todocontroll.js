// import mongoose from "mongoose";

// // async function connectToDb() {
// //   await mongoose.connect(" mongodb://localhost:27017/todo");
// //   console.log("connected to db");

// // }
// // connectToDb();

// export default connectToDb;

//const mongoose = require("mongoose");
import mongoose from "mongoose";
// Correct MongoDB connection string
async function connectToDb() {
  mongoose
    .connect("mongodb://localhost:27017/todo")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

// connectToDb();

export default connectToDb;
