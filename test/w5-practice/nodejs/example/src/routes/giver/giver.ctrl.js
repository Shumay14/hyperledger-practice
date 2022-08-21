"use strict";
const { sys } = require("../../config/db");
const fs = require("fs");

const output = {
    donateNft: (req, res) => {
        res.render("giver/donateNft");
    },

    ownedNft: (req, res) => {
        res.render("giver/ownedNft");
    },
};

const process = {
    getOwnedNft: async (req, res) => {
        try {
            const result = await sys.db("getOwnedNft", req.body.param[0]);
            console.table(result);
            res.send(result);
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },

    getSpecifiedArtList: async (req, res) => {
        console.log("process.getSpecifiedArtList");
        try {
            const result = await sys.db(
                "getSpecifiedArtList",
                req.body.param[0]
            );
            console.table(result);
            res.send(result);
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },

    getArtList: async (req, res) => {
        console.log("process.getArtInfo");
        try {
            const result = await sys.db("getArtList");
            console.table(result);
            res.send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err,
            });
        }
    },

    getArt: async (req, res) => {
        try {
            const result = await sys.db("getArt", req.body.param[0]);
            console.table(result);
            res.send(result);
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },

    getImage: (req, res) => {
        const { type, path } = req.params;
        const filePath = `uploads/${type}/${path}`;

        console.log(filePath);

        if (!fs.existsSync(filePath))
            res.send(404, {
                error: "Can not found file.",
            });
        else {
            res.header("Content-Type", "image/jpg");
            fs.createReadStream(filePath).pipe(res);
        }
    },

    getSpecifiedArtList: async (req, res) => {
        console.log("process.getSpecifiedArtList");
        try {
            const result = await sys.db(
                "getSpecifiedArtList",
                req.body.param[0]
            );
            console.table(result);
            res.send(result);
        } catch (err) {
            res.status(500).send({
                error: err,
            });
        }
    },
};

module.exports = {
    output,
    process,
};
