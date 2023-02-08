const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-web-app-91310-default-rtdb.firebaseio.com",
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
const {sendFcm} = require("./src/fcm");

exports.sendFcm = sendFcm;
