var admin = require("firebase-admin");

const serviceAccount = {
    "type": "service_account",
    "project_id": "crowd-cruisers",
    "private_key_id": ,
    "private_key":,
    "client_email": ,
    "client_id": ,
    "auth_uri": ,
    "token_uri": ,
    "auth_provider_x509_cert_url": ,
    "client_x509_cert_url": 
}

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = firebase
