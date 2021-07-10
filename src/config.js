import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'

  const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCjll5TeANeTqxr6QQENIFY5H1f2_m2bhc",
    authDomain: "react-authspa.firebaseapp.com",
    projectId: "react-authspa",
    storageBucket: "react-authspa.appspot.com",
    messagingSenderId: "813198938168",
    appId: "1:813198938168:web:f1a9d5c882175a700e96cd",
    measurementId: "G-YKN1V0XEK0"
  });

  export default firebaseConfig;