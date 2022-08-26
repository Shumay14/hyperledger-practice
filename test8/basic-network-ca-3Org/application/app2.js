"use strict";
const express = require("express");
const path = require("path");
const fs = require("fs =");

const FabricCAServices = require("fabric-service-client");
const { Geteway, Wallets } = require("fabric-network");

// connection.json object
const ccpPath = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf-8"));

//

// set..
const channelName = "mychannel";
const chaincodeNmae = "bondsystem";
const mspOrderer = "OrdererMSP";
const adminUserId = "admin";
const adminPasswd = "adminpw";
const walletPath = path.join(__dirname, "wallet");
const appUserId = "appUser";
