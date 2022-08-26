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
