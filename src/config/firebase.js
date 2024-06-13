import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAVDV68Ah-gPjOQsecs6P4qAbBmWmkYjY0",
  authDomain: "fir-course-9fa50.firebaseapp.com",
  projectId: "fir-course-9fa50",
  storageBucket: "fir-course-9fa50.appspot.com",
  messagingSenderId: "159756235147",
  appId: "1:159756235147:web:387de2f51a7e750e2dbf8e",
  measurementId: "G-ZMBBQ9J8MZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)