import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) || 1 }));
  };

  return (
    <div className="cart-container">
      <h1>سلة المشتريات</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>سلة المشتريات فارغة</p>
          <Link to="/products" className="continue-shopping">متابعة التسوق</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>السعر: {item.price} $</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} min="1" />
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-btn">حذف</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>المجموع: {total.toFixed(2)} $</h3>
            <button onClick={() => dispatch(clearCart())} className="clear-cart">إفراغ السلة</button>
            <Link to="/checkout" className="checkout-btn">إتمام الشراء</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
