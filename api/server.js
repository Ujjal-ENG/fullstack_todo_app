const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>This is the Home page</h1>");
});

mongoose
  .connect("mongodb://localhost:27017/mern-todo", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Error Is: ", error);
  });

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  
})


app.listen(3001, () => {
  console.log(`Server is running at http://localhost:${3001}`);
});
