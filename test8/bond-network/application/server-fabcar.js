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
const ccpPaht = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf-8"));

// Constants
const PORT = 8000;
const HOST = "0.0.0.0";

// Server start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// use static file
app.use(express.static(path.join(__dirname)));

// configure app to use body-parser
app.use(bodyParser.apply.json());
app.use(bodyParser.urlencoded({ extended: false }));

// main page routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// API ROUTING
app.get("/listallbonds");

// Call ChainCode
// arguments = transfer factors
async function callChainCode(fnName, Arguments) {
  //Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  var result;
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const identities = await wallet.get("walletName");
  if (!identity) {
    console.log(
      `An identity for the user "appUser" does not exist in the wallet`
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "walletName",
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("bondsystem");

  // Get the contract from the network.
  const contract = network.getContract("bondsys");

  // Evaluate the specified transaction.
  if (fnName == "ListAllBonds")
    result = await contract.evaluateTransaction(fnName);
  else if (fnName == "IssueBond")
    result = await contract.evaluateTransaction(
      fnName,
      Arguments[0],
      Arguments[1],
      Arguments[2],
      Arguments[3],
      Arguments[4],
      Arguments[5],
      Arguments[6],
      Arguments[7],
      Arguments[8]
    );
  else result = "This function(" + fnName + ") does not exist !!";

  console.log(
    `Transaction has been evaluated, result is: ${result.toString()}`
  );

  // Disconnect from the gateway.
  await gateway.disconnect();
  return result;
}
