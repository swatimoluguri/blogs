const http = require("http");
const fs = require("fs");
const _=require("lodash");

const server = http.createServer((req, res) => {
  console.log(_.random(0,20));
  //*******dynamic path to html files based on URL *******/
  path = "./viewsOld/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
  //*******redirection *******/
    case "/about-me":
      res.statusCode = 301;
      res.setHeader('Location','/about');
      res.end();
      break;
    default:
      path += "error.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //*******to write data line by line *******/
      //   res.write(data);
      //   res.end();

      //*******to write entire data at a time *******/
      res.end(data);
    }
  });
  //*******to write html manually *******/
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<p>Hello World</p>");
  //   res.write("<p>I am Chitti!!</p>");
  //   res.end();
});
server.listen(3000, "localhost", () => {
  console.log("listening on 3000");
});
