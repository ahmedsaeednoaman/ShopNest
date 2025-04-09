import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './MyOrders.css'; // ✅ استدعاء الستايل المحسن

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort orders by created date (newest first)
        fetchedOrders.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('حدث خطأ أثناء جلب الطلبات. يرجى المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>لا توجد طلبات حتى الآن</h2>
        <p>يمكنك البدء بالتسوق وستظهر طلباتك هنا</p>
        <Link to="/" className="home-link">ابدأ التسوق الآن</Link>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <h1>طلباتي</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>طلب رقم: #{order.id.slice(0, 8)}</h3>
            <p><strong>عدد المنتجات:</strong> {order.items?.length || 0}</p>
            <p><strong>الإجمالي:</strong> {order.total?.toFixed(2)} ر.س</p>
            <p><strong>تاريخ الطلب:</strong> {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString('ar-EG') : 'غير متوفر'}</p>
            <p><strong>الحالة:</strong> 
              <span className={`status-${order.status || 'pending'}`}>
                {order.status === 'delivered'
                  ? 'تم التوصيل'
                  : order.status === 'shipped'
                  ? 'قيد الشحن'
                  : 'قيد المعالجة'}
              </span>
            </p>
            <Link 
              to={`/order-details/${order.id}`}
              className="details-link"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
