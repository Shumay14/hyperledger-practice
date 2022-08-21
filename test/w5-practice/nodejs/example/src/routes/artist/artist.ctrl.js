"use strict";

const output = {
    createNft: (req, res) => {
        res.render("artist/createNft");
    },

    deployedNft: (req, res) => {
        res.render("artist/deployedNft");
    },
};

const process = {
    registerArt: async (req, res) => {
        console.log(req.body);
        // console.log(process.env.DATABASE_DB);
        const art = new Art(req.body);
        const response = await art.registerArt();
        var success = { success: true };
        return res.json(success);
    },
};

module.exports = {
    output,
    process,
};
