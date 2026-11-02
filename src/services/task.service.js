import { addDoc, collection, doc, getCountFromServer, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../enviroment/enviroment";

export async function createNewTask(name, deadline, checklist) {
    try {
        const uid = localStorage.getItem("uid");
        await addDoc(collection(db, "tasks"), {
            name,
            deadline,
            status: "pending",
            checklist,
            assignedTo: uid
        });
    } catch (error) {
        console.log(error);
    }
}

export async function fetchMyTasks() {
    try {
        const uid = localStorage.getItem("uid");
        const q = query(collection(db, "tasks"), where("assignedTo", "==", uid));

        const querySnapshot = await getDocs(q);
        let tasks = []
        querySnapshot.forEach(doc => {
            tasks.push({ ...doc.data(), id: doc.id });
        })
        return tasks;
    } catch (error) {
        console.log(error);
    }
}

// pending, in-progress, completed
export async function fetchTasksByStatus(status) {
    try {
        const uid = localStorage.getItem("uid");
        const q = query(collection(db, "tasks"), where("assignedTo", "==", uid), where("status", "==", status));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    }  catch (error) {
        console.log(error);
    }
}

export async function updateTaskChecklist(taskId, checklist, status) {
    try {
        await updateDoc(doc(db, "tasks", taskId), { checklist, status });
    } catch (error) {
        console.log(error);
    }
}
