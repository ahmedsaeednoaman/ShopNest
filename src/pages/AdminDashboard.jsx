import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // حالة تحميل البيانات
  const [loading, setLoading] = useState(true);

  // حالة تخزين كل المنتجات
  const [products, setProducts] = useState([]);

  // حالة تخزين بيانات المنتج الجديد
  const [newProduct, setNewProduct] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
  });

  // حالة لرسالة النجاح
  const [successMessage, setSuccessMessage] = useState("");

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin-login");
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    }
  };

  // جلب المنتجات من Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    } catch (error) {
      console.error("خطأ أثناء جلب المنتجات:", error);
    }
  };

  // حذف منتج مع تأكيد
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      fetchProducts();
    } catch (error) {
      console.error("خطأ أثناء حذف المنتج:", error);
    }
  };

  // إضافة منتج جديد
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imageUrl || !newProduct.price || !newProduct.description) {
      alert("من فضلك املا جميع الحقول");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: parseFloat(newProduct.price),
        createdAt: new Date(),
      });
      setNewProduct({ name: "", imageUrl: "", price: "", description: "" });
      setSuccessMessage("تم إضافة المنتج بنجاح ✅");
      fetchProducts();
      setTimeout(() => setSuccessMessage(""), 3000); // اخفاء الرسالة بعد 3 ثواني
    } catch (error) {
      console.error("خطأ أثناء إضافة المنتج:", error);
    }
  };

  // تحميل المنتجات أول ما الصفحة تفتح
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* ✨ رأس الصفحة */}
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>مرحباً، {currentUser?.email}</h1>
        <button onClick={handleLogout} className="logout-button">
          تسجيل الخروج
        </button>
      </div>

      {/* ✨ رسالة نجاح */}
      {successMessage && <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>}

      {/* ✨ نموذج إضافة منتج */}
      <form onSubmit={handleAdd} className="add-product-form">
        <h2>إضافة منتج جديد</h2>
        <input
          type="text"
          placeholder="اسم المنتج"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="رابط الصورة"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="السعر"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <textarea
          placeholder="وصف المنتج"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <button type="submit">أضف المنتج</button>
      </form>

      {/* ✨ جدول عرض المنتجات */}
      <div className="products-list">
        <h2>قائمة المنتجات</h2>

        {loading ? (
          <p>جاري التحميل...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>السعر</th>
                <th>الوصف</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.imageUrl} alt={product.name} width="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price} $</td>
                    <td>{product.description}</td>
                    <td>
                      <button onClick={() => handleDelete(product.id)}>حذف</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">لا توجد منتجات</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
