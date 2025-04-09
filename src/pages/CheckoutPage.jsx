// src/pages/CheckoutPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const CheckoutPage = () => {
  const { cart, user, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: new Date(),
        status: "pending",
      });

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>✅ إتمام الطلب</h1>
      <div className="order-summary">
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.name}</span>
            <span>
              {item.quantity} × {item.price} $
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout} className="confirm-btn">
        تأكيد الطلب
      </button>
    </div>
  );
};

export default CheckoutPage;
