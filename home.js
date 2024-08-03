import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import { auth, db } from "./config.js"
import { collection, addDoc, getDocs, doc, deleteDoc,updateDoc , query, where } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"

onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html"
  }
});

const logout = document.querySelector("#logout")

logout.addEventListener('click', () => {

  signOut(auth).then(() => {
    console.log('logout successfully');
    window.location = "index.html"
  }).catch((error) => {
    console.log(error);
  });
})



// tudo app



let forms = document.querySelector('#former')
let todo = document.querySelector(".tudos")
let cities  = document.querySelector('#cities')
let fltrCities = document.querySelectorAll(".fltrCities")
let resetBtn =document.querySelector('#reset')
let ul = document.querySelector('.ul')
let arr = []




// calling data from database


fltrCities.forEach((btn)=>{
  btn.addEventListener('click' ,async (event)=>{
    arr = []
    const citiesRef = collection(db, "users");

    const q = query(citiesRef, where("city", "==", event.target.innerHTML));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      arr.push({...doc.data() , id : doc.id})
    });
    // console.log(arr);
    render()
    
    
  })
})


resetBtn.addEventListener('click' , getData )


async function getData() {
  arr = []
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    arr.push({...doc.data() , id : doc.id})
  });
  // console.log(arr);
  render()

}
getData()



//render todo function 
function render() {
  ul.innerHTML = ""
  arr.map((items) => {

    ul.innerHTML += `<p> ${items.todos}
    (${items.city})
    <button class = "delete" >delete</button>
    <button class = "edit">edit</button>

    </p> `

  })




  // delete button 
  let deleteBtn  =document.querySelectorAll(".delete")
  deleteBtn.forEach((btn,index)=>{
    
    btn.addEventListener("click", async ()=>{
      await deleteDoc(doc(db, "users", arr[index].id));


      arr.splice(index,1)
      render()
    })
  })


  // edit button 
  let editBth = document.querySelectorAll('.edit')

editBth.forEach((eBtn , index)=>{
  eBtn.addEventListener("click" ,async ()=>{

    const updateArr = prompt('enter new value')
    const updateArr2 = prompt('enter new value')

    const todoUpdate = doc(db, "users", arr[index].id);

// Set the "capital" field of the city 'DC'
await updateDoc(todoUpdate, {
 todos : updateArr,
 city :updateArr2
});
arr[index].todos = updateArr
arr[index].city = updateArr2
render()

  })
})



}



// submit btn function 
forms.addEventListener("submit", async (event) => {
  event.preventDefault() // removing forms default behavior



  try {
    const docRef = await addDoc(collection(db, "users"),
      { todos: todo.value , city : cities.value }

    );

    console.log("Document written with ID: ", docRef.id);
    arr.push({ 
      todos: todo.value,
      city : cities.value,
      id : docRef.id 

    })
    render()
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  todo.value = ""


})



