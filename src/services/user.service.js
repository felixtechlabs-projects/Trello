import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../enviroment/enviroment";
import { doc, setDoc } from "firebase/firestore";

export async function createUser(email, password, name) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password, name);
        await setDoc(doc(db, "users", user.user.uid), {
            email,
            password,
            name,
            id: user.user.uid
        })
    } catch (error) {
        console.log(error);
    }
}

export async function signInUser(email, password) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("uid", user.user.uid);
    } catch (error) {
        console.log(error);
    }
}