import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { useAuth } from '../context/AuthContext'; // لو عندك Auth
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const { currentUser } = useAuth(); // لو عندك تسجيل دخول
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        userId: currentUser.uid,
        items: items,
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h1>إتمام عملية الشراء</h1>

      <div className="order-summary">
        <h2>ملخص الطلب</h2>
        {items.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name}</span>
            <span>{item.quantity} × {item.price} $</span>
          </div>
        ))}
        <div className="order-total">
          <strong>المجموع:</strong>
          <strong>{items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} $</strong>
        </div>
      </div>

      <div className="checkout-actions">
        <button onClick={() => navigate('/cart')} className="back-btn">العودة للسلة</button>
        <button onClick={handlePlaceOrder} className="confirm-btn">تأكيد الطلب</button>
      </div>
    </div>
  );
};

export default Checkout;
