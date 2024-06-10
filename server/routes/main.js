const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Post = require("../models/Post");

/**
 * GET home page with pagination.
 */
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Gideon-Blog",
      description: "Blog Project by Gideon Buba",
    };

    const perPage = 10; // Number of posts per page
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1

    // Aggregation pipeline to sort posts by createdAt in descending order
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * (page - 1)) // Skip the documents for previous pages
      .limit(perPage); // Limit the result to the perPage value

    // Get the total count of posts
    const count = await Post.countDocuments();

    const nextPage = page + 1; // Calculate the next page number
    const hasNextPage = nextPage <= Math.ceil(count / perPage); // Determine if there is a next page

    res.render("index", {
      locals,
      data,
      currentPage: page,
      nextPage: hasNextPage ? nextPage : null, // Pass the next page number if it exists
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
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
