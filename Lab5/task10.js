// 10. Stwórzmy aplikację która pobierze informację o użytkowniku i statystykach jego postów i komentarzy.
// Z pobranego użytkownika wyświetlmy na ekranie nazwę użytkownika oraz email.
// Pobierzmy wszystkie posty użytkownika i wyświetlmy ich ilość w konsoli.
// Dodatkowo sprawdźmy aktywność szukanego użytkownika w komentarzach
// i wyświetlmy łączną ilość komentarzy w konsoli.

// Endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/2

// Endpoint do postów: https://jsonplaceholder.typicode.com/posts?userId=2

// Endpoint do komentarzy: https://jsonplaceholder.typicode.com/comments?postId=11

const args = require("yargs").argv;
const axios = require("axios");

const getUser = async id => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  const result = await axios.get(url);

  return result.data;
};

const getUserPosts = async id => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

  const result = await axios.get(url);

  return result.data;
};

const getUserComments = async id => {
  // ???
};

const getUserData = async id => {
  try {
    const user = await getUser(id);
    console.log("User:", user.name);

    const posts = await getUserPosts(user.id);
    console.log("User posts number:", posts.length);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const id = args.id;
getUserData(id);
