import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Dashboard.css"; // تأكد من وجود ملف CSS لتنسيق الصفحة

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب جميع المنتجات من الـ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // إضافة منتج جديد
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({ title: "", price: "", image: "", description: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // تحديث حالة الحقول عند التغيير
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-content">
          <h1>Welcome to the Dashboard</h1>

          {/* نموذج إضافة منتج جديد */}
          <form onSubmit={handleAddProduct} className="product-form">
            <h2>Add New Product</h2>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Product</button>
          </form>

          {/* عرض قائمة المنتجات */}
          <div className="product-list">
            <h2>Product List</h2>
            <ul>
              {products.map((product) => (
                <li key={product._id} className="product-item">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <img src={product.image} alt={product.title} width="100" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;