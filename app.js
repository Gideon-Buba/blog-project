require("dotenv").config();
const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const PORT = 3000 || process.env.PORT;

app.use(express.static("public"));

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
