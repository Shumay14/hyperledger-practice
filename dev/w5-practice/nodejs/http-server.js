// node.js 는 모듈을 객체화 시켜서 구동시킴
// import 대신 require 를 사용해서 가져온다.
// const http = require("http");
var http = require("http");
var fs = require("fs");

// const server = http.createServer();
var server = http.createServer();

// request, response 할때 할당된 포트번호로 소통
// well-known port: http의 포트는 80번 https는 443번
// const port = 3000;
var port = 3000;
server.listen(port, function () {
  console.log("Server Started : %d", port);
});

// connection은 이벤트 이름
server.on("connection", function (socket) {
  var addr = socket.address();
  console.log("client is connected");
  console.log("%s, %d", addr.address, addr.port);
});

server.on("request", function (req, res) {
  console.log("client request");
  // console.log(req);
  // console.log(res);

  fs.readFile("test.html", function (err, data) {
    res.writeHead(200, { "Context-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
  // res.writeHead(200, { "Context-Type": "text/html; charset=utf-8" });
  // res.write("<h1>Server Working well</h1>");
  // res.end();
});
