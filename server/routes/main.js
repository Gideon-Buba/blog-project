const express = require("express");
const router = express.Router();
const PostController = require('../controllers/post')

router.get("", (req, res) => {
  const locals = {
    title: "Gideon-Blog",
    description: "Blog Project by Gideon Buba",
  };

  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.post('/posts', PostController.createPost)

module.exports = router;
