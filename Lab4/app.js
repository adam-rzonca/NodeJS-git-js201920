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

// const ids = [2, 5, 7];

// const usersPromise = ids.map(id => getUser(id));

// Promise.all(usersPromise)
//   .then(users => {
//     users.forEach(user => console.log(user.name));
//   })
//   .catch(error => console.log(error))
//   .finally(() => {
//     console.log("Koniec przetwarzania!");
//   });

// 7. Dodajmy do zadania 5 zapis całego obiektu pogody do pliku wykorzystując wbudowany moduł fs
// i funkcję writeFile. Oczywiście zadanie polega na odpowiednim dostosowaniu funkcji
// aby obsługiwała Promise.

// const request = require("request");
// const fs = require("fs");

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

// const myWriteFile = (weather, fileName) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(fileName, JSON.stringify(weather), err => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve("File saved!");
//       }
//     });
//   });
// };

// let id = 2;
// getUser(id)
//   .then(user => {
//     console.log(user.name);
//     return getWeather(user.lat, user.lng);
//   })
//   .then(weather => {
//     console.log(weather.main.temp);
//     return myWriteFile(weather, "./weather.json");
//   })
//   .then(text => {
//     console.log(text);
//   })
//   .catch(error => console.log(error));

// 8. Jak wiadomo świat JS jest bardzo rozbudowany i nie trzeba za każdym razem tworzyć
// od nowa konstrukcji asynchronicznych żądań do serwera.
// Są od tego biblioteki😊
// Na stronie https://npmjs.org
// możemy znaleźć dużo różnych implementacji bibliotek które udostępniają już gotowe obiekty
// przystosowane do Promise, np.:

// axios (https://www.npmjs.com/package/axios)
// request-promise (https://www.npmjs.com/package/request-promise)

// Zadaniem jest wykorzystanie biblioteki axios.
// Z zadania 7 podmieńmy request wraz z naszymi Promise na użycie biblioteki axios.

// 9. Zamieńmy również z zadania 8 opakowanie funkcji writeFile która została zaimplementowana
// na wbudowany mechanizm w NodeJS zamieniający naszą funkcję zwrotną na Promise.
// W tym celu powinniśmy wykorzystać wbudowany moduł util i funkcję util.promisify(link do opisu)

const fs = require("fs");
const util = require("util");
const axios = require("axios");

const id = "2";
const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
const fileName = "./weather.json";

const primisifiedWriteFile = util.promisify(fs.writeFile);

axios
  .get(userUrl)
  .then(userResponse => {
    const lat = userResponse.data.address.geo.lat;
    const lng = userResponse.data.address.geo.lng;
    console.log(userResponse.data.address.geo);
    console.log(lat, lng);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    return axios.get(weatherUrl);
  })
  .then(weatherResponse => {
    console.log(weatherResponse.data);
    return primisifiedWriteFile(fileName, JSON.stringify(weatherResponse.data));
  })
  .then(() => {
    console.log("File saved");
  })
  .catch(error => {
    console.log(error);
  });

// Pytania:
// 1. Jeśli wystąpił error, to jak można okreslić, z którego .then pochodził?
// 2. Z prezentacji łańcuch .then bez return: jak to działa?
