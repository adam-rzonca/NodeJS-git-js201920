// 10. Stwórzmy aplikację która pobierze informacje o użytkowniku oraz jego pierwszym
// na liście albumie i przypisanych do niego zdjęciach.

// Z pobranego użytkownika wyświetlmy na ekranie nazwę użytkownika.
// Z listy albumów użytkownika wyświetlmy ilość wszystkich albumów oraz nazwę pierwszego z nich.
// Z pobranych zdjęć pierwszego albumu wyświetlmy wszystkie tytuły.

// Lista adresów do API
// endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/1
// endpoint do albumów: https://jsonplaceholder.typicode.com/albums?userId=1
// endpoint do zdjęć: https://jsonplaceholder.typicode.com/photos?albumId=1
// Pamiętajmy również o tym aby obsłużyć błędy zapytania łapiąc występujący wyjątek (.catch())

// 11. Dodajmy do zadania 10 zapis do pliku listy pobranych zdjęć.
// Plik powinniśmy nazwać zgodnie z nazwą albumu.
// Jeżeli nazwa albumu przekracza 10 znaków powinniśmy skrócić nazwę naszego pliku.

const yargs = require("yargs").argv;
const axios = require("axios");
const fs = require("fs");
const util = require("util");

const userId = yargs.id;
const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`;

var user, albums, firstAlbum, photos;

const promisifiedWriteFile = util.promisify(fs.writeFile);

axios
  .get(userURL)
  .then(userResponse => {
    user = userResponse.data;
    //console.log(user);
    console.log("User:", user.name);

    const albumsUrl = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
    return axios.get(albumsUrl);
  })
  .then(albumsResponse => {
    albums = albumsResponse.data;
    //console.log(albums);
    console.log("Number of user albums:", albums.length);

    firstAlbum = albums[0];
    console.log("User first album:", firstAlbum.title);

    const photosUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${firstAlbum.id}`;
    return axios.get(photosUrl);
  })
  .then(photosResponse => {
    photos = photosResponse.data;
    //console.log(photos);
    console.log("Album photo list:");
    photos.forEach(photo => {
      console.log(photo.id, photo.title);
    });

    const fileName = firstAlbum.title.substring(0, 10) + ".json";
    return promisifiedWriteFile(fileName, JSON.stringify(photos));
  })
  .then(() => {
    console.log("File saved!");
  })
  .catch(error => {
    console.log(error);
  });

// Pytanie - jeśli w momencie przetwarzania photosResponse potrzebujemy
// np. danych z obiektu user lub firstAlbum
// to te zmienne powinny być zdefiniowane w global scope, czy powinny być jakoś przekazywane do
// kolejnych .then?
