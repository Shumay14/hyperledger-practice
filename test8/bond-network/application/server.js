"use strict";
// 1. import modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const FabricCAServices = require("fabric-ca-client");
const { Gateway, Wallets } = require("fabric-network");

// 2. connection.json 객체화
const ccpPath = path.resolve(__dirname, "ccp", "connection-orderer.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf-8"));

// 3. 서버 설정
const app = express();
const HOST = "0.0.0.0";
const PORT = 8000;

// use static file
app.use(express.static(path.join(__dirname, "views")));

// configure app to use body-parser by express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
 * 4. REST API ROUTING
 * GET ROUTING - /asset
 * POST ROUTING - /admin, /user, /bond, /transfer
 */

// GET ROUTING
// 4.2. /asset GET (자산조회)
app.get("/asset", async (req, res) => {
  const cert = req.query.cert;
  const id = req.query.id;
  console.log("/asset-get-", +id);

  // Create a new file systme based wallet for managing identitiies.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Waleet path: ${walletPath}`);

  // Check to see if we've already enrolled the admin user.
  const identity = await wallet.get(cert);
  if (!identity) {
    console.log(`An identitiy for the user does not exists in the wallet`);
    const res_str = `{"result": "failed", "msg": "An identity for the user does not exists in the wallet"}`;
    res.json(JSON.parse(res_str));
    return;
  }

  // Create a new gateway for connecting to our peer node.
  gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: cert,
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  network = await gateway.getNetwork("bondsystem");

  // Get the contract from the network.
  contract = network.getContract("bondsys");

  // Submit the specified transaction.
  console.log(
    `\n--> Evaluate Transaction: BondList, function returns "${bondnum} attributes`
  );
  result = await contract.evaluateTransaction("BondList", bondnum);

  // response -> client
  await gateway.disconnect();
  res_str = `{"result": "success", "msg": ${result}}`;
  res.status(200).json(JSON.parse(res_str));

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identitiy: cert,
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("bondsystem");

  // Get the contract from the network.
  const contract = network.getContract("bondsys");

  // Submit the specified transaction.
  console.log(
    `\n--> Evaluate Transaction: BondList, function returns "${bondnum}" attributes`
  );
  result = await contract.evaluateTransaction("BondList", id);

  // response -> client
  await gateway.disconnect();
  const res_str = `{"result": "success", "msg": ${result}}`;
  res.status(200).json(JSON.parse(res_str));
});

//// POST 라우팅
//// 4.0.1 /admin POST 라우팅 (id, password)
app.post("/admin", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;

  console.log(id, pw);

  try {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.orderer.example.com"];
    const caTLSCACerts = caInfo.caTLSCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(id);
    if (identity) {
      console.log(
        `An identity for the admin user ${id} already exists in the wallet`
      );
      const res_str = `{"result":"failed","msg":"An identity for the admin user ${id} already exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: id,
      enrollmentSecret: pw,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put(id, x509Identity);

    // Response to client
    console.log(
      "Succesfully enrolled admin user 'admin' and imported it into the wallet"
    );
    const res_str = `{"result": "success", "msg": "Successfully enrolled admin user ${id} in the wallet"}`;
    res.status(200).json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to enroll admin user ${id}`);
    const res_str = `{"result": "failed", "msg": "failed to enroll admin user - ${id} : ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//// 4.0.2 /user POST ROUTING (id , userrole)
//// 기업이나 투자자로 바꿔야함
app.post("/user", async (req, res) => {
  const id = req.body.id;
  const userrole = req.body.userrole;

  console.log(id, userrole);

  try {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.orderer.example.com"];
    const caTLSCACerts = caInfo.caTLSCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const adminIdentity = await wallet.get("admin");
    if (!adminIdentity) {
      console.log(
        'An identity for the admin user "admin" does not exist in the wallet'
      );
      const res_str = `{"result":"failed","msg":"An identity for the admin user ${id} does not exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // Check to see if we've already enrolled the user.
    const userIdentity = await wallet.get(id);
    if (userIdentity) {
      console.log(
        `An identitiy for the user "appUser" already exists in the wallet`
      );
      const res_str = `{"result":"failed","msg":"An identity for the user ${id} already exists in the wallet"}`;
      res.json(JSON.parse(res_str));
      return;
    }

    // build a user object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, "admin");

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register(
      {
        enrollmentID: id,
        role: userrole,
      },
      adminUser
    );
    const enrollment = await ca.enroll({
      enrollmentID: id,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put(id, x509Identity);

    // response to client
    console.log(
      'Successfully registered and enrolled admin user "appUser" and imported it into the wallet'
    );

    const res_str = `{"result":"success","msg":"Successfully enrolled user ${id} in the wallet"}`;
    res.json(JSON.parse(res_str));
  } catch (error) {
    console.error(`Failed to enroll admin user ${id}`);
    const res_str = `{"result": "failed", "msg": "failed to register user - ${id} : ${error}"}`;
    res.json(JSON.parse(res_str));
  }
});

//// 4.1.0 /bond POST (채권 생성)
app.post("/bond", async (req, res) => {
  const cert = req.body.cert;
  const issuers = req.body.issuers;
  const maxissuersnum = req.body.maxissuersnum;
  const bondnum = req.body.bondnum;
  const maxbondnum = req.body.maxbondnum;
  const facevalue = req.body.facevalue;
  const presentvalue = req.body.presentvalue;
  const issuedate = req.body.issuedate;
  const maturity = req.body.maturity;
  const investor = req.body.investor;
  console.log(
    "/bond-post-" +
      issuers +
      ":" +
      maxissuersnum +
      ":" +
      bondnum +
      ":" +
      maxbondnum +
      ":" +
      facevalue +
      ":" +
      presentvalue +
      ":" +
      issuedate +
      ":" +
      maturity +
      ":" +
      investor +
      ":"
  );

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the admin user.
  const identity = await wallet.get(cert);
  if (!identity) {
    console.log(`An identity for the user does not exists in the wallet`);
    const res_str = `{"result":"failed","msg":"An identity for the user does not exists in the wallet"}`;
    res.json(JSON.parse(res_str));
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identitiy: cert,
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("bondsystem");

  // Get the contract from the network.
  const contract = network.getContract("bondsys");

  // Submit the specified transaction.
  console.log(
    "\n--> Submit Transaction: IssueBond, issue new bond with issuers, maxissuersnum, bondnum, maxbondnum, and etc. arguments"
  );
  await contract.submitTransaction();
  console.log("Transaction(IssueBond) has been submitted");

  // response - client
  await gateway.disconnect();
  const resultPath = path.join(process.cwd(), "/views/result.html");
  var resultHTML = fs.readFileSync(resultPaht, "utf-8");
  resultHTML = resultHTML.replace(
    "<dir></dir>",
    "<dir><p>Transaction(IssueBond) has been submitted</p></div>"
  );
  res.status(200).send(resultHTML);
});

// 4.6. /transferasset POST
app.post("/transferasset", async (req, res) => {
  const cert = req.body.cert;
  const bondnum = req.body.id;
  const investor = req.body.owner;
  console.log("/transfer-post-" + investor);
  console.log(cert, bondnum, investor);

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);
});

// 5. Server Start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
