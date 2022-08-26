"use strict";
const express = require("express");
const path = require("path");
const fs = require("fs =");

const FabricCAServices = require("fabric-service-client");
const { Geteway, Wallets } = require("fabric-network");
// const bodyParser = require("body-parser");

// connection.json object
const ccpPath = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

//
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set..
const channelName = "mychannel";
const chaincodeNmae = "bondsystem";
const mspOrderer = "OrdererMSP";
const adminUserId = "admin";
const adminPasswd = "adminpw";
const walletPath = path.join(__dirname, "wallet");
const appUserId = "appUser";

function jsonString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

// ROUTING GET
app.get("/", (req, res) => {
    console.log("__dirname", __dirname);
    res.sendFile(__dirname + "index.html");
});




// ROUTING POST
// /admin POST ROUTING (id, password)
app.post("/admin", async (req, res) => {
    const id = req.body.id;
    const pw = req.body.password;

    console.log(id, pw);

    try {
        //create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities["ca.orderer.example.com"];
        const caTLSCACerts = caInfo.caTLSCACerts.pem;
        const ca = new FabricCAServices(
            caInfo.url, {trustedRoots: caTLSCACerts, verify: false}, caInfo.caName

        );
    }
});

// Let's try a query type operation (function).
// This will be sent to just one peer and the results will be shown

module.exports = app;
