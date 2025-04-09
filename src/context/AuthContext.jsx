import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth"; // ✅ استيراد signOut

const AuthContext = createContext();

// ✨ هوك لاستخدام الكونتكست بسهولة
export function useAuth() {
  return useContext(AuthContext);
}

// ✨ مزود الكونتكست لكل التطبيق
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✨ متابعة حالة تسجيل الدخول والخروج
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ✨ دالة تسجيل الخروج
  const logout = () => {
    return signOut(auth);
  };

  // القيمة اللي بنمررها لكل الأبناء
  const value = { currentUser, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
