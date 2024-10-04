import express from "express";
import Todos from "../models/todomodel.js";
import { render } from "ejs";
const router = express.Router();

router.get("/", async function (req, res) {
  const todos = await Todos.find();
  res.render("home", { todos });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", async function (req, res) {
  const { title, description } = req.body;

  const singleTodo = {
    title,
    description,
  };

  await Todos.create(singleTodo);
  res.redirect("/");
});

router.post("/delete/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const DT = await Todos.findByIdAndDelete(id);

    if (!DT) {
      res.send("Todo item not found");
    }

    res.redirect("/");
  } catch (error) {
    res.send("Failed to delete the todo item.");
  }
});

router.get("/update/:title", async function (req, res) {
  const { title } = req.params;
  try {
    const todo = await Todos.findOne({ title });

    if (todo) {
      const singleTodo = {
        title: todo.title,
        description: todo.description,
      };

      res.render("update", { singleTodo });
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/update/:title", async function (req, res) {
  const { title } = req.params;
  const { newTitle, description } = req.body;

  try {
    const todo = await Todos.findOneAndUpdate(
      { title },
      { title: newTitle, description }
    );

    if (todo) {
      res.redirect("/");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
