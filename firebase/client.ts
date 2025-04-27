import { initializeApp , getApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQsPHW18lqqW65ga_VI4ohu7It_2h3DjE",
    authDomain: "interviewly-50df0.firebaseapp.com",
    projectId: "interviewly-50df0",
    storageBucket: "interviewly-50df0.firebasestorage.app",
    messagingSenderId: "956472475591",
    appId: "1:956472475591:web:75bf4f8c049a338cb763e2",
    measurementId: "G-CQ9QYMT40F"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);