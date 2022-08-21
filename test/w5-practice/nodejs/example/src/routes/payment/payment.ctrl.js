"use strict";

const output = {
    paymentArtist: (req, res) => {
        res.render("payment/paymentArtist");
    },

    paymentGiver: (req, res) => {
        res.render("payment/paymentGiver");
    },

    paymentPlatform: (req, res) => {
        res.render("payment/paymentPlatform");
    },
};

module.exports = {
    output,
};
