// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7II4Sp3otROPsjD61nV1Ef7SRgIssiMA",
  authDomain: "assignment-10-cd1d6.firebaseapp.com",
  projectId: "assignment-10-cd1d6",
  storageBucket: "assignment-10-cd1d6.firebasestorage.app",
  messagingSenderId: "865256513488",
  appId: "1:865256513488:web:abca35e0b417c365eee3d5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
