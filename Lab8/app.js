const express = require("express");
const app = express();

const taxRouter = require("./tax");
const quotesRouter = require("./quotes");
const tasksRouter = require("./tasks");
const usersRouter = require("./users");

app.use(express.text()); // Dodanie parsera body w formacie text
app.use(express.json()); // Dodanie parsera body w formacie application/json
app.use(express.urlencoded()); // Dodanie parsera body w formacie application/json

app.use(taxRouter);
app.use("/quotes", quotesRouter);
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.listen(4500);
