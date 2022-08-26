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
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

// 3. 서버 설정
const app = express();
const HOST = "0.0.0.0";
const PORT = 8000;

// use static file
app.use(express.static(path.join(__dirname, "views")));

// configure app to use body-parser by express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. REST api Routing
//// 4.1. /admin POST 라우팅 (id, password)
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

//// 4.2. /user POST ROUTING (id , userrole)
//// 기업이나 투자자로 바꿔야함
