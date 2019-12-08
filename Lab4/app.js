// 1. Stwórzmy pierwszą aplikację z wykorzystaniem Promise.
// Zadaniem jest stworzeniem funkcji zwracającej Promise któym rozwiązaniem ma być wartość hello world.

// console.log("Start");

// const helloPromise = new Promise(resolve => {
//   resolve("Hello World!");
// });

// helloPromise.then(text => console.log(text));

// console.log("End");

// 2. Zmodyfikuj zadanie 1 tak aby rozwiązanie Promise było asynchroniczne.
// Wykorzystajmy do tego celu funkcję setTimeout z 5 sekundowym opóźnieniem.

// console.log("Start");

// const helloPromise = new Promise(resolve => {
//   setTimeout(() => {
//     resolve("Hello World!");
//   }, 5000);
// });

// helloPromise.then(text => console.log(text));

// console.log("End");

// 3. Zadaniem kolejnym jest stworzenie funkcji odejmowania 2 licz z wykorzystaniem Promise.
// Stwórzmy regułę jeżeli wynik działania będzie ujemny Promise powinien zwrócić błąd,
// jeżeli wynik jest dodatni Promise powinien się rozwiązać poprawnie przekazując wynik działania.

// const sub = (a, b) => {
//     ... // <- implementacja Promise
// }

// sub(3, 4)
//     .then(result => {
//         console.log(result)
//     })
//     .catch(error => {
//         console.log(error)
//     });

// const sub = (a, b) => {
//   return new Promise((resolve, reject) => {
//     let result = a - b;
//     if (result >= 0) {
//       resolve(result);
//     } else {
//       reject("error");
//     }
//   });
// };

// sub(3, 4)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// sub(4, 3)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// 4. Wykorzystując wiedzę z poprzednich zajęć użyjmy zewnętrznej biblioteki request
// i pobierzmy użytkownika dane(https://jsonplaceholder.typicode.com/users/2).
// Przeróbmy tak wywołanie naszego zapytania aby wykorzystywało Promise.

// const getUser = (id) => {
//     ... // <- implementacja Promise
// }

// getUser(2)
//     .then(...)
//     .catch(...);

// const request = require("request");

// const getUser = id => {
//   const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`;

//   return new Promise((resolve, reject) => {
//     request(userUrl, (error, response, body) => {
//       if (error) {
//         reject(error);
//         return;
//       }

//       if (response.statusCode != 200) {
//         reject("User not found");
//         return;
//       }

//       const userInfo = JSON.parse(body);

//       const user = {
//         name: userInfo.name,
//         lat: userInfo.address.geo.lat,
//         lng: userInfo.address.geo.lng
//       };

//       resolve(user);
//     });
//   });
// };

// let id = 2;
// getUser(id)
//   .then(user => console.log(user))
//   .catch(error => console.log(error));

// 5. Dodajmy do naszej aplikacji z zadania 4 pobieranie pogody dla naszego użytkownika.
// Podobnie jak w poprzednim laboratorium.
// Pamiętajmy o odpowiednim owrapowaniu naszego zapytania do pogody.
// Analogicznie jak w zadaniu 4.

// Endpoint do pogody: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={lat}&lon={lng}

// Zarys wywołania aplikacji:

// ...
// const getWeather = (lat, lng) => ...

// getUser(2)
//     .then(user => {
//         ...
//         return getWeather(...)
//     })
//     .then(weather => ...)
//     .catch(...);

// const request = require("request");

// const getUser = id => {
//   const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`;

//   return new Promise((resolve, reject) => {
//     request(userUrl, (error, response, body) => {
//       if (error) {
//         reject(error);
//         return;
//       }

//       if (response.statusCode != 200) {
//         reject("User not found");
//         return;
//       }

//       const userInfo = JSON.parse(body);

//       const user = {
//         name: userInfo.name,
//         lat: userInfo.address.geo.lat,
//         lng: userInfo.address.geo.lng
//       };

//       resolve(user);
//     });
//   });
// };

// const getWeather = (lat, lng) => {
//   const wetaherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;

//   return new Promise((resolve, reject) => {
//     request(wetaherUrl, (error, response, body) => {
//       if (error) {
//         reject(error);
//         return;
//       }

//       if (response.statusCode != 200) {
//         reject("Weather data not found... Status code:" + response.statusCode);
//         return;
//       }

//       const weather = JSON.parse(body);
//       resolve(weather);
//     });
//   });
// };

// let id = 2;
// getUser(id)
//   .then(user => {
//     console.log(user.name);
//     return getWeather(user.lat, user.lng);
//   })
//   .then(weather => console.log(weather.main.temp))
//   .catch(error => console.log(error));

// 6. Zmodyfikujmy zadanie 5 tak, aby pobrać kilku użytkowników w tej samej chwili wykorzystując
// Promise.all(). Wyświetlmy ich imiona w konsoli. (id użytkowników: 2,5,7).
// Poinformujmy iż nasz Promise został w pełni rozwiązany.

const request = require("request");

const getUser = id => {
  const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`;

  return new Promise((resolve, reject) => {
    request(userUrl, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode != 200) {
        reject("User not found");
        return;
      }

      const userInfo = JSON.parse(body);

      const user = {
        name: userInfo.name,
        lat: userInfo.address.geo.lat,
        lng: userInfo.address.geo.lng
      };

      resolve(user);
    });
  });
};

const ids = [2, 5, 7];

const usersPromise = ids.map(id => getUser(id));

Promise.all(usersPromise)
  .then(users => {
    users.forEach(user => console.log(user.name));
  })
  .catch(error => console.log(error))
  .finally(() => {
    console.log("Koniec przetwarzania!");
  });
