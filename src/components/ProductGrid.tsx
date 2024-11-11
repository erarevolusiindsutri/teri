import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: 149,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
  }
];

interface ProductGridProps {
  onAddToCart: (productId: number) => void;
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
    >
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          {...product} 
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </motion.div>
  );
}