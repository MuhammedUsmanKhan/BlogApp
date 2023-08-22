//////////////Should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, updateDoc, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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

console.log(auth.currentUser)

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



//////////////adding Post By user that has been logged in////////////////////////////////
let addBlog = async () => {

    const user = auth.currentUser;
    let userName;

    const q = query(collection(db, "userDetails"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().firstName)
        if (user.email == doc.data().userEmail) {
            console.log(doc.data().firstName)
            userName = `${doc.data().firstName} ${doc.data().lastName}`;
            console.log(userName)
        }
        console.log(userName)
    })

    console.log(user.email)
    let postTitle = document.getElementById('postTitle')
    let postContent = document.getElementById('postContent')
    if (postTitle.value.trim().length != 0 && postContent.value.trim().length != 0) {
        const docRef = await addDoc(collection(db, "Blogs"), {
            postTitle: postTitle.value,
            postContent: postContent.value,
            userName: userName,
            uid: user.uid,
            userEmail: user.email,
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

        postTitle.value = ""
        postContent.value = ""
    }
}

let editPost = async (event) => {
    let insertParaTextAreaTag = event.target.parentNode.parentNode.childNodes[2]
    let parentDivOfParaText = event.target.parentNode.parentNode
    let paraContainer = event.target.parentNode.parentNode.childNodes[1]
    let prevParaText = event.target.parentNode.parentNode.childNodes[1].textContent
    let titleContainer = event.target.parentNode.parentNode.firstChild.childNodes[1]
    let h1Tag = event.target.parentNode.parentNode.firstChild.childNodes[1].childNodes[0]
    let divTag = event.target.parentNode.parentNode.firstChild.childNodes[1].childNodes[1]
    divTag.setAttribute(`id`, `dateContainer`)
    insertParaTextAreaTag.setAttribute(`id`, `textContainer`)
    let prevTitle = event.target.parentNode.parentNode.firstChild.childNodes[1].childNodes[0].textContent

    let editButton = event.target
    let updtButton = event.target.previousSibling
    console.log(prevTitle)
    console.log(editButton)
    console.log(titleContainer)
    console.log(divTag)
    console.log(paraContainer)
    console.log(prevParaText)
    console.log(insertParaTextAreaTag)
    console.log(parentDivOfParaText)

    // editButton.setAttribute('id', 'editBut')
    const docID = event.target.getAttribute(`ref`);
    console.log(docID)

    h1Tag.classList.add(`hidden`)
    paraContainer.classList.add(`hidden`)
    let contentTextArea = document.createElement('textarea')
    contentTextArea.setAttribute('class', `border-2 border-black p-2 h-40 resize-none outline-none w-full mb-4`)
    let inpComment = document.createElement(`input`)
    inpComment.setAttribute(`class`, `border-2 border-black p-2  outline-none w-full`)
    inpComment.value = prevTitle
    contentTextArea.value = prevParaText
    // contentTextArea.setAttribute(`ref`, docID)
    // inpComment.setAttribute(`ref`, docID)
    // inpComment.addEventListener(`keypress`, submitTitle)
    // contentTextArea.addEventListener('keypress', submitContent)
    parentDivOfParaText.insertBefore(contentTextArea, insertParaTextAreaTag);
    // titleContainer.insertBefore(inpComment,divTag);
    titleContainer.insertBefore(inpComment, divTag);
    editButton.classList.add('hidden')
    updtButton.classList.remove('hidden')
    // const washingtonRef = doc(db, "threads", docID);
    // let user = auth.currentUser
    // console.log(user.uid)
    // // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //     [user.uid]: arrayRemove(`${prevCommentVal}`)
    // });

}

let updatedPost = async (event) => {
    event.preventDefault()
    let h1Tag = event.target.parentNode.parentNode.firstChild.childNodes[1].childNodes[0]
    let paraContainer = event.target.parentNode.parentNode.childNodes[1]
    const docID = event.target.getAttribute(`ref`);
    console.log(docID)
    let updatedText = event.target.parentNode.parentNode.childNodes[2]
    console.log(updatedText)
    let updatedTitle = event.target.parentNode.parentNode.firstChild.childNodes[1].childNodes[1]
    console.log(updatedTitle)

    // if (prevParaText != updatedText && prevTitle != updatedTitle)
    //  {
        console.log(h1Tag)
        console.log(paraContainer)
    //     console.log(upd)
        const washingtonRef = doc(db, "Blogs", docID);
        // Atomically add a new region to the "regions" array field.
        await updateDoc(washingtonRef, {
            postTitle: updatedTitle.value,
            postContent: updatedText.value
        });
        let editBut = event.target.nextSibling
        editBut.classList.remove('hidden')
        h1Tag.classList.remove('hidden')
        paraContainer.classList.remove('hidden')
        updatedTitle.classList.add('hidden')
        updatedText.classList.add('hidden')
        event.target.classList.add('hidden')
        
   // }
}


let rendermyBlogs = (event) => {

    // let userEmail = 
    const q = query(collection(db, "Blogs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let user = auth
        console.log(user.currentUser.email)
        const currentUserEmail = user.currentUser.email
        let blogContainer = document.getElementById('blogContainer')
        blogContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {

            console.log(doc.data())

            if (currentUserEmail === `${doc.data().userEmail}`) {
                // Create a div element with the specified classes
                // Create the main container div
                const container = document.createElement('div');
                container.className = 'bg-white p-8 bg-blue-300 rounded-lg shadow-lg w-full ';

                // Create the inner div for the rounded image and post details
                const innerDiv = document.createElement('div');


                // Create the author image element
                const authorImage = document.createElement('img');
                getDownloadURL(ref(storage, 'users/' + user.currentUser.uid + '/profile.jpg'))
                    .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg
                        // Or inserted into an <img> element
                        // image.className = "h-11 w-12 sm:w-11 rounded-full";
                        authorImage.src = url;
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
                postTitle.className = 'text-2xl font-semibold text-center md:text-start break-words';
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

                let dateinSec = doc.data().timestamp
                const secDate = dateinSec.seconds * 1000
                console.log(typeof dateinSec)
                let fullDate = new Date(secDate)
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

                //Create update button
                const updt = document.createElement('button');
                updt.setAttribute('ref', `${doc.id}`)
                updt.addEventListener('click', updatedPost)
                updt.className = 'bg-blue-500 hidden hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-2xl';
                updt.textContent = 'Update';

                //Create the Edit button
                const edit = document.createElement('button');
                edit.setAttribute('ref', `${doc.id}`)
                edit.addEventListener('click', editPost)
                edit.className = 'bg-blue-500 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-2xl';
                edit.textContent = 'Edit';

                //Create the Edit button
                const del = document.createElement('button');
                del.addEventListener('click', delBlog)
                del.setAttribute('ref', `${doc.id}`)
                del.className = 'bg-blue-500 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-2xl';
                del.textContent = 'Delete';

                buttonsDiv.setAttribute('class', 'flex justify-center md:justify-end space-x-4')
                buttonsDiv.appendChild(updt);
                buttonsDiv.appendChild(edit);
                buttonsDiv.appendChild(del);

                // Append all elements to the main container div
                innerDiv.className = 'flex mb-4 md:space-x-4 flex-col md:flex-row items-center ';
                innerDiv.appendChild(authorImage);
                innerDiv.appendChild(postDetailsDiv);

                container.appendChild(innerDiv);
                container.appendChild(postContent);
                container.appendChild(buttonsDiv);

                // Append the postDiv to the document (replace "your-container-id" with the actual container ID)
                blogContainer.appendChild(container);

            }

        });

    });


}

let delBlog = async (event) => {

    const docID = event.target.getAttribute(`ref`);
    console.log(docID)
    //const commentVal = event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].textContent
    //const delcommentLi = event.target.parentNode.parentNode.parentNode
    //console.log(commentVal)
    let delBlogInfo = docID

    await deleteDoc(doc(db, "Blogs", delBlogInfo));

}



document.addEventListener('DOMContentLoaded', rendermyBlogs)

let addBlogButton = document.getElementById('addBlogButton')

addBlogButton.addEventListener('click', addBlog)

const CheckingUser = (user) => {
    if (user) {
        let userNavProfImg = document.getElementById('userNavProfImg')

        getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg
                // Or inserted into an <img> element
                // image.className = "h-11 w-12 sm:w-11 rounded-full";
                userNavProfImg.src = url;
                // .alt = "User Image";
            })
            .catch((error) => {
                // Handle any errors
                console.log(error)
            });
        console.log('User is logged in:', user.email);

        // Perform the redirect here, e.g.:
        logInBut.innerText = 'Log Out'

    } else {

        console.log('User is logged out');
        window.location.href = './signin.html';

    }
};


let threadTitleInp = document.getElementById(`threadTitle`)
let textArea = document.getElementById(`textArea`)
let threadCreateBut = document.getElementById(`pollCreatedBut`)


onAuthStateChanged(auth, CheckingUser)
let logInBut = document.getElementById('logInBut')

logInBut.addEventListener(`click`, () => {
    signOut(auth).then(() => {
        // alert('succesfully signed out')
        location.href = './signin.html'
    }).catch((error) => {
        // An error happened.
    });
})

// logInBut.addEventListener('click', (event) => {
//     location.href = './signin.html'
// })