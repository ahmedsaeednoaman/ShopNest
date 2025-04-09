// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// بيانات مشروعك من Firebase (بدل القيم هنا بالبيانات بتاعتك الحقيقية)
const firebaseConfig = {
  apiKey: "هنا تحط الـ apiKey بتاعك",
  authDomain: "هنا تحط الـ authDomain بتاعك",
  projectId: "هنا تحط الـ projectId بتاعك",
  storageBucket: "هنا تحط الـ storageBucket بتاعك",
  messagingSenderId: "هنا تحط الـ messagingSenderId بتاعك",
  appId: "هنا تحط الـ appId بتاعك"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);
