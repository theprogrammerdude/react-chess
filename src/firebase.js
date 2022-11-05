import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-YdJItfgCj_39qkYD-w5Vf_E47IT7onc",
  authDomain: "react-chess-7d882.firebaseapp.com",
  projectId: "react-chess-7d882",
  storageBucket: "react-chess-7d882.appspot.com",
  messagingSenderId: "1039458883089",
  appId: "1:1039458883089:web:3dde05908aa31d567c03b0",
  measurementId: "G-4VV89DQTV7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
