import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await addDoc(collection(db, "contacts"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}
