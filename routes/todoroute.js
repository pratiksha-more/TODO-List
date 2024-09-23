import express from "express";
import Todos from "../models/todomodel.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const todos = await Todos.find();
  res.render("home", { todos });
  // res.send("get request");
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

// router.get("/todo/:id", function (req, res) {
//   const { id } = req.params;
//   const todo = todos[id];
//   res.render("todo", { todo });
// });

router.get("/todo/:id", async function (req, res) {
  // **Error:** Should be async to handle database operations
  const { id } = req.params;
  // const todo = todos[id]; // **Error:** 'todos' is not defined. Fetch from DB instead.
  try {
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.render("todo", { todo });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
export default router;
