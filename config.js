
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"
 

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAYFOVk2R0OT2Yr1Jh4iyvFNxcXJuKbugA",
    authDomain: "authentication-96633.firebaseapp.com",
    projectId: "authentication-96633",
    storageBucket: "authentication-96633.appspot.com",
    messagingSenderId: "656896628812",
    appId: "1:656896628812:web:07b1869d6f89aa463c7ce9",
    measurementId: "G-8LH3Q6WKQX"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app);
  
