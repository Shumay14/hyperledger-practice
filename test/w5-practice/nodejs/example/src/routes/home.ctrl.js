"use strict";
const multer = require('multer');

const Account = require("../models/Account");

const output = {
  home: (req, res) => {
    res.render("index");
  },
  signIn: async (req, res) => {
    const account = new Account(req.body);
    const response2 = await account.getProfileAll();
    console.log("homectrl response2", response2);
    const img_path = response2.user[0].profile_image_path;
    console.log("homectrl img_path", img_path);

    const img_path2 = img_path.replace(/\\/gi, "/");
    console.log("homectrl img_path2", img_path2);
    res.render("signIn", {HH: img_path2});
  },
  signUp: (req, res) => {
    res.render("signUp");
  },
};

const process = {
  signIn: async (req, res) => {
    const account = new Account(req.body);
    const response = await account.signIn();

    return res.json(response);
  },

  signUp: async (req, res) => {
    req.body.profile_image_path = req.file.path;

    const account = new Account(req.body);
    const response = await account.signUp();

    return res.json(response);
  },

}

module.exports = {
  output,
  process,
};
