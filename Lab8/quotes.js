// 3. Stwórzmy pierwsze pełne REST API, które pozwoli nam na zarządzanie cytatami (klasyczny CRUD).
// * wyświetlane wszystkich cytatów (GET)
// * wyświetlane konkretnego cytatu (GET)
// * dodawanie cytatu (POST)
// * usunie cytatu (DELETE)
// * edytowanie cytatu (PUT)

let quotes = require("./quotes.json");

const express = require("express");
const router = express.Router();

let counter = quotes.length;

router.get("/", (req, res) => {
  res.send(quotes);
});

router.get("/:id?", (req, res) => {
  const id = parseInt(req.params.id);

  const quote = quotes.find(q => q.id == id);

  if (quote) {
    res.send(quote);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const { quote, author } = req.body;

  if (!quote || !author) {
    res.sendStatus(400);
  } else {
    const newQuote = { id: ++counter, quote, author };
    quotes.push(newQuote);
    res.sendStatus(201);
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const idx = quotes.findIndex(q => q.id == id);

  console.log(idx);

  if (idx !== -1) {
    quotes.splice(idx, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const item = quotes.find(q => q.id == id);

  if (item) {
    const { author, quote } = req.body;

    if (!quote || !author) {
      res.sendStatus(400);
    } else {
      const updatedQuote = { id, author, quote };

      quotes = quotes.map(q => (q === item ? updatedQuote : q));
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
