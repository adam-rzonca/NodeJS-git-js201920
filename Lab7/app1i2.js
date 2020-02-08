// 1. Stwórzmy nasz pierwszy serwer wykorzystując wbudowany moduł HTTP, który wyśle do naszego
// klienta przywitanie. Sprawdźmy czy działa aplikacja poprzez uruchomienie przeglądarki
// i wysłanie żądania do naszego serwera. (port 4700)
// 2. Dodajmy do naszej aplikacji z zadania 1 warunek, jeżeli w adresie pojawi się parametr name
// przywitajmy naszego użytkownika po nazwie. (wykorzystajmy wbudowany moduł URL)

const http = require("http");

// Tworzymy nową instancję naszego serwera
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const name = url.searchParams.get("name") || "world";

  // Zamykamy połączenie wysyłając tekst
  res.end("Hello " + name);
});

// uruchamiamy nasz serwer na porcie 4700
server.listen(4700);
