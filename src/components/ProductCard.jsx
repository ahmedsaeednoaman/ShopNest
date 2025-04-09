import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description.substring(0, 60)}...</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{product.price} ر.س</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              أضف للسلة
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
