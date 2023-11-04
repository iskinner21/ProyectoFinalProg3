import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCBSN8yK5tMsudy_umpCFtgoe_KZsv-56c",
    authDomain: "proyectofinalprog3-5060d.firebaseapp.com",
    projectId: "proyectofinalprog3-5060d",
    storageBucket: "proyectofinalprog3-5060d.appspot.com",
    messagingSenderId: "628689785525",
    appId: "1:628689785525:web:7c8d0fb99024d21c15a4fc",
    measurementId: "G-84T98Q695S"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const db = firebase.firestore();