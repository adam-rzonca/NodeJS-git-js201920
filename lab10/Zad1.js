// 1. Stwórzmy nasz pierwszą aplikację serwerową wykorzystującą system szablonów PUG.
// Obsłużmy ścieżki takie jak:
// '/' - wyświetli przywitanie 'hello world!' jako nagłówek ('h1')
// '/Jan' - wyświetli przywitanie 'hello Jan!' jako nagłówek ('h1')
// '/Adam' - wyświetli przywitanie 'hello Adam!' jako nagłówek ('h1')

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.get("/:name?", function (req, res) {
  const { name = "world" } = req.params;

  const message = "Hello " + name + "!";
  const scope = { message };
  res.render("index", scope);
});

app.listen(4000, () => console.log("start server"));
