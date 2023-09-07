import { initializeApp } from "firebase/app";
import auth from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw2kGrqPKNwYZk96PjE_Ama0umCu8UPdY",
    authDomain: "ass01-a2133.firebaseapp.com",
    databaseURL: "https://ass01-a2133.firebaseio.com",
    projectId: "ass01-a2133",
    storageBucket: "ass01-a2133.appspot.com",
    messagingSenderId: "320390439139",
    appId: "1:320390439139:web:b6657503c33a78ffa4e5d6"
};

export const app = initializeApp(firebaseConfig);


