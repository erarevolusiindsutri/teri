import React from 'react';
import { Bot, ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  cartItemCount: number;
}

export default function Header({ onMenuClick, onCartClick, cartItemCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bot className="w-8 h-8 text-primary-500" />
            <h1 className="text-xl font-bold">T.E.R.I Sales</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary-500 text-white text-xs font-medium rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}