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
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST
 * Post - searchTerm
 */

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
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
