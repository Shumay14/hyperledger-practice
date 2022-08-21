const jwt = require("jsonwebtoken");
const auth = require("../config/auth.js");

const verify = {
    verifyToken: (req, res, next) => {
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({
            message: "No token provided!"
            });
        }

        jwt.verify(token, auth.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.body.account_id = decoded.account_id;
            next();
        });
    },
};

module.exports = verify;