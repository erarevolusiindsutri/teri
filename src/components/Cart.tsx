import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { products } from './ProductGrid';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{ id: number; quantity: number }>;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function Cart({ isOpen, onClose, cart, onUpdateQuantity }: CartProps) {
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="font-medium">Shopping Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-zinc-500 py-8">
                    Your cart is empty
                  </div>
                ) : (
                  cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-zinc-400">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-zinc-800">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <span className="font-medium">${total.toLocaleString()}</span>
                  </div>
                  <button className="w-full py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-medium transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}