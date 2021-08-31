// 4. Stwórzmy WEB API które wczyta podany plik(asynchronicznie!)
// i wyśle zawartość do użytkownika końcowego.
// W katalogu ./static zostały dodane przykładowe pliki.

// Scenariusz 1: ścieżka: /music.txt - wczytaj zawartość pliku i wyślij do użytkownika
// Scenariusz 2: ścieżka: /movies.txt - wyrzuci błąd
// Scenariusz 3: ścieżka: /sample.txt - wczytaj zawartość pliku i wyślij do użytkownika

// 5. Dodajmy do zdania 4 middleware obsługujący błąd i wyświetlmy swoją stronę z błędem.
// W zadaniu wykorzystajmy system szablonów mustache

const express = require("express");
const app = express();
const fs = require("fs");

const mustacheExpress = require("mustache-express");
const { nextTick } = require("process");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/:fileName", (req, res, next) => {
  const fileName = req.params.fileName;

  const path = "./static/" + fileName;

  fs.readFile(path, (error, data) => {
    if (error) {
      next(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.use((error, req, res, next) => {
  const { message } = error;
  console.log(message);
  res.render("index", { message });
});

app.listen(4000, () => console.log("start server"));
