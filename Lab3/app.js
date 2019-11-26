// 1. Stwórzmy aplikację która pozwoli na zapisanie całego obiektu do pliku.
// W tym celu powinniśmy wykorzystać wbudowany moduł fs
// oraz funkcję pozwalającą na przekonwertowanie obiektu na postać tekstową(JSON.stringify).

// const fs = require("fs");

// const user = {
//   name: "Jan",
//   lastName: "Nowak"
// };

// fs.writeFile("./user.json", JSON.stringify(user), error => {
//   if (error) throw error;
//   console.log("The file has been saved!");
// });

// 2. Rozszerzmy aplikację z zadania 1 o wprowadzanie dynamiczne danych które chcemy zapisać do pliku.
// W zadaniu tym może być pomocny zewnętrzny moduł yargs.
// Przykład uruchomienia aplikacji
// node app.js --name=Adam --lastName=Mickiewicz
// Wprowadzane dane powinny być zapisane do pliku.
// const fs = require("fs");
// const argv = require("yargs").argv;

// let firstName = argv.name;
// let lastName = argv.lastName;

// const user = {
//   name: firstName,
//   lastName: lastName
// };

// fs.writeFile("./user.json", JSON.stringify(user), error => {
//   if (error) throw error;
//   console.log("The file has been saved!");
// });

// 3. Dodajmy do naszej aplikacji z zadania 2 przed nadpisaniem nowymi wartościami,
// wczytanie już wcześniej zapisanego obiektu. W konsoli wypiszmy jedynie imię wczytanego użytkownika.
// const fs = require("fs");
// const argv = require("yargs").argv;

// const fileName = "./user.json";

// fs.readFile(fileName, (error, dataFromFile) => {
//   if (error) throw error;

//   console.log(JSON.parse(dataFromFile).name);

//   let newFirstName = argv.name;
//   let newLastName = argv.lastName;

//   const user = {
//     name: newFirstName,
//     lastName: newLastName
//   };

//   fs.writeFile(fileName, JSON.stringify(user), error => {
//     if (error) throw error;
//     console.log("The file has been saved!");
//   });
// });

// 4. Stwórz aplikację która pobierze informację o użytkowniku podając jego id z API
// i wyświetli w konsoli współrzędne geograficzne skąd dany użytkownik pochodzi oraz jego imię.
// Adres URL do API: "https://jsonplaceholder.typicode.com/users/{ID}"
// gdzie ID to identyfikator użytkownika.

// Endpoint z przykładowym ID: https://jsonplaceholder.typicode.com/users/2
// Wynik w konsoli

// Ervin Howell
// lat -43.9509
// lng -34.4618

// 5 Rozszerzmy zadanie 4 tak aby nasza aplikacja poinformowała użytkownika
// o błędzie pobierania danych lub braku szukanego użytkownika w bazie.

// 6. Dodajmy do zadania 5 możliwość dynamicznego wprowadzania ID poprzez użycie zewnętrznej
// biblioteki yargs. Przykład uruchomienia aplikacji:
// node app.js --id=2

// 7. Wykorzystując zadanie 6 dodajmy opcję pobrania pogody dla wczytanego użytkownika.
// Pamiętajmy o odpowiednim zabezpieczeniu naszej aplikacji w przypadku błędu API
// (podobnie jak w z zadaniu 5).
// Adres do pobrania danych:
// https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={LAT}&lon={LNG}
// gdzie `{LAT}` i `{LNG}` to współrzędne geograficzne pobrane od naszego użytkownika

// const request = require("request");
// const argv = require("yargs").argv;

// const id = argv.id;

// const userUrl = "https://jsonplaceholder.typicode.com/users/" + id;

// request(userUrl, (error, response, body) => {
//   if (error) {
//     console.log("Connection error...");
//     return;
//   }

//   if (response.statusCode != 200) {
//     console.log("User not found... Status code:", response.statusCode);
//     return;
//   }

//   const userInfo = JSON.parse(body);
//   const userInfoName = userInfo.name;
//   const userGeoLat = userInfo.address.geo.lat;
//   const userGeoLng = userInfo.address.geo.lng;

//   console.log(userInfoName);
//   console.log("Lat:", userGeoLat);
//   console.log("Lng", userGeoLng);

//   const wetaherUrl =
//     "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=" +
//     userGeoLat +
//     "&lon=" +
//     userGeoLng;

//   request(wetaherUrl, (error, response, body) => {
//     if (error) {
//       console.log("Weather Serevr connection error...");
//       return;
//     }

//     if (response.statusCode != 200) {
//       console.log(
//         "Weather data not found... Status code:",
//         response.statusCode
//       );
//       return;
//     }

//     const weatherInfo = JSON.parse(body);

//     console.log(weatherInfo);
//   });
// });

// 8. Podzielmy naszą aplikację z punktu 8 na moduły odpowiednio:
// app.js – plik główny który uruchomi naszą aplikację i wywoła funkcje z naszego modułu user.js
// user.js – plik z pobieraniem danych użytkownika
// weather.js – plik z pobieraniem danych o prognozie pogody

// 9. Dodajmy do zadania 8 zapis do pliku obiektu składającego się z nazwy użytkownika
// oraz pobranej temperatury.
const user = require("./user.js");
const argv = require("yargs").argv;

const id = argv.id;

user.getUserInfo(id);
