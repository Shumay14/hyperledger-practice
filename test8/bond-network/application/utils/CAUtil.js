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
exports.registerAndEnrollUser = async (
  caClient,
  wallet,
  orgMspId,
  amdinUserId,
  userId,
  affiliation
) => {
  try {
    // check to see if we've aleready enrolled the user
    const userIdentity = await wallet.get(userId);
    if (userIdentity) {
      console.log(
        `An identity for the user ${userId} already exists in the wallet`
      );
      return;
    }
    // Must use a admin to register a new User
    const adminIdentity = await wallet.get(adminUserId);
    if (!adminIdentity) {
      console.log(
        "An identitiy for the admin user does not exist in the wallet"
      );
      console.log("Enroll the admin user before retrying");
      return;
    }

    // build a User Object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    // Admin User
    const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

    // Register the User, Enroll the User, and Import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA.
    const secret = await caClient.register(
      { affiliation: affiliation, enrollmentID: userId, role: "client" },
      adminUser
    );

    const enrollment = await caClient.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMspId,
      type: "X.509",
    };
    await wallet.put(userId, x509Identity);
    console.log(
      `Successfully registerd and enrolled user ${userId} and imported it into the wallet`
    );
  } catch (err) {
    console.error(`Failed to register user : ${error}`);
  }
};
