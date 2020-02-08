const express = require("express");
const router = express.Router();

const users = [
  { name: "1", username: "1", email: "1@test.pl" },
  { name: "2", username: "2", email: "2@test.pl" }
];

router.get("/add", (req, res) => {
  const { name, username, email } = req.query;
  const user = { name: name, username: username, email: email };

  users.push(user);

  res.send(user);
});

router.get("/list/:id?", (req, res) => {
  const { id } = req.params;
  res.send(id ? users[id] : users);
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  users[id] = null;

  res.send("User deleted");
});

module.exports = router;
