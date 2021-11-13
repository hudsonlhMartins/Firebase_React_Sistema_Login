import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCYIqtv4glbCA0LtAcz1cWAsZf0WK-loYE",
    authDomain: "teste-login-react.firebaseapp.com",
    projectId: "teste-login-react",
    storageBucket: "teste-login-react.appspot.com",
    messagingSenderId: "641564399832",
    appId: "1:641564399832:web:72222021d81ce4909c1fad",
    measurementId: "G-64XTMKB9HG"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)