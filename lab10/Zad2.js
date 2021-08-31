// 2. Przećwiczmy wczytywanie szablonów zmieniając system szablonów PUG
// na MUSTACHE(https://github.com/bryanburgers/node-mustache-express).
// Stwórzmy aplikację, która wyliczy nam podatek z podanej kwoty i zwróci nam widok z danymi.
// Przykład ścieżki /podatek/19/25, gdzie 19 to wysokość vat podana w procentach oraz 25 kwota.

const express = require("express");
const app = express();

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/podatek/:tax/:price", function (req, res) {
  const { tax, price } = req.params;
  const { calculatedTax, priceWithoutTax } = calculateTax(tax, price);

  res.render("index", { tax, price, calculatedTax, priceWithoutTax });
});

const calculateTax = (tax, price) => {
  const calculatedTax = (tax / 100) * price;
  const priceWithoutTax = price - calculatedTax;

  return { calculatedTax, priceWithoutTax };
};

app.listen(4000, () => console.log("start server"));
