import React from 'react';
import { X, ShoppingCart, CreditCard, MessageCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50"
          >
            <div className="p-4 flex items-center justify-between border-b border-zinc-800">
              <h2 className="font-medium">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {[
                { icon: MessageCircle, label: 'Chat History' },
                { icon: ShoppingCart, label: 'Cart' },
                { icon: CreditCard, label: 'Orders' },
                { icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-zinc-800 rounded-xl transition-colors text-sm"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}