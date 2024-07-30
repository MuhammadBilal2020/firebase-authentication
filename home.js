import { onAuthStateChanged ,signOut   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import { auth , db  } from "./config.js"
import { collection, addDoc , getDocs} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"

onAuthStateChanged(auth, (user) => {
    if (user) {
    
      const uid = user.uid;
      console.log(uid);
    } else {
    window.location = "index.html"
    }
  });

  const logout = document.querySelector("#logout")
  
  logout.addEventListener('click' , ()=>{
   
signOut(auth).then(() => {
  console.log('logout successfully');
  window.location = "index.html"
}).catch((error) => {
  console.log(error);
});
  })






  // tudo app
let forms = document.querySelector('#former')
let tudos = document.querySelector(".tudos")
let ul = document.querySelector('.ul')
let tudoArr = []


async function getData(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tudoArr.push(doc.data())
    console.log(tudoArr);
    renderTudo()
  });
  
}

getData()



function renderTudo(){
  ul.innerHTML = ""
if(tudoArr.length === 0){
  ul.innerHTML = "no data found"
  return;
}

  tudoArr.map((item)=>{
    ul.innerHTML += `<li>${item.Tudo}</li>`
  })
}






forms.addEventListener('submit' , async (event)=>{
event.preventDefault()
tudoArr.push({Tudo : tudos.value})


renderTudo()

try {
  const docRef = await addDoc(collection(db, "users"), {
    Tudo : tudos.value
  });
  tudos.value  = ""
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

})
  