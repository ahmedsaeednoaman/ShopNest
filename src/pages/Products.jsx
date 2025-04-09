import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("خطأ أثناء جلب المنتجات:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>منتجاتنا</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  margin: "10px",
                  width: "250px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
                <p>{product.description}</p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  السعر: {product.price} جنيه
                </p>
              </div>
            ))
          ) : (
            <p>جاري تحميل المنتجات...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
