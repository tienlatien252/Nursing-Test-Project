const admin = require('firebase-admin');

require('dotenv').config();
var serviceAccount = {
  "type": "service_account",
  "project_id": "iron-entropy-285002",
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": "firebase-adminsdk-434qv@iron-entropy-285002.iam.gserviceaccount.com",
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-434qv%40iron-entropy-285002.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iron-entropy-285002.firebaseio.com"
});

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        req.uid = decodedToken.uid;
        req.email = decodedToken.email;
        next()
      }).catch((error) => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized');
  }
}

module.exports = checkAuth;