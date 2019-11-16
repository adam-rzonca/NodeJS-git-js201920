// 1. Zadaniem jest stworzenie aplikacji składającej się z 2 plików app.js oraz plików z utils.js
// w którym to zostanie zaimplementowana funkcja usuwania zduplikowanych elementów w tablicy.

// const utils = require("./utils");

// let someArray = ["ala", 3, "ma", "kota", 2, "ala", 5, 3];

// let funcResult = utils.uniq(someArray);

// console.log(funcResult);

// 2. Dodajmy nową funkcjonalność do naszej aplikacji z zadania 1.
// Stwórzmy funkcję która zwróci różnicę między 2 tablicami.

// const utils = require("./utils");

// let tabA = ["ala", "ma", "kota"];
// let tabB = ["ala", "ma", "psa"];

// console.log(utils.diff(tabA, tabB));
// console.log(utils.diff(tabB, tabA));

// 3. Zmodyfikujmy 1 zadanie tak aby funkcja odpowiedzialna za usuwanie zduplikowanych wartości pochodziła
//    nie z modułu lokalnego a z repozytorium npm (nazwa modułu lodash).
//    Podmieńmy również funkcję do porównywania tablic na funkcję z modułu lodash.
// const ld = require("lodash");

// let someArray = ["ala", 3, "ma", "kota", 2, "ala", 5, 3];

// let funcResult = ld.uniq(someArray);

// console.log(someArray);
// console.log(funcResult);

// 4. Wykorzystując bibliotekę lodash znaleźć minimalną oraz maksymalną wartość w tablicy:
// const ld = require("lodash");

// let items = [3, 5, -20, -1002, 234, 542, 6, 23, -3, 8];

// console.log(ld.min(items));
// console.log(ld.max(items));

// 5. Zainstalować globalny moduł 'nodemon'(https://www.npmjs.com/package/nodemon),
// aby możliwe było automatyczne restartowanie w przypadku wykrycia zmian napisanych przez nas aplikacji.
// npm install -global nodemon

// 6. Wykorzystując zdobytą wiedzę z poprzednich zajęć skorzystaj z zewnętrznej biblioteki yargs (moduł odpowiedzialny parsowanie parametrów wejściowych). Stwórz prosty kalkulator wprowadzonych danych.
// > node app.js --a=5 --b=7 --operator=*
// Konsola powinna zwrócić wynik operacji
// wynik: 35

// const argv = require("yargs").argv;

// let a, b, operation, result;

// a = argv.a;
// b = argv.b;
// operation = argv.operation;

// switch (operation) {
//   case "+":
//     result = a + b;
//     break;
//   case "-":
//     result = a - b;
//     break;
//   case "*":
//     result = a * b;
//     break;
//   case "/":
//     result = a / b;
//     break;
// }

// console.log(result);

// 7. Zmodyfikujmy naszą aplikację z zadania 6 tak, aby stworzone funkcje wywoływały funkcję callback podaną jako 3 parametr.
// Wynik powinien być przekazany jako parametr wywołania funkcji callback, przykład:

// 8. Dodajmy do naszej aplikacji z zadania 7 zapis do pliku.
// W tym przypadku użyjmy jednak funkcji asynchronicznej writeFile.
// const argv = require("yargs").argv;
// const fs = require("fs");

// let a, b, operation, result;

// a = argv.a;
// b = argv.b;
// operation = argv.operation;

// switch (operation) {
//   case "+":
//     add(a, b, printResult);
//     break;
//   case "-":
//     sub(a, b, printResult);
//     break;
//   case "*":
//     mult(a, b, printResult);
//     break;
//   case "/":
//     div(a, b, printResult);
//     break;
// }

// function printResult(result) {
//   console.log(result);
//   fs.writeFile("./output.txt", result, saveResult);
// }

// function saveResult(err) {
//   if (err) throw err;
//   console.log("The file has been saved!");
// }

// function add(a, b, myCallback) {
//   let result = a + b;
//   myCallback(result);
// }

// function sub(a, b, myCallback) {
//   let result = a - b;
//   myCallback(result);
// }

// function mult(a, b, myCallback) {
//   let result = a * b;
//   myCallback(result);
// }

// function div(a, b, myCallback) {
//   let result = a / b;
//   myCallback(result);
// }

// 9. Stworzyć aplikację, która wyświetli na ekranie przywitanie użytkownika aktualnie zalogowanego na komputerze
// po 5 sekundach od uruchomienia aplikacji.
// Wykorzystaj tutaj wiedzę z poprzednich zajęć
// (podpowiedź: moduł os, funkcja userInfo()) oraz funkcję setTimeout(),
// która pozwala na wrzucenie naszej funkcji do Node API.

// 10. Zmodyfikujmy zadanie 9 tak aby zapisać nasze przywitanie do pliku wykorzystując funkcję writeFile.

// const os = require("os");
// const fs = require("fs");

// let loggedUser = os.userInfo().username;

// setTimeout(sayHello, 3000, loggedUser);

// function sayHello(user) {
//   let data = "Hello " + user;
//   fs.writeFile("./output.txt", data, function(err) {
//     if (err) throw err;
//     console.log("The file has been saved!");
//   });
// }

// 11. Stwórz aplikację która pobierze dane dotyczące pogody i wyświetl ją na konsoli.
// W tym zadaniu wykorzystamy zewnętrzny moduł request. Pakiet ten udostępnia nam funkcje pozwalające na wysłanie żądania do zewnętrznego serwera i pobranie danych.
// Adres do pobrania danych:
// https://api.openweathermap.org/data/2.5/weather?q=Bia%C5%82ystok&APPID=0ed761300a2725ca778c07831ae64d6e

// 12. Zmodyfikujmy zadanie 11 tak aby miejscowość była podawana przez parametr wejściowy.
// W tym celu dodajmy zewnętrzny moduł yargs.

const request = require("request");
const argv = require("yargs").argv;

let city = argv.city;
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  encodeURI(city) +
  "&APPID=0ed761300a2725ca778c07831ae64d6e";

request(url, function(error, response, body) {
  console.error("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.
  console.log(JSON.stringify(body));
});
