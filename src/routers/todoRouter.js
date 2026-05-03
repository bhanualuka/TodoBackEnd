const express = require("express");
const Todo = require("../Models/Todos");
const { find } = require("../Models/user");
const { userAuth } = require("../Middleware/userAuth");
const todoRouter = express.Router();

todoRouter.post("/todo/post", userAuth, async (req, res) => {
  try {
    const { text } = req.body;

    const todos = new Todo({
      text,
    });

    const savedTodos = await todos.save();

    const allTodos = await Todo.find({});

    res.json({ message: "Todos fetched Succesfully", data: allTodos });
  } catch (err) {
    res.status(400).send("Something went Wrong :", err.message);
  }
});

todoRouter.post("/todo/delete/:_id", userAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    const updateTodo = await Todo.findByIdAndDelete(_id);

    const todos = await Todo.find({});

    res.json({ message: "sucessfully deleted", updateData: todos });
  } catch (err) {
    res.send("Something Went Wrong: " + err.message);
  }
});

module.exports = todoRouter;
