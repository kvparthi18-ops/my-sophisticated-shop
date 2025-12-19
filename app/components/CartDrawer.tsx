'use client';
import { useCart } from '@/lib/store';
import { X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  // We must extract these from our store inside the function
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  // If the cart isn't open, don't show anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={closeCart} 
      />
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light tracking-tight">Your Bag</h2>
          <button onClick={closeCart} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p className="italic">Your bag is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
                <div className="relative h-24 w-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}.00</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-full px-3 py-1 bg-gray-50">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 hover:text-black">-</button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 hover:text-black">+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total and Link */}
        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between mb-6 text-lg">
            <span className="font-light text-gray-500">Subtotal</span>
            <span className="font-medium">${items.reduce((acc, item) => acc + (item.price * item.quantity), 0)}.00</span>
          </div>
          
          <Link 
            href="/checkout" 
            onClick={closeCart}
            className="w-full py-4 bg-black text-white rounded-full font-medium flex justify-center items-center hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}