const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Post = require("../models/Post");
const paginatedResults = require("../routes/middleware/pagination");
const { body, validationResult } = require("express-validator");

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
    const slug = req.params.id;

    const data = await Post.findById(slug);
    if (!data) {
      return res.status(404).render("404", {
        locals: {
          title: "Post Not Found",
          description: "The post you are looking for does not exist.",
        },
      });
    }

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
    console.error(error);
    res.status(500).render("500", {
      locals: {
        title: "Internal Server Error",
        description: "Something went wrong on our end. Please try again later.",
      },
    });
  }
});

/**
 * POST searchTerm
 */
router.post(
  "/search",
  [
    body("searchTerm")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Search term cannot be empty."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("search", {
        locals: {
          title: "Search",
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
        },
        data: [],
        currentRoute: "/search",
        errors: errors.array(),
      });
    }

    try {
      const locals = {
        title: "Search",
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      };

      const searchTerm = req.body.searchTerm;
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
        currentRoute: "/search",
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("500", {
        locals: {
          title: "Internal Server Error",
          description:
            "Something went wrong on our end. Please try again later.",
        },
      });
    }
  }
);

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
