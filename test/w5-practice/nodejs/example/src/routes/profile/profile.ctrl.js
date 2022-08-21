"use strict";
const jwt = require("jsonwebtoken");
const auth = require("../../config/auth.js");

const verify = {
    verifyToken: (req, res, next) => {
        console.log(req);
        // console.log(req.header());
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({
                message: "No token provided!",
            });
        }

        jwt.verify(token, auth.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.body.account_id = decoded.account_id;
            next();
        });
    },
};

const output = {
    editProfile: (req, res) => {
        res.render("profile/editProfile");
    },

    myAccountArtist: (req, res) => {
        res.render("profile/myAccountArtist");
    },

    myAccountGiver: (req, res) => {
        res.render("profile/myAccountGiver");
    },
    profile: (req, res) => {
        res.render("profile/profile");
    },
};

module.exports = {
    output,
    verify,
};
