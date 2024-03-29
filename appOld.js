const express = require("express");
//express app
const app = express();
//register view engine
//listen for requests
app.listen(3000);
app.get("/", (req, res) => {
  //   res.send("<p>Home Page</p>");
  res.sendFile("./viewsOld/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  // res.send("<p>About Page</p>");
  res.sendFile("./viewsOld/about.html", { root: __dirname });
});
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});
//will be called for each route, if we get a URL match previously, it will be displayed, else below file will be displayed. SHould be written in the end.
app.use((req, res) => {
  res.sendFile("./viewsOld/error.html", { root: __dirname });
});
