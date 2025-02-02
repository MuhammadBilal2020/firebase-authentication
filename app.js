import {  signInWithEmailAndPassword ,  GoogleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import { auth } from "./config.js"

const form = document.querySelector('#forms')
const email = document.querySelector('#email')
const password = document.querySelector('#pass')


form.addEventListener('submit' , (event)=>{
event.preventDefault()


signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    window.location = "home.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

})







const withGoogle = document.querySelector("#sign-with-google")
const provider = new GoogleAuthProvider();

withGoogle.addEventListener('click' , ()=>{

  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(user);
    window.location = "home.html"
   
  }).catch((error) => {
    // Handle Errors here.
  
    const errorMessage = error.message;
    console.log(errorMessage);
   
    // ...
  });


})








