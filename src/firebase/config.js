// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// burda saglayıcıları import etmemız lazım (kimlik dogrulama import işlemı)
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
getFirestore
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQpOI5OiDdXXRUTIBbKhvyqpaWdab6LMA",
  authDomain: "twitter-clone-9ecf7.firebaseapp.com",
  projectId: "twitter-clone-9ecf7",
  storageBucket: "twitter-clone-9ecf7.appspot.com",
  messagingSenderId: "167889096186",
  appId: "1:167889096186:web:45647ac61f987d1809a843"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth  yapısının referansının alma 
export  const auth = getAuth(app);

// google sağlayıcısının referansını alma 
export const provider =new GoogleAuthProvider()


export const db =  getFirestore(app)

// storage referansını alma
export const storage =getStorage(app);