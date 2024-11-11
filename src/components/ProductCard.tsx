import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export default function ProductCard({ name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-lg overflow-hidden"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-zinc-100">{name}</h3>
        <p className="text-sm text-zinc-400">${price.toLocaleString()}</p>
        <button 
          onClick={onAddToCart}
          className="mt-3 w-full py-2 px-4 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}