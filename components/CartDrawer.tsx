'use client';
import { useCart } from '@/lib/store';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0) / 100;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={closeCart} 
      />
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* 1. Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-light tracking-[0.2em] uppercase text-black">Your Bag</h2>
          <button onClick={closeCart} className="hover:rotate-90 transition-transform p-2 text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* 2. Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col h-full">
              {/* Empty Message */}
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                <ShoppingBag size={64} className="text-gray-100" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] font-black text-black">Your bag is empty</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Start your Zury collection today</p>
                </div>
                <button 
                  onClick={closeCart}
                  className="group flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95"
                >
                  Continue Shopping
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Recommendations */}
              <div className="mt-auto border-t border-gray-100 pt-10 pb-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">Studio Essentials</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'v1', name: 'Ceramic Vase', price: 12000 },
                    { id: 'l1', name: 'Studio Lamp', price: 8500 }
                  ].map((prod) => (
                    <div key={prod.id} className="group cursor-pointer" onClick={closeCart}>
                      <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-3">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                           <Plus size={16} />
                        </div>
                      </div>
                      <p className="text-[9px] uppercase font-bold tracking-tight text-black">{prod.name}</p>
                      <p className="text-[10px] text-gray-400 font-light">${(prod.price / 100).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Cart Items */
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="relative h-28 w-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-tight text-gray-900">{item.name}</h3>
                      <p className="text-sm font-light text-gray-500">${(item.price / 100).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 bg-gray-50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-400 hover:text-black">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-400 hover:text-black">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-red-500 underline underline-offset-8">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 pt-8 mt-6">
            <div className="flex justify-between mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Subtotal</span>
              <span className="text-2xl font-light tracking-tighter text-black">${subtotal.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={closeCart}
              className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex justify-center items-center hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}