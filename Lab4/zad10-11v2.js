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
const axios = require("axios");
const { writeFile } = require("fs").promises;

const getUser = id => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return axios.get(url).then(response => response.data);
};

const getAlbums = id => {
  const url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;
  return axios.get(url).then(response => response.data);
};

const getPhotos = id => {
  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
  return axios.get(url).then(response => response.data);
};

const saveFile = (filename, data) => {
  return writeFile(filename, JSON.stringify(data)).then(() => "file saved");
};

let filename;

getUser(2)
  .then(user => {
    console.log(user.name);
    return getAlbums(user.id);
  })
  .then(albums => {
    const [album] = albums;

    filename = album.title.substr(0, 10);

    console.log(album.title);
    return getPhotos(album.id);
  })
  .then(photos => {
    photos.forEach(photo => console.log(photo.title));
    return saveFile(`${filename}.json`, photos);
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
