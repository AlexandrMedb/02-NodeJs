const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { lstatSync } = require("fs");

var a = (step = "") =>
  new Promise(function (resolve, reject) {
    const list = fs
      .readdirSync(path.join(__dirname, step))
      .map((el) => `<li><a href="/${el}">${el}</a></li>`)
      .join("");

    let page = `<!DOCTYPE html><html lang="en"><head><link rel="icon" 
    type="image/png" 
    <meta charset="UTF-8"><title>Hello Node JS</title></head><body><h1>Hello from Node JS</h1><ul>
${list}
</ul><a href="https://www.npmjs.com/package/nodemon">https://www.npmjs.com/package/nodemon</a></body></html>`;
    resolve(page);
  });

let addPath = "";
let currentLink = "";

const server = http.createServer(function (req, res) {
  res.writeHead(200, "OK", {
    "Content-Type": "text/html",
  });
  const url = req.url;
  if (url == "/") {
    addPath = "";
    currentLink = "";
    a().then((resuslt) => res.end(resuslt));
  } else {
    let step = url.split("/");
    if (step[step.length - 1] !== "favicon.ico") {
      if (currentLink !== url) {
        currentLink = url;
        addPath += "/" + step[step.length - 1];
      }
    }
    if (lstatSync(path.join(__dirname, addPath)).isDirectory()) {
      a(addPath).then((resuslt) => res.end(resuslt));
    } else {
      const filePath = path.join(__dirname, addPath);
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    }
  }
});

server.on("listening", function () {
  console.log("ok, server is running");
});

server.listen(80);
