import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Todos = mongoose.model("Todo", todoSchema);
export default Todos;
