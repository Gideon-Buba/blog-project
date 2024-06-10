const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Post = require("../models/Post");

/**
 * * GET home page.
 */
router.get("", async (req, res) => {
  const locals = {
    title: "Gideon-Blog",
    description: "Blog Project by Gideon Buba",
  };

  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * * GET about page.
 */
router.get("/about", (req, res) => {
  res.render("about");
});

router.post("/posts", PostController.createPost);

module.exports = router;
