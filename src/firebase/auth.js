import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebaseConfig"; // استيراد التطبيق

export const auth = getAuth(app);

// دالة تسجيل الدخول
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// دالة إنشاء حساب
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// دالة تسجيل الخروج
export const logoutUser = () => {
  return signOut(auth);
};
