// 4. Dodajmy do naszej aplikacji z zadania 3 nową funkcjonalność. Stwórzmy moduł pozwalający na zarządzanie listą zadań. (Task manager/TODO list).
// * wyświetlanie wszystkich dostępnych zadań (GET)
// * wyświetlanie konkretnego zadania (GET)
// * dodawanie zadania (POST)
// * usuwanie zadania (DELETE)
// * edytowanie zadania (PUT)

// 5 Zaimplementujmy nową funkcjonalność do naszego modułu zarządzania lista zadań. Nasz moduł powinien pozwalać na zaznaczenie oraz odznaczenie iż zadanie zostało już wykonane czy też nie.
// * stworzyć możliwość zmiany statusu zadania (wykonane/niewykonane) (PATCH?)
// * dać możliwość wyświetlenia wszystkich zadań lub też wykonanych/niewykonanych (GET)

const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");
let counter = tasks.length;

router.get("/", (req, res) => {
  const query = req.query;

  // Sprawdzam, czy obiekt query jest pusty
  if (Object.keys(query).length === 0 && query.constructor === Object) {
    res.send(tasks);
    return;
  }

  let { completed } = query;

  try {
    completed = JSON.parse(completed);
  } catch (err) {
    res.sendStatus(400);
    return;
  }

  const result = tasks.filter(task => task.completed === completed);
  res.send(result);
});

router.get("/:id?", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (task) {
    res.send(task);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  let { task, completed } = req.body;

  try {
    completed = JSON.parse(completed);
  } catch (err) {
    res.sendStatus(400);
    return;
  }

  if (!task) {
    res.sendStatus(400);
    return;
  }

  const newTask = { id: ++counter, task, completed };
  // concat zwraca nową tablicę
  tasks = tasks.concat(newTask);
  res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const oldLength = tasks.length;

  // filter zwraca nową tablicę
  tasks = tasks.filter(t => t.id !== id);

  if (oldLength !== tasks.length) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = tasks.find(t => t.id === id);

  if (!item) {
    res.sendStatus(404);
    return;
  }

  let { task, completed } = req.body;

  try {
    completed = JSON.parse(completed);
  } catch (err) {
    res.sendStatus(400);
    return;
  }

  if (!task) {
    res.sendStatus(400);
    return;
  }

  const updatedTask = { id, task, completed };

  // Zwracamy nową tablicę
  tasks = tasks.map(t => (t === item ? updatedTask : t));
  res.sendStatus(200);
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const item = tasks.find(t => t.id === id);

  if (!item) {
    res.sendStatus(404);
    return;
  }

  let { completed } = req.body;

  try {
    completed = JSON.parse(completed);
  } catch (err) {
    res.sendStatus(400);
    return;
  }

  item.completed = completed;

  // Zwracamy nową tablicę
  tasks = tasks.map(t => t);
  res.sendStatus(200);
});
module.exports = router;
