'use client';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalInCents = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const displayTotal = (totalInCents / 100).toFixed(2);

  // STRIPE INTEGRATION HANDLER
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect user to Stripe's hosted checkout page
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto pt-32 pb-20 px-6 animate-in fade-in duration-700">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-black hover:opacity-60 transition-all group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-[0.3em] uppercase mb-2">Checkout</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Secure Terminal</p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={40} className="mx-auto mb-4 text-gray-200" />
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">Your bag is currently empty</p>
            <Link href="/" className="inline-block px-12 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Return to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-8 mb-12">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex gap-5 items-center">
                    <div className="relative w-20 h-20 bg-gray-50 overflow-hidden rounded-2xl border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-gray-400 text-[10px] uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-sm font-light text-gray-600">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-8 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total</span>
                <span className="text-3xl font-light tracking-tighter">${displayTotal}</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-6 bg-black text-white rounded-2xl hover:bg-zinc-800 transition-all uppercase tracking-[0.3em] text-[10px] font-black mt-12 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                `Confirm Purchase — $${displayTotal}`
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}