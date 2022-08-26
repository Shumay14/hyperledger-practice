"use strict";
// import modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const FabricCAServices = require("fabric-ca-client");
const { Gateway, Wallets } = require("fabric-network");

// connection.json 객체화
const ccpPath = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFile);
