"use strict";
// ExpressJS Setup
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");

const app = express();

// Hyperledger Bridge Setup
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");

// load the network configuration
