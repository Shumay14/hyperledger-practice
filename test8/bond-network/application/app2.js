"use strict";
const express = require("express");
const path = require("path");
const fs = require("fs =");

const FabricCAServices = require("fabric-service-client");
const { Geteway, Wallets } = require("fabric-network");
// const bodyParser = require("body-parser");

// connection.json object
const ccpPath = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf-8"));

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

function JSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

// ROUTING POST
// /admin POST ROUTING (id, password)
app.post("/admin", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;

  console.log(id, pw);
});

// Let's try a query type operation (function).
// This will be sent to just one peer and the results will be shown

module.exports = app;
