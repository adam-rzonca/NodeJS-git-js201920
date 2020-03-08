// 6. Dodajmy do naszej aplikacji dodatkowy moduł, który będzie zarządzał użytkownikami.
// * doda nowego użytkownika (POST)
// * wyświetli użytkowników (GET)
// * usunie użytkownika (DELETE)
// * podmieni cały obiekt (PUT)

const express = require("express");
const router = express.Router();

let users = require("./users.json");
let counter = users.length;

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id?", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.sendStatus(400);
  } else {
    const newUser = { id: ++counter, name, email };
    // concat zwraca nową tablicę
    users = users.concat(newUser);
    res.sendStatus(201);
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const oldLength = users.length;

  // filter zwraca nową tablicę
  users = users.filter(u => u.id !== id);

  if (oldLength !== users.length) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const item = users.find(u => u.id === id);

  if (!item) {
    res.sendStatus(404);
  } else {
    const { name, email } = req.body;

    if (!name || !email) {
      res.sendStatus(400);
    } else {
      const updatedUser = { id, name, email };

      // Zwracamy nową tablicę
      users = users.map(t => (t === item ? updatedUser : t));
      res.sendStatus(200);
    }
  }
});

module.exports = router;
