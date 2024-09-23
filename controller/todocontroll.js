// import mongoose from "mongoose";

import mongoose from "mongoose";

async function connectToDb() {
  mongoose
    .connect("mongodb://localhost:27017/todo")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

export default connectToDb;
