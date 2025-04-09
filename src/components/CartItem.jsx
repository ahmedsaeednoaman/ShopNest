// src/components/CartItem.jsx
import React from "react";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>{item.price} $</p>
      </div>
      <div className="quantity-controls">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove-btn">
        حذف
      </button>
    </div>
  );
};

export default CartItem;
