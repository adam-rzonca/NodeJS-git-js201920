// 3. Jak możemy zaobserwować podczas tworzenia aplikacji na wbudowanym module HTTP
//    uciążliwe jest pobieranie danych wysłanych przez klienta.
//    Aby usprawnić tworzenie serwera web powstały różne frameworki, m.in. Express,
//    który pozwala na szybsze postawienie naszego serwera.

//    Zmodyfikujmy nasz kod z zadania 2 tak aby był wykorzystywany framework Express.

const express = require("express");
const app = express();

app.get("/:name?", (req, res) => {
  const name = req.params.name || "world";
  res.send(`Hello ${name}`);
});

app.listen(4700);
