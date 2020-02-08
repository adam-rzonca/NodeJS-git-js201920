const express = require("express");
const router = express.Router();

const posts = [{ userId: 0, title: "Ala ma kota", body: "a kot ma Alę" }];

router.get("/add", (req, res) => {
  const { userId, title, body } = req.query;
  const post = { userId: userId, title: title, body: body };

  posts.push(post);

  res.send(post);
});

router.get("/list/:id?", (req, res) => {
  const { id } = req.params;
  res.send(id ? posts[id] : posts);
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  posts[id] = null;

  res.send("Post deleted");
});

module.exports = router;
