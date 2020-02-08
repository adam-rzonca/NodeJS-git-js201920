// 4. Stwórzmy aplikację która pobierając 2 parametry a i b z adresu url wykona mnożenie w naszej aplikacji.
//    Rezultat działania powinniśmy wysłać do użytkownika końcowego(klienta).

const express = require("express");
const app = express();

app.get("/:op/a/:a/b/:b", (req, res) => {
  let { op, a, b } = req.params;
  let result;

  a = Number(a);
  b = Number(b);

  switch (op) {
    case "add":
      result = a + b;
      break;
    case "sub":
      result = a - b;
      break;
    case "mult":
      result = a * b;
      break;
    case "div":
      result = a / b;
      break;
    default:
      result = "unknown operation!";
      break;
  }

  res.send(`Result: ${result}`);
});

app.listen(4700);
