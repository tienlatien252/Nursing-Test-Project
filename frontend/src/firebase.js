import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPIYDHrtQ5MPsjSXOM9o5t-_UCc8HUj1I",
    authDomain: "iron-entropy-285002.firebaseapp.com",
    databaseURL: "https://iron-entropy-285002.firebaseio.com",
    projectId: "iron-entropy-285002",
    storageBucket: "iron-entropy-285002.appspot.com",
    messagingSenderId: "126759132510",
    appId: "1:126759132510:web:5f7f5d8705e178f98503cf",
    measurementId: "G-EDJMGS35CL"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();