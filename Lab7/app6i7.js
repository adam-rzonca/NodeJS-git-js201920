// 6. Stwórzmy aplikację której zadaniem będzie operacja na tablicy zawierającej użytkowników
//    * Stworzyć 'końcówkę' /add do dodawania użytkownika która przyjmuje parametry:
//    ?name=Jan&username=janko&email=jan@nowak.abc
//    * Dodać ścieżkę wyświetlania wszystkich użytkowników
//    * jeżeli zostanie podany odpowiedni id    wyświetlić jedynie jednego użytkownika.
//    * Rozszerzyć aplikację o kasowanie użytkownika poprzez odpowiednią ścieżkę.

// 7. Wzorując się na zadaniu 6 stwórzmy analogicznie obsługę tablicy zawierającej posty.
// Aplikacja ma rozszerzyć naszą już istniejącą aplikację z zadania 6.

const express = require("express");
const app = express();

const users = [
  { name: "1", username: "1", email: "1@test.pl" },
  { name: "2", username: "2", email: "2@test.pl" }
];
const posts = [{ userId: 0, title: "Ala ma kota", body: "a kot ma Alę" }];

app.get("/users/add", (req, res) => {
  const { name, username, email } = req.query;
  const user = { name: name, username: username, email: email };

  users.push(user);

  res.send(user);
});

app.get("/users/list/:id?", (req, res) => {
  const { id } = req.params;
  res.send(id ? users[id] : users);
});

app.get("/users/delete/:id", (req, res) => {
  const { id } = req.params;
  users[id] = null;

  res.send("User deleted");
});

app.get("/posts/add", (req, res) => {
  const { userId, title, body } = req.query;
  const post = { userId: userId, title: title, body: body };

  posts.push(post);

  res.send(post);
});

app.get("/posts/list/:id?", (req, res) => {
  const { id } = req.params;
  res.send(id ? posts[id] : posts);
});

app.get("/posts/delete/:id", (req, res) => {
  const { id } = req.params;
  posts[id] = null;

  res.send("Post deleted");
});

app.listen(4700);
