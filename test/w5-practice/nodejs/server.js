"use strict";

const express = require("express");
// const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// 익스프레스 app 객체의 주요 메소드와 속성
// app.set(name, value) -> 서버 설정을 위한 속성을 지정합니다. set() 메소드로 지정한 속성은
// get() 메소드로 꺼내어 확인할 수 있습니다.
// app.set();

// app.get(name) -> 서버 설정을 위해 지정한 속성을 꺼내옵니다.
// app.get();

// app.use("path", function () => { })
app.use("/", function (req, res, next) {
  console.log("First Time");
  //   res.writeHead("200", { "Context-Type": "text/html;charset=utf-8" });
  console.log("HOME");

  next();
});

// const publicDirectory = path.join(__dirname, "./src/public"); // public static data folder
// app.use(express.static(publicDirectory));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/find/fabric", (req, res) => {
  const id = req.query.id;
  const pw = req.query.pw;

  // id: seo pw: 1234
  // http://localhost:3000/find/fabric?id=seo&pw=1234

  console.log(`ID: ${id} PW: ${pw}`, id, pw);
  console.log("ID: %s, PW: %s", id, pw);
});

app.post("/login/user", (req, res) => {
  console.log("/login/user success");

  const id = req.body.id;
  const pw = req.body.pw;

  req.body[0];

  console.log(`ID: ${id} PW: ${pw}`, id, pw);
});

// app.get();
// app.post();
// app.put();
// app.delete();

// app.get("/find/member", (req, res) => {
//   res.console.log(req);
//   res.console.log("RESPONSE");
// });

module.exports = app;
