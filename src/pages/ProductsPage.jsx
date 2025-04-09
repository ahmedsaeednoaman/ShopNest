import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Loader />;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">منتجاتنا</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsPage;
