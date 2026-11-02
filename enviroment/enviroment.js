// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DnrKWdHr9jt3ztYp9R8ULcIKDn1ZnwM",
  authDomain: "wd8-batch.firebaseapp.com",
  projectId: "wd8-batch",
  storageBucket: "wd8-batch.firebasestorage.app",
  messagingSenderId: "972723673166",
  appId: "1:972723673166:web:bd9048d6b3882688b28b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export {auth, db};