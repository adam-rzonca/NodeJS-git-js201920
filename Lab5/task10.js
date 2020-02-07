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

const getUser = async UserId => {
  const url = `https://jsonplaceholder.typicode.com/users/${UserId}`;

  const result = await axios.get(url);

  return result.data;
};

const getUserPosts = async UserId => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${UserId}`;

  const result = await axios.get(url);

  return result.data;
};

const getPostComments = async PostId => {
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${PostId}`;

  const result = await axios.get(url);

  return result.data;
};

const getUserData = async UserId => {
  try {
    const user = await getUser(UserId);
    console.log("User:", user.name);

    const posts = await getUserPosts(user.id);
    console.log("User posts number:", posts.length);

    // Tablica tablic komentarzy do postów
    const postsCommentsArray = await Promise.all(
      posts.map(post => {
        return getPostComments(post.id);
      })
    );

    // W uproszczeniu: flat zrobi jednowymairową tablicę z tablicy dwuwymiarowej
    const commentsCount = postsCommentsArray.flat().length;
    console.log("User posts comments number:", commentsCount);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const Userid = args.id;
getUserData(Userid);
