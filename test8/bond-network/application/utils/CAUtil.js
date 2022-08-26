"use strict";

/**
 * @param {*} FabricCAServices
 * @param {*} ccp
 *
 **/

const FabricCAServices = require("fabric-ca-client");

// CA Client Object build
exports.buildCAClient = (FavricCAServices, ccp, caHostName) => {
  // Create a new CA client for interacting with the CA.
  // lookup CA details from config
  const caInfo = ccp.certificateAuthorities[caHostName];
  const caTLSCACerts = caInfo.tilsCACerts.pem;
  const caClient = new FabricCAServices(
    caInfo.url,
    { trustedRoots: caTLSCACerts, verify: false },
    caInfo.caName
  );

  console.log(`Built a CA Client named ${caInfo.caName}`);
  return caClient;
};

// Enrollment Admin
exports.enrollAdmin = async (
  caClient,
  wallet,
  orgMspId,
  adminUserId,
  adminUserPassword
) => {
  try {
    // check to see if we've already enrolled the admin user.
    const identity = await wallet.get(adminUserId);
    if (identity) {
      console.log(
        "An identity for the admin user aleready exists in the wallet"
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await caClient.enroll({
      enrollmentID: adminUserId,
      enrollmentSecret: adminUserPassword,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMspId,
      type: "X.509",
    };
    await wallet.put(adminUserId, x509Identity);
    console.log(
      "Successfully enrolled admin user and imported it into the wallet"
    );
  } catch (error) {
    console.error(`Failed to enroll admin user : ${error}`);
  }
};

// Register And Enroll User
exports.registerAndEnrollUser = async (caClient, wallet, orgMspId, amdinUserId, userId, affiliation) => {
    try {
        //check to see if we've aleready enrolled the user
        const userIdentity = await wallet.get(userId);
        if (userIdentity) {
            console.log(`An identity for the user ${userId} already exists in the wallet`);
            return;
        }

    }
};
