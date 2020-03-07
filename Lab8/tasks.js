// 4. Dodajmy do naszej aplikacji z zadania 3 nową funkcjonalność. Stwórzmy moduł pozwalający na zarządzanie listą zadań. (Task manager/TODO list).
// * wyświetlanie wszystkich dostępnych zadań (GET)
// * wyświetlanie konkretnego zadania (GET)
// * dodawanie zadania (POST)
// * usuwanie zadania (DELETE)
// * edytowanie zadania (PUT)

// 5 Zaimplementujmy nową funkcjonalność do naszego modułu zarządzania lista zadań. Nasz moduł powinien pozwalać na zaznaczenie oraz odznaczenie iż zadanie zostało już wykonane czy też nie.
// * stworzyć możliwość zmiany statusu zadania (wykonane/niewykonane) (PATCH?)
// * dać możliwość wyświetlenia wszystkich zadań lub też wykonanych/niewykonanych (GET)

// !!! PYTANIA !!!
// 1. Czy metoda patch powinna być uniwersalna? Np. czy powinna aktualizować dowolne właściwości obiektu
// lub kilka z nich a nie tylko jedną?
//
// 2. https://restfulapi.net/rest-put-vs-post/
// Jeśli PUT odnosi się do istniejącego zasobu, powinien go zaktualiozwać. Jeśli zasób nie istnieje
// powinien go utworzyć? Czy chodzi o przypadek, że próbujumey zaktualizować zób, który ktoś przed chwilą
// np. usunął?

const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");
let counter = tasks.length;

router.get("/", (req, res) => {
  const query = req.query;

  // Sprawdzam, czy obiekt query jest pusty
  if (Object.keys(query).length === 0 && query.constructor === Object) {
    res.send(tasks);
  } else {
    try {
      let { status } = query;
      status = JSON.parse(status);

      const result = tasks.filter(task => task.status === status);
      res.send(result);
    } catch (err) {
      res.sendStatus(400);
    }
  }
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
  const { task, status } = req.body;

  if (!task || !status) {
    res.sendStatus(400);
  } else {
    const newTask = { id: ++counter, task, status };
    // concat zwraca nową tablicę
    tasks = tasks.concat(newTask);
    res.sendStatus(201);
  }
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
  } else {
    const { task, status } = req.body;

    if (!task || !status) {
      res.sendStatus(404);
    } else {
      const updatedTask = { id, task, status };

      // Zwracamy nową tablicę
      tasks = tasks.map(t => (t === item ? updatedTask : t));
      res.sendStatus(200);
    }
  }
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const item = tasks.find(t => t.id === id);

  if (!item) {
    res.sendStatus(404);
  } else {
    const { status } = req.body;

    if (!status) {
      res.sendStatus(400);
    } else {
      item.status = status;

      // Zwracamy nową tablicę
      tasks = tasks.map(t => t);
      res.sendStatus(200);
    }
  }
});
module.exports = router;
