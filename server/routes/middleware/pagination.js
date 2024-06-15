/**
 * Middleware function that paginates the results of the given model parameter.
 *
 * @param {Model} model
 * @return {Function}
 */
const paginatedResults = (model) => {
  return async (req, res, next) => {
    try {
      const locals = {
        title: "Gideon-Blog",
        description: "Blog Project by Gideon Buba",
      };

      const perPage = 10; // Number of posts per page
      const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1

      // Ensure model is a Mongoose model and create a query
      const query = model
        .find()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);
      const data = await query.exec();

      const count = await model.countDocuments();

      const nextPage = page + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);

      res.locals = {
        ...res.locals,
        locals,
        data,
        currentPage: page,
        nextPage: hasNextPage ? nextPage : null,
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = paginatedResults;
