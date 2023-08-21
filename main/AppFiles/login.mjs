//////////////Should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//////////////Should modify it////////////////////////
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
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
            label.classList.toggle('bg-[#070724]')
            label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }


})
lightMode.addEventListener(`click`, () => {
    if (body.classList.contains('bg-[#070724]')) {
        lightMode.disabled = true
        darkMode.disabled = false
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
            label.classList.toggle('bg-[#070724]')
            label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }
})

// let VerifyUser = (event) => {
//     event.preventDefault()
//     // try {
//     axios.post('/JWT-Auth/signin', {
//         email: userEmail.value,
//         password: userPassword.value
//     })
//         .then((response) => {
//             console.log(response)
//             userEmail.value = ""
//             userPassword.value = ""
//             if (response.status === 200) {
//                 window.location.href = "./post.html";
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
// submitForm.addEventListener('submit', VerifyUser)

let submitForm = document.getElementById('submitForm')
//const db = getFirestore(app)
submitForm.addEventListener(`submit`, async (event) => {

  event.preventDefault();
  // const user = auth
  const userEmail = document.getElementById('userEmail').value
  const userPassword = document.getElementById('userPassword').value
 
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      console.log('Signed in')
      const user = userCredential.user;
      location.href = `./dashboard.html`
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert("Please Check your Console For the error (Can't make a model for it but will make it later soon inshallah) :)")
    });
})

const CheckingUser = (user) => {
  if (user) {

    console.log('User is logged in:', user.email);

    // Perform the redirect here, e.g.:
    window.location.href = './dashboard.html';


    //const interval = setInterval(myIntervalFunction, 1000); // 1000 milliseconds = 1 second
  } else {

    console.log('User is logged out');
  }
};

onAuthStateChanged(auth, CheckingUser)