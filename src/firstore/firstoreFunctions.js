import { db } from "./firestoreConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

export const colRef = collection(db, "messages");

export const q = query(colRef, orderBy("time", "desc"), limit(5));

export async function sendMessage(collectionName, userName, message) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      user: userName,
      message: message,
      time: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default sendMessage;
