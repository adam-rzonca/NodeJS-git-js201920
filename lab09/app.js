// 1. Stwórzmy swoje pierwsze oprogramowanie pośrednie(middleware).
// Zadaniem middleware będzie nasłuchiwanie wszystkich żądań do serwera
// i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać,
// jaką metodą oraz czy zawiera w sobie parametry.

// 2. Kolejnym zadaniem jest stworzenie middleware, który zabezpieczy naszą aplikację dla osób nie upoważnionych.
// Użytkownik powinien wysłać w nagłówku token, który autoryzuje go i wpuszcza do dalszej części aplikacji.
// Przyjmijmy że nazwa nagłówka to authorization, a wartość która wpuszcza nas do systemu to alamakota.

// 3. Zmodyfikujmy zadanie 2 tak aby nagłówek authorization składał się z użytkownika
// i hasła (wzór: login:password, np. jan:alamakota)
// oraz sprawdżmy czy w systemie jest taki użytkownik z takim hasłem.
// Jeżeli użytkownik istnieje, powinniśmy zmodyfikować request, aby przekazać znalezionego użytkownika dalej.

// 4. Wykorzystując zewnętrzny middleware body-parser, odczytajmy zawartość żądania typu text
// i sprawdźmy czy w przesłanym przez użytkownika tekście nie zostały umieszczone niecenzuralne słowa.
// Jeżeli jakieś słowo podane ze słownika znajduje się w żądaniu zakończmy cykl wysyłając błąd
// dla użytkownika końcowego(status błędu 400).
// Przykładowy słowinik zakazanych słów: ['disco polo', 'piwo', 'hazard', 'cukierki']

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = [
  { login: "jan", password: "alamakota" },
  { login: "adam", password: "kotmaale" },
];

const filteredStrings = ["disco polo", "piwo", "hazard", "cukierki"];

const logMiddleware = (req, res, next) => {
  console.log("Url:", req.url);
  console.log("Query params", req.query);
  console.log("Params:", req.params);
  console.log("Method", req.method);
  next();
};

const authMiddleware = (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");

  console.log(login, password);

  let user = users.find((u) => u.login === login);

  if (user && user.password === password) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(logMiddleware);
app.use(authMiddleware);

app.use(bodyParser.text());

app.post("/", (req, res) => {
  if (filteredStrings.some((word) => req.body.includes(word))) {
    res.status(400).send("Zabronione słowa");
    return;
  }

  // Tu zadanie 5
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(4000, () => console.log("start server"));
