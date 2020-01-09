// 1. W katalogu 01 znajduje się plik user.json. Wykorzystując wiedzę z poprzednich zajęć,
// stwórzmy aplikację wczytującą naszego użytkownika z pliku i zamieńmy go na obiekt JS
// oraz wyświetlmy w konsoli jego imię.

// Użyjmy w tym zadaniu funkcję readFileSync z wbudowanego modułu fs
// oraz funkcję JSON.parse do przeparsowania wczytanej zawartości do obiektu.

// Zabezpieczmy naszą aplikację tak aby wyłapać błąd prasowania lub odczytu pliku
// i poinformujmy o tym użytkownika.
// const fs = require("fs");
// let user;

// try {
//   user = JSON.parse(fs.readFileSync("./user.json", "UTF-8"));

//   console.log(user.name);
// } catch (error) {
//   console.log(error.message);
// }

// 2. Stwórzmy aplikację która będzie posiadała funkcję dzielenia 2 liczb.
// Jak wiadomo JS jest ciekawym językiem, który pozwala dzielić przez 0...
// efektem dzielenia przez zero jest wartość Infinity, np.:

// const result = 2 / 0;
// console.log(result); // => Infinity
// Zabezpieczmy naszą aplikację tak aby funkcja dzielenia rzucała wyjątkiem w przypadtku
// gdy drugi parametr ma wartość 0 (np. new Error('divide by 0')).

// Oczywiście stwórzmy przykładowe wywołanie naszej funkcji z blokiem try..catch.

// try {
//   console.log(div(5, 0));
// } catch (error) {
//   console.log("Error:", error.message);
// }

// function div(a, b) {
//   if (b == 0) {
//     throw new Error("Divide by 0!");
//   }

//   return a / b;
// }

// 3. Wykorzystując składnię async stwórzmy funkcję zwracającą nasz pierwszy Promise
// i wyświetlmy na ekranie hello world!.
// // my func ... etc...

// myFunc()
//     .then(result => {
//         console.log(result);
//     });

// const myFunc = async () => {
//   return "Hello world!";
// };

// myFunc().then(result => {
//   console.log(result);
// });

// 4. Stwórzmy aplikację która będzie posiadała funkcję asynchroniczną dodawnia 2 liczb
// do siebie (async). Jeżeli wynik będzie liczbą parzystą powinniśmy wyrzucić błąd
// i poinformować użytkownika o tym fakcie.
// // my func ... etc...

// add(4, 5)
//     .then( ... )
//     .catch( ... );

// const add = async (a, b) => {
//   const result = a + b;

//   if (!(result % 2)) {
//     throw new Error("Wynik jest parzysty!");
//   }

//   return result;
// };

// add(4, 5)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// 5. Zmodyfikujmy nasze zadanie 4 tak aby zamiast .then..catch użyć await.

// const add = async (a, b) => {
//   const result = a + b;

//   if (!(result % 2)) {
//     throw new Error("Wynik jest parzysty!");
//   }

//   return result;
// };

// (async () => {
//   try {
//     const result = await add(4, 4);
//     console.log(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// })();

// 6. Wykorzystując wiedzę z poprzednich zajęć użyjmy zewnętrznej biblioteki axios
// i pobierzmy użytkownika dane wykorzystując składnię async/await.

// Endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/2

// 7. Dodajmy do naszego zadania 6 obsługę błędów try..catch.

// const axios = require("axios");

// async function getUser(id) {
//   const url = `https://jsonplaceholder.typicode.com/users/${id}`;

//   const result = await axios.get(url);

//   return result.data;
// }

// const getData = async () => {
//   const id = "2";

//   try {
//     const user = await getUser(id);
//     console.log(user);
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };

// getData();

// 8. Wykorzystując składnię async/await zmodyfikujmy zadanie 6 tak
// aby pobrać kilku użytkowników w tej samej chwili wykorzystując Promise.all().
// Wyświetlmy ich imiona w konsoli. (id użytkowników: 2, 3, 5, 7).

// const axios = require("axios");

// async function getUser(id) {
//   const url = `https://jsonplaceholder.typicode.com/users/${id}`;

//   const result = await axios.get(url);

//   return result.data;
// }

// const getData = async () => {
//   const idTable = [2, 3, 5, 7];

//   try {
//     Promise.all(
//       idTable.map(async id => {
//         const user = await getUser(id);
//         console.log(user.name);
//       })
//     );
//     // const user = await getUser(id);
//     // console.log(user.name);
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };

// getData();

// 9. Dodajmy do naszej aplikacji z zadania 7 pobieranie pogody dla naszego użytkownika
// (z odpowiedzi weźmy main.temp i wyświetlmy na ekranie).
// Zadanie analogiczne jak w poprzednim laboratorium z wykorzystaniem składni async/await.

// Endpoint do pogody:
// https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={lat}&lon={lng}

const axios = require("axios");

const getUser = async id => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  const result = await axios.get(url);

  return result.data;
};

const getWeather = async (lat, lng) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;

  const result = await axios.get(url);

  return result.data;
};

const getData = async () => {
  const id = "2";

  try {
    const user = await getUser(id);
    console.log("User:", user);

    const weather = await getWeather(
      user.address.geo.lat,
      user.address.geo.lng
    );
    console.log("Weather:", weather);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

getData();
