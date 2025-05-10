import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbRkPjfCCDH-TrrZP6k95mslDCALgeN00",
    authDomain: "inventory-management-fb-bf795.firebaseapp.com",
    projectId: "inventory-management-fb-bf795",
    storageBucket: "inventory-management-fb-bf795.firebasestorage.app",
    messagingSenderId: "121308502093",
    appId: "1:121308502093:web:3f710ec6de826a45c46404",
    measurementId: "G-H9NC06L3NH"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
