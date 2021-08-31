// 4. Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania typu text
// i sprawdźmy czy w przesłanym przez użytkownika tekście nie zostały umieszczone niecenzuralne słowa.
// Jeżeli jakieś słowo podane ze słownika znajduje się w żądaniu zakończmy cykl wysyłając błąd
// dla użytkownika końcowego(status błędu 400).
// Przykładowy słownik zakazanych słów: ['disco polo', 'piwo', 'hazard', 'cukierki']

// Stwórzmy tutaj dodatkowo REST API do zapisu i wyświetlania zawartości
// przesłanego tekstu przez użytkownika. Zapiszmy to na dysku w pliku tektowym

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const filteredStrings = ["disco polo", "piwo", "hazard", "cukierki"];

app.use(bodyParser.text());

app.post("/", (req, res) => {
  if (filteredStrings.some((word) => req.body.includes(word))) {
    res.status(400).send("Client send forbidden words!");
    return;
  }

  fs.writeFile("data.txt", req.body, (err) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(201).send("File saved!");
    }
  });
});

app.get("/", (req, res) => {
  fs.readFile("data.txt", (err, data) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(4000, () => console.log("start server"));
