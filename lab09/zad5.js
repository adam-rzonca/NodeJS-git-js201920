// 5. Stwórzmy middleware, który sprawdzi czy podana ścieżka jest ścieżką do pliku fizycznego na dysku.
// Jeżeli tak to powinniśmy ten plik wysłać do klienta.
// Jeżeli jednak nie możemy odnaleźć, powinniśmy przesłać dalej wykonywanie naszego żądania
// (tutaj może być pomocny moduł fs).

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const filteredStrings = ["disco polo", "piwo", "hazard", "cukierki"];

const fileNameMiddleware = (req, res, next) => {
  const fileName = req.params.fileName;

  fs.exists(fileName, (exists) => {
    console.log(exists);
    if (exists) {
      res.sendFile(fileName, { root: "." });
    } else {
      next();
    }
  });
};

app.use(bodyParser.text());

app.post("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  let data = req.body;

  // Jeśli req.body jest puste, to jest wtedy pustym obiektem {},
  // req.body.includes się wykrzaczy w tej sytuacji, ponieważ nie jest wołane ze stringa...
  if (typeof data === "object") {
    data = "";
  }

  if (filteredStrings.some((word) => data.includes(word))) {
    res.status(400).send("Client send forbidden words!");
    return;
  }

  fs.writeFile(fileName, data, (err) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.status(201).send("File saved!");
    }
  });
});

app.get("/:fileName", fileNameMiddleware, (req, res) => {
  const fileName = req.params.fileName;

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(4000, () => console.log("start server"));
