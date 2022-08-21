"use strict";

// set module
const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();

// set routes
const home = require("./src/routes");

// app setting ===
app.set("views", "./src/views");
// handlebars for template as html
app.set("view engine", "ejs");

const publicDirectory = path.join(__dirname, "./src/public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Use token as middleware
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Define Routes or Controller = middle ware
app.use("/", home);

module.exports = app;
