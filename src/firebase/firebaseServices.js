import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getProducts = async () => {
  const productsCol = collection(db, 'products');
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, 'products'), where('category', '==', category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
