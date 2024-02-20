// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLVleYRMRQ4SdXgHB6-oCxQlMR0hz4Z-c",
  authDomain: "user-email-password-auth-db22d.firebaseapp.com",
  projectId: "user-email-password-auth-db22d",
  storageBucket: "user-email-password-auth-db22d.appspot.com",
  messagingSenderId: "140227480056",
  appId: "1:140227480056:web:dbe80cf1b0c0f75269ae0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
