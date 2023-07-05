const express = require("express");
const mongodb = require("./mongodb/mondodb.connect");
const todoRoute = require("./routes/todo.routes");

mongodb.connect();
const app = express();

app.use(express.json());
app.use("/todos", todoRoute);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
module.exports = app;
