import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDizRqFG9fzEbtNmhmkdsuQVZ9O1vQMAHY",
  authDomain: "saylani-mini-hackathon-48c03.firebaseapp.com",
  projectId: "saylani-mini-hackathon-48c03",
  storageBucket: "saylani-mini-hackathon-48c03.appspot.com",
  messagingSenderId: "284827950058",
  appId: "1:284827950058:web:e5218c4c294528be4c7093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
let user = auth.currentUser
let userAdd = async (userEmail, firstName, lastName) => {
  console.log(userEmail, firstName , lastName)
  let user = auth.currentUser
  await setDoc(doc(db, "userDetails", userEmail), {
    userEmail: userEmail,
    firstName: firstName,
    lastName: lastName
  });
}

let showPass = document.getElementById(`showPass`)
let signupPass = document.getElementById(`userPassword`)
let hidePass = document.getElementById(`hidePass`)
showPass.addEventListener(`click`, () => {
  signupPass.type = 'text'
  showPass.classList.add('hidden')
  hidePass.classList.remove('hidden')
  hidePass.classList.add('flex')
})
hidePass.addEventListener(`click`, () => {
  signupPass.type = 'password'
  hidePass.classList.add('hidden')
  showPass.classList.remove('hidden')
})
let darkMode = document.getElementById(`darkMode`)
let lightMode = document.getElementById(`lightMode`)
let body = document.querySelector(`body`)
let signupHead = document.querySelector(`header`)
let main = document.querySelector('main')
let inps = document.querySelectorAll('input')
let labels = document.querySelectorAll('label')
let footer = document.querySelector('footer')
darkMode.addEventListener(`click`, () => {

  if (!body.classList.contains('bg-white')) {
    lightMode.disabled = false
    darkMode.disabled = true
    body.classList.toggle('bg-[#0f172a]')
    signupHead.classList.toggle('text-white')
    main.classList.toggle('text-white')
    inps.forEach((input) => {
      input.classList.toggle('bg-[#0f172a]')
    })
    labels.forEach((label) => {
      //if (!label.classList.contains('bg-white')) {
      // label.classList.remove('bg-white')
      label.classList.toggle('bg-[#0f172a]')
      label.classList.toggle('bg-white')
      //}
    })
    footer.classList.toggle('text-white')
  }


})
lightMode.addEventListener(`click`, () => {
  if (body.classList.contains('bg-[#0f172a]')) {
    lightMode.disabled = true
    darkMode.disabled = false
    body.classList.toggle('bg-[#0f172a]')
    signupHead.classList.toggle('text-white')
    main.classList.toggle('text-white')
    inps.forEach((input) => {
      input.classList.toggle('bg-[#0f172a]')
    })
    labels.forEach((label) => {
      //if (label.classList.contains('bg-white')) {
      // label.classList.add('bg-white')
      label.classList.toggle('bg-white')
      label.classList.toggle('bg-[#0f172a]')
      //}
    })
    footer.classList.toggle('text-white')
  }
})

const submitForm = document.getElementById('submitForm')

let userSignedIn = (event) => {
  event.preventDefault()
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const userEmail = document.getElementById('userEmail').value
  const userPassword = document.getElementById('userPassword').value
  
  console.log(user)
  //console.log("Document written with ID: ", docRef.id);
  // const userID = user.uid
  // console.log(userID)
  userAdd(userEmail, firstName, lastName)
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log(user.uid)
      // /usersProfileImage

      console.log(user.uid)
      //let userID = user.uid
      //console.log(userID)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("Please Check your Console For the error (Can't make a model for it but will make it later soon inshallah) :)")
      // ..
    });
}

// const submitForm = document.getElementById('submitForm')
submitForm.addEventListener(`submit`, userSignedIn )

const CheckingUser = (user) => {
  if (user) {

    console.log('User is logged in:', user.email);
    //console.log(body)
        // Perform the redirect here, e.g.:
        window.location.href = './dashboard.html';

  } else {

    console.log('User is logged out');
  }
};

onAuthStateChanged(auth, CheckingUser)