require("dotenv").config();

const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //set header
  res.setHeader("Content-Type", "text/html");

  //routes
  let path = "./html/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;
    default:
      path += "NotFound.html";
      res.statusCode = 404;
      break;
  }

  //res write
  //   res.write("<p>Hello I am from the server</p>");
  //   res.write("<h4>Hello I am from the server with header 4 tag</h4>");
  //   //res end
  //   res.end();
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //first way
      //   res.write(data);
      //   res.end();

      // second way
      res.end(data);
    }
  });
});

//local host port 127.0.0.1
const PORT = process.env.PORT || 8000;
server.listen(`${PORT}`, "localhost", () => {
  console.log(`Listening for request on port -----${PORT}`);
});
