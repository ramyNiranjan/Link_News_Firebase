import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "hacket-clone.firebaseapp.com",
  databaseURL: "https://hacket-clone.firebaseio.com",
  projectId: "hacket-clone",
  storageBucket: "hacket-clone.appspot.com",
  messagingSenderId: "789327345737",
  appId: "1:789327345737:web:b91506675d884aea64a798",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, firestore, timestamp, auth };
