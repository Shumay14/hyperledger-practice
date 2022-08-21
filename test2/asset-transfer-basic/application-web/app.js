"use strict";
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("check");
  console.log("__dirname", __dirname);
  res.sendFile(__dirname + "index.html");
});

app.post("/admin", (req, res) => {
  console.log("/admin post request");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
