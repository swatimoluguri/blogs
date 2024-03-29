const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const blogRoutes=require('./routes/blogRoutes');

const app = express();
app.set("view engine", "ejs");

const dbURI =
  "mongodb+srv://gmswatibhardwaj:test123@blogs.jlmblss.mongodb.net/";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//middleware
// app.use((req, res, next) => {
//   console.log("New Request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

//to privide access to the browser for static files
app.use(express.static("public"));

//middleware for accepting form data
app.use(express.urlencoded({ extended: true }));

//logging 3rd party middleware
app.use(morgan("dev"));

//mongoose and mongodb sandbox routes
app.get("/", (req, res) => {
  Blog.find().sort({createdAt:-1})
    .then((result) => {
      res.render("blogs/index", { title: "Home", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.status(404).render("error",{ title: "Not found" });
});
