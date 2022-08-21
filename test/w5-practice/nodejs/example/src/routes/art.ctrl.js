"use strict";
const multer = require('multer');

const Art = require("../models/Art");

const output = {
  showArt: (req, res) => {
    res.render("showArt");
  },
  registerArt: (req, res) => {
    res.render("registerArt");
  },
};

const process = {
  registerArt: async (req, res) => {
    req.body.art_image_path = req.file.path;
    const art = new Art(req.body);
    const response = await art.registerArt();

    const url = {
      method: "POST",
      path: "/registerArt",
      
    };

    return res.json(response);
  },

}

module.exports = {
  output,
  process,
};
