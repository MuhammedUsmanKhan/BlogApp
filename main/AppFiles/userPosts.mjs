//////////////Should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
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
const db = getFirestore(app);
const storage = getStorage(app);



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



let singleUserPosts = (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('value');
    // let userEmail = event.target.getAttribute('ref')
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let blogContainer = document.getElementById('blogContainer')
        blogContainer.innerHTML = '';
        const backButDiv = document.createElement('div');
        backButDiv.setAttribute('class', 'flex justify-start w-full ');
        const backBut = document.createElement('button');
        const imgContainer = document.createElement('div')
        // <img class="h-11 w-12 sm:w-16 sm:h-16  rounded-full"
        //                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        //                 alt="Pfp not found" id="userProfImg">
        const img = document.createElement('img')
        img.setAttribute('class',' sm:w-56 sm:h-56 rounded-lg')
        const heading = document.createElement('h1')
        heading.setAttribute('class','font-semibold text-lg')
        imgContainer.append(img,heading)
        imgContainer.setAttribute('class','flex flex-col pt-4 items-center w-full')
        backBut.addEventListener('click', () => {
            location.href = '../index.html'
        })
        backButDiv.setAttribute('class','flex flex-col items-start w-full')
        backButDiv.append(imgContainer,backBut);
        backBut.innerText = "Go Back"
        backBut.className = 'text-blue-500 text-left font-semibold py-2 hover:text-blue-600';
        blogContainer.appendChild(backButDiv)
        querySnapshot.forEach((doc) => {

            console.log(doc.data())

            if (userEmail === `${doc.data().userEmail}`) {
                // Create a div element with the specified classes
                // Create the main container div

                heading.innerText = `${doc.data().userName}`
                const container = document.createElement('div');
                container.className = 'bg-white p-8 bg-blue-300 rounded-lg shadow-lg w-full ';

                // Create the inner div for the rounded image and post details
                const innerDiv = document.createElement('div');


                // Create the author image element
                const authorImage = document.createElement('img');
                getDownloadURL(ref(storage, 'users/' + doc.data().uid + '/profile.jpg'))
                    .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg
                        // Or inserted into an <img> element
                        // image.className = "h-11 w-12 sm:w-11 rounded-full";
                        authorImage.src = url;
                        img.setAttribute('src',`${url}`)
                        // .alt = "User Image";
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log(error)
                    });
                authorImage.alt = 'Author';
                authorImage.className = 'w-16 h-16 rounded-full';

                // Create the div for post details
                const postDetailsDiv = document.createElement('div');
                postDetailsDiv.className = 'flex flex-col  justify-between mb-4';

                // Create the post title element
                const postTitle = document.createElement('h2');
                postTitle.className = 'text-2xl font-semibold text-center md:text-start break-all';
                postTitle.textContent = `${doc.data().postTitle}`;

                // Create the author information element
                const authorInfoDiv = document.createElement('div');
                authorInfoDiv.className = 'flex  space-x-2';

                const authorText1 = document.createElement('span');
                authorText1.className = '';
                authorText1.textContent = 'By';

                const authorName = document.createElement('span');
                authorName.className = 'font-semibold  break-all';
                authorName.textContent = `${doc.data().userName}`;

                let dateinSec = doc.data().timestamp.seconds
                let fullDate = new Date(dateinSec * 1000)
                console.log(fullDate)
                // Step 3: Extract the components of the date(day , year and month)
                const day = fullDate.getDate();
                const year = fullDate.getFullYear();
                const month = fullDate.toLocaleString('en-us', { month: 'long' }); // Get the full month name
                // Step 4: Format the date components as a string
                const formattedDate = `${day} ${month} ${year}`;


                const authorText2 = document.createElement('span');
                authorText2.className = '';
                authorText2.textContent = `Posted on ${formattedDate}`;

                authorInfoDiv.setAttribute('class', 'flex flex-col md:flex-row  text-center md:text-start md:space-x-2')
                authorInfoDiv.appendChild(authorText1);
                authorInfoDiv.appendChild(authorName);
                authorInfoDiv.appendChild(authorText2);

                postDetailsDiv.setAttribute('class', 'flex flex-col items-center md:items-start ')
                postDetailsDiv.appendChild(postTitle);
                postDetailsDiv.appendChild(authorInfoDiv);

                // Create the post content element
                const postContent = document.createElement('p');
                postContent.className = 'mb-4 break-words';
                postContent.textContent = `${doc.data().postContent}`;

                // Create the buttons div
                const buttonsDiv = document.createElement('div');
                //buttonsDiv.className = 'flex ';

                //Create the Edit button
                // Create the Edit button
                // const link = document.createElement('a');
                // //link.addEventListener('click', singleUserPosts)
                // link.setAttribute('href', `./AppFiles/userPosts.html?value=${doc.data().userEmail}`)
                // link.className = ' text-blue-500 font-semibold py-2 hover:text-blue-600';
                // link.textContent = 'See All Post';

                // buttonsDiv.setAttribute('class', 'flex justify-center md:justify-end space-x-4')
                // buttonsDiv.appendChild(link);


                // Append all elements to the main container div
                innerDiv.className = 'flex mb-4 md:space-x-4 flex-col md:flex-row items-center ';
                innerDiv.appendChild(authorImage);
                innerDiv.appendChild(postDetailsDiv);

                container.appendChild(innerDiv);
                container.appendChild(postContent);
                //container.appendChild(buttonsDiv);

                // Append the postDiv to the document (replace "your-container-id" with the actual container ID)
                blogContainer.appendChild(container);

            }

        });

    });

}

document.addEventListener('DOMContentLoaded', singleUserPosts)

let logOutBut = document.getElementById('logOutBut')
let logInBut = document.getElementById('logInBut')
logInBut.addEventListener('click', () => {
    location.href = './signin.html'
})
const CheckingUser = (user) => {
    if (user) {

        // 

        console.log('User is logged in:', user.email);
        //console.log(body)
        // Perform the redirect here, e.g.:
        logInBut.classList.add('hidden')

        logOutBut.addEventListener(`click`, () => {
            signOut(auth).then(() => {
                // alert('succesfully signed out')
                location.href = './AppFiles/signin.html'
            }).catch((error) => {
                // An error happened.
            });
        })

        let userProfImg = document.getElementById('userProfImg')
        getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg
                // Or inserted into an <img> element
                // image.className = "h-11 w-12 sm:w-11 rounded-full";
                userProfImg.src = url;
                // .alt = "User Image";
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });

    } else {

        logOutBut.classList.add('hidden')
        console.log('User is logged out');

    }
};

onAuthStateChanged(auth, CheckingUser)

// Get the current date and time
const now = new Date();
const currentHour = now.getHours();

// Define variables for different greetings
let greeting;

if (currentHour < 12) {
    greeting = "Good morning!";
} else if (currentHour < 17) {
    greeting = "Good afternoon!";
} else if (currentHour < 20) {
    greeting = "Good evening!";
} else {
    greeting = "Good night!";
}

// Print or use the greeting as needed
console.log(greeting);

document.getElementById('abc').innerHTML = greeting;