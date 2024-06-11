// routes/main.js
const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Post = require("../models/Post");
const paginatedResults = require("../routes/middleware/pagination");

/**
 * GET home page with pagination.
 */
router.get("/", paginatedResults(Post), (req, res) => {
  res.render("index", {
    locals: res.locals.locals,
    data: res.locals.data,
    currentPage: res.locals.currentPage,
    nextPage: res.locals.nextPage,
  });
});

/**
 * GET Post by :id.
 */
router.get("/posts/:id", async (req, res) => {
  try {
    const locals = {
      title: "Gideon-Blog",
      description: "Blog Project by Gideon Buba",
    };

    const id = req.params.id;
    const data = await Post.findById(id);

    if (!data) {
      return res.status(404).send("Post not found");
    }

    res.render("post", {
      locals,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * GET about page.
 */
router.get("/about", (req, res) => {
  const locals = {
    title: "About - Gideon-Blog",
    description: "Learn more about Gideon Buba and his blog project.",
  };
  res.render("about", { locals });
});

/**
 * POST create a new post.
 */
router.post("/posts", PostController.createPost);

module.exports = router;
