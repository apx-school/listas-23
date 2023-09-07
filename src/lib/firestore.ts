import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = {
  type: "service_account",
  project_id: "listas-23",
  private_key_id: "f2e28a840948d618df8d5454d679887772c9531c",
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-cpcjk@listas-23.iam.gserviceaccount.com",
  client_id: "103671914609455950401",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cpcjk%40listas-23.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

export const firestore = getFirestore();
