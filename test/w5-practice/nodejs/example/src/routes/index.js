"use stirct";

const express = require("express");
const router = express.Router();
const multer = require("multer");


const uploadProfile = multer({
    dest: "uploads/profile",
    //limits: { fileSize: 5 * 256 * 256 }
});

const uploadArt = multer({
    dest: "uploads/art",
    //limits: { fileSize: 5 * 1024 * 1024 }
});

const home_ctrl = require("./home.ctrl");
const art_ctrl = require("./art.ctrl");
const auth_ctrl = require("./auth.ctrl")


// APIs
// HOME
router.get("/", home_ctrl.output.home);

// ACCOUNT
router.get("/signIn", home_ctrl.output.signIn);
router.get("/signUp", home_ctrl.output.signUp);

router.post("/signIn", home_ctrl.process.signIn);
router.post("/signUp", [uploadProfile.single('profile_image')], home_ctrl.process.signUp);

// ART
router.get("/showArt", art_ctrl.output.showArt);
router.get("/registerArt", art_ctrl.output.registerArt);

router.post("/showArt", art_ctrl.process.registerArt);
router.post("/registerArt", [auth_ctrl.verifyToken, uploadArt.single('art_image')], art_ctrl.process.registerArt);

// PAYMENT
router.get("/paymentArtist", payment_ctrl.output.paymentArtist);
router.get("/paymentGiver", payment_ctrl.output.paymentGiver);
router.get("/paymentPlatform", payment_ctrl.output.paymentPlatform);



module.exports = router;