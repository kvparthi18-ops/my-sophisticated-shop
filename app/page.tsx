"use client";
import React, { useState } from 'react';

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  // REPLACE THIS with your real Stripe link from the dashboard
  const STRIPE_LINK = "https://buy.stripe.com/your_real_link_here";

  const handleCheckout = () => {
    if (cartCount > 0) {
      window.location.href = STRIPE_LINK;
    }
  };

  const products = [
    { id: 1, name: "STUDIO WHITE TEE", price: 35, img: "https://picsum.photos/id/20/800/1000" },
    { id: 2, name: "STUDIO CHINOS", price: 75, img: "https://picsum.photos/id/22/800/1000" },
    { id: 3, name: "STUDIO LINEN SHIRT", price: 55, img: "https://picsum.photos/id/26/800/1000" },
    { id: 4, name: "RAW DENIM", price: 120, img: "https://picsum.photos/id/1/800/1000" },
    { id: 5, name: "OVERSIZED HOODIE", price: 90, img: "https://picsum.photos/id/2/800/1000" },
    { id: 6, name: "STUDIO CAP", price: 30, img: "https://picsum.photos/id/3/800/1000" }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <nav className="flex justify-between items-center p-8 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <h1 className="text-2xl font-black tracking-tighter uppercase">STUDIO</h1>
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-bold tracking-widest uppercase italic text-gray-400">Limited Release</div>
          <div className="text-[10px] font-bold tracking-widest uppercase">BAG ({cartCount})</div>
          {cartCount > 0 && (
            <button 
              onClick={handleCheckout} 
              className="bg-black text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Check Out Now
            </button>
          )}
        </div>
      </nav>

      {/* Hero Text */}
      <div className="p-8 pt-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2">Winter Collection 2025</p>
        <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12">The Essential Wardrobe</h2>
      </div>

      {/* Expanded Product Grid */}
      <section className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map(p => (
          <div key={p.id} className="group flex flex-col cursor-crosshair">
            {/* Quick View Container */}
            <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden relative">
              <img 
                src={p.img} 
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button 
                  onClick={() => setCartCount(c => c + 1)}
                  className="w-full bg-white text-black py-4 text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  Quick Add To Bag +
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest">
              <div className="flex flex-col gap-1">
                <span>{p.name}</span>
                <span className="text-gray-400 font-normal italic">Pre-Order Only</span>
              </div>
              <span>${p.price}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Simple Footer */}
      <footer className="mt-20 p-20 border-t border-gray-100 text-center">
        <p className="text-[10px] tracking-widest text-gray-400">© 2025 STUDIO DESIGN GROUP. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}