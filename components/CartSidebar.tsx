import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar: React.FC = () => {
  const { isOpen, setIsOpen, items, removeFromCart, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white border-l border-pink-100 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-pink-100 bg-pink-50/50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShoppingBag className="text-primary" /> 你的战利品
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-pink-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <ShoppingBag size={48} className="mb-4 opacity-30 text-primary" />
                <p>购物车是空的。</p>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-primary hover:underline font-medium"
                >
                    去寻宝吧！
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-pink-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-pink-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-slate-600 hover:text-primary disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-slate-600 hover:text-primary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-pink-100 p-4 bg-pink-50/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500">小计</span>
                <span className="text-2xl font-bold text-slate-800">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
                结账
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;