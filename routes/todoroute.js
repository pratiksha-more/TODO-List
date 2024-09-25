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

// router.get("/todo/:id", async function (req, res) {
//   const { id } = req.params;
//   try {
//     const todo = await Todos.findById(id);
//     if (!todo) {
//       return res.status(404).send("Todo not found");
//     }
//     res.render("todo", { todo });
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

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

router.get("/update/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const todo = Todos.find(id);

    if (todo) {
      const { title, description } = req.body;
      const singleTodo = {
        title,
        description,
      };

      res.render("add");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
