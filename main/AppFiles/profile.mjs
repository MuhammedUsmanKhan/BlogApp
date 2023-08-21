import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, updateDoc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyDizRqFG9fzEbtNmhmkdsuQVZ9O1vQMAHY",
    authDomain: "saylani-mini-hackathon-48c03.firebaseapp.com",
    projectId: "saylani-mini-hackathon-48c03",
    storageBucket: "saylani-mini-hackathon-48c03.appspot.com",
    messagingSenderId: "284827950058",
    appId: "1:284827950058:web:e5218c4c294528be4c7093"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

let navList = document.getElementById('navList');
let bar = document.getElementById('bar');

bar.addEventListener('click', () => {
    bar.classList.toggle('fa-bars');
    bar.classList.toggle('fa-times');
    navList.classList.toggle('-translate-y-full');
    navList.classList.toggle('-translate-y-0');
    navList.classList.toggle('top-0');
    navList.classList.toggle('top-16');
    navList.classList.toggle('invisible');
});

// Initialize Firebase app and auth
// ...

// Get the form and reset message elements

// ... (Initialize Firebase app and auth)

// Get the form and reset message elements




// document.addEventListener('DOMContentLoaded',()=>{

// })

const newPass = document.getElementById('newPass');
const confirmNewPass = document.getElementById('confirmNewPass');
const changePassBut = document.getElementById('changePassBut');
let user = document.getElementById('user');

/////////////////////////userName Update////////////////////////
let userName = async (userID) => {
    //    const userDoc = auth.currentUser.uid
    const docRef = doc(db, "userDetails", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        user.innerHTML = `Welcome ! ${docSnap.data().firstName} ${docSnap.data().lastName}`;

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}
//////////////Edit Work left But soon will be completed /////////////////////////////////
let editUserNamPara = document.getElementById("editUserNamPara");
let userInput = document.createElement("input");
let editUserNam = () => {
    let userContainer = document.getElementById("userContainer");
    user.classList.add('hidden');
    userInput.addEventListener('keypress', userNameUpdated)
    userInput.setAttribute("type", "text");
    userContainer.insertBefore(userInput, editUserNamPara);

}

let userNameUpdated = async (event) => {

    if (event.key === 13) {
        const name = userInput.value
        let user = auth.currentUser.email
        console.log(user)
        const washingtonRef = doc(db, "userDetails", user);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            firstName: name
        });
        user.classList.remove('hidden');
        event.target.classList.add('hidden');
    }
}

editUserNamPara.addEventListener(`click`, editUserNam)

let logInBut = document.getElementById('logInBut')

logInBut.addEventListener(`click`, () => {
    signOut(auth).then(() => {
        // alert('succesfully signed out')
        location.href = './signin.html'
    }).catch((error) => {
        // An error happened.
    });
})


onAuthStateChanged(auth, (user) => {
    if (user) {
        let imgUpload = document.getElementById(`upload`)
        let file = {}
        imgUpload.addEventListener(`change`, (event) => {
            console.log(event.target.files)
            file = event.target.files[0]
            // const user = auth.currentUser.uid
            const storageRef = ref(storage, 'users/' + user.uid + '/profile.jpg')
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            const profNavImg = document.getElementById('profImg')
            const profImg = document.getElementById('userProfImg')
            // // if (imgUpload.files.length === 0) {
            // //     console.log("No file selected.");

            // // } else {
            // // At least one file has been selected
            // // alert("File selected: " + imgUpload.files[0].name);
            setTimeout(()=>{
                getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg
                    // Or inserted into an <img> element
                    // image.className = "h-11 w-12 sm:w-11 rounded-full";
                    profImg.setAttribute('src', url);
                    profNavImg.setAttribute('src', url);
                    // .alt = "User Image";
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error)
                });
            },2000)
            
            
        })
        const profNavImg = document.getElementById('profImg')
        const profImg = document.getElementById('userProfImg')
        // // if (imgUpload.files.length === 0) {
        // //     console.log("No file selected.");

        // // } else {
        // // At least one file has been selected
        // // alert("File selected: " + imgUpload.files[0].name);
        getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg
                // Or inserted into an <img> element
                // image.className = "h-11 w-12 sm:w-11 rounded-full";
                profImg.setAttribute('src', url);
                profNavImg.setAttribute('src', url);
                // .alt = "User Image";
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });
        // //  }



        userName(user.email)
        let passwordResetFunction = async (event) => {
            event.preventDefault();

            if (newPass.value === confirmNewPass.value) {
                try {
                    await updatePassword(user, newPass.value);
                    console.log("Password reset successfully.");
                    // Add code here to display a success message or redirect the user.
                } catch (error) {
                    console.error("Error resetting password:", error);
                    // Add code here to display an error message to the user.
                }
            } else {
                console.error("Passwords do not match.");
                // Add code here to display a password mismatch error message.
            }
        }

        changePassBut.addEventListener("click", passwordResetFunction);

    } else {
        console.log("User is signed out");
        location.href = './signin.html'
        // Add code here to handle a signed-out user, such as redirecting to a login page.
    }
});


