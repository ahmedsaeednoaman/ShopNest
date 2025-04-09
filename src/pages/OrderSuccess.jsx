import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const dispatch = useDispatch();

  // تنظيف السلة عند تحميل الصفحة (لحالة تحديث الصفحة)
  React.useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="order-success">
      <div className="success-card">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <div className="success-content">
          <h1>تم تأكيد طلبك بنجاح!</h1>
          <p className="success-message">
            شكرًا لثقتك بنا. تم استلام طلبك وسنتواصل معك قريبًا لتأكيد التفاصيل.
          </p>
          <p className="order-number">
            رقم الطلب: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          
          <div className="success-actions">
            <Link to="/" className="action-btn home-btn">
              <FaHome /> الصفحة الرئيسية
            </Link>
            <Link to="/products" className="action-btn shop-btn">
              <FaShoppingBag /> مواصلة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;