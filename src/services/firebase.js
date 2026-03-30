import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvl3jxxtczrWqpq0e2ukqVYutL31TUY_Q",
  authDomain: "task-management-app-313e2.firebaseapp.com",
  projectId: "task-management-app-313e2",
  storageBucket: "task-management-app-313e2.firebasestorage.app",
  messagingSenderId: "999317262421",
  appId: "1:999317262421:web:961c66c06c96932bc044dc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);