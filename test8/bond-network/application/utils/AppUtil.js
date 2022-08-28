"use strict";

const fs = require("fs");
const path = require("path");

exports.buildCCPOrderer = () => {
  // Load the common connection configuration file
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "ccp",
    "connection-orderer.json"
  );

  const fileExists = fs.existsSync(ccpPath); // boolean return
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }

  const contents = fs.readFileSync(ccpPath, "utf-8");

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration loacted at ${ccpPath}`);
  return ccp;
};

exports.buildWallet = async (Wallets, walletPath) => {
  // Create a new wallet : Note that wallet is for managing identities.
  let wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
  } else {
    wallet = await Wallets.newInMemoryWallet();
    console.log("Built an in memory wallet");
  }
};

exports.JSONString = (inputString) => {
  if (inputString) {
    return inputString;
  }
};
