// 1. Wykorzystując ścieżki ze wzorcem(string pattern) stwórzmy web serwer,
// który udostępni końcówkę pozwalającą wyliczyć nam podatek z podanej kwoty i zwróci nam 2 wartości:
// podatek oraz kwota bez podatku.
// http://localhost:4500/podatek/19/25
// gdzie 19 to podatek, a 25 to kwota

// w rezultacie: { "tax": 5, "amount": 20 }

// const express = require("express");
// const app = express();

// app.get("/podatek/:tax/:amount", (req, res) => {
//   const { tax, amount } = req.params;

//   const result = calculateTax(tax, amount);
//   res.send(result);
// });

// 2. Zmodyfikujmy zadanie 1 tak aby dane były przesyłane metodą POST zamiast GET.
// W tym celu powinniśmy zmodyfikować naszą ścieżkę oraz pobieranie parametrów.

const express = require("express");
const router = express.Router();

const calculateTax = (tax, amount) => {
  const taxAmount = (tax / 100) * amount;
  const income = amount - taxAmount;

  return { taxAmount, income };
};

router.post("/podatek", (req, res) => {
  const { tax, amount } = req.body;

  const result = calculateTax(tax, amount);
  res.send(result);
});

module.exports = router;
