"use client";
import React, { useState } from 'react';

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { 
      id: 1, 
      name: "STUDIO WHITE TEE", 
      price: 35, 
      img: "https://picsum.photos/id/20/800/1000",
      stripeUrl: "https://buy.stripe.com/8x26oH70Jgkr2DJ6UqbII0a" 
    },
    { 
      id: 2, 
      name: "STUDIO CHINOS", 
      price: 75, 
      img: "https://picsum.photos/id/22/800/1000",
      stripeUrl: "https://buy.stripe.com/00w9ATbgZ4BJdin7YubII09"
    },
    { 
      id: 3, 
      name: "STUDIO LINEN SHIRT", 
      price: 55, 
      img: "https://picsum.photos/id/26/800/1000",
      stripeUrl: "https://buy.stripe.com/aFa6oH3Oxb073HNceKbII08"
    },
    { 
      id: 4, 
      name: "RAW DENIM", 
      price: 120, 
      img: "https://picsum.photos/id/1/800/1000",
      stripeUrl: "https://buy.stripe.com/4gM9AT5WFfgnguzdiObII07"
    },
    { 
      id: 5, 
      name: "OVERSIZED HOODIE", 
      price: 90, 
      img: "https://picsum.photos/id/2/800/1000",
      stripeUrl: "https://buy.stripe.com/9B6aEX98Recja6bbaGbII06"
    },
    { 
      id: 6, 
      name: "STUDIO CAP", 
      price: 30, 
      img: "https://picsum.photos/id/3/800/1000",
      stripeUrl: "https://buy.stripe.com/3cIfZh5WF2tB2DJ2EabII05"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-8 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <h1 className="text-2xl font-black tracking-tighter uppercase">STUDIO</h1>
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase italic text-gray-300">New Collection</div>
      </nav>

      {/* Grid */}
      <section className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-12">
        {products.map(p => (
          <div key={p.id} className="group flex flex-col">
            <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden relative">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              {/* The Checkout Button is now per-product */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <a 
                  href={p.stripeUrl}
                  className="w-full bg-black text-white py-4 text-[9px] font-bold text-center uppercase tracking-[0.2em] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all no-underline"
                >
                  Buy Now — ${p.price}
                </a>
              </div>
            </div>
            
            <div className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest">
              <span>{p.name}</span>
              <span className="text-gray-400">${p.price}</span>
            </div>
          </div>
        ))}
      </section>

      <footer className="mt-20 p-20 text-center opacity-20 text-[8px] tracking-[0.4em]">
        © 2025 STUDIO DESIGN GROUP
      </footer>
    </main>
  );
}