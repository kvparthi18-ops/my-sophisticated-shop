"use client";
import React, { useState } from 'react';

export default function HomePage() {
  const [cart, setCart] = useState<any>({});

  const products = [
    { id: 'prod_1', name: "STUDIO WHITE TEE", price: 3500, img: "https://picsum.photos/id/20/800/1000" },
    { id: 'prod_2', name: "STUDIO CHINOS", price: 7500, img: "https://picsum.photos/id/22/800/1000" },
    { id: 'prod_3', name: "STUDIO LINEN SHIRT", price: 5500, img: "https://picsum.photos/id/26/800/1000" },
    { id: 'prod_4', name: "RAW DENIM", price: 12000, img: "https://picsum.photos/id/1/800/1000" },
    { id: 'prod_5', name: "OVERSIZED HOODIE", price: 9000, img: "https://picsum.photos/id/2/800/1000" },
    { id: 'prod_6', name: "STUDIO CAP", price: 3000, img: "https://picsum.photos/id/3/800/1000" }
  ];

  // Logic to add/remove items
  const updateQuantity = (p: any, delta: number) => {
    setCart((prev: any) => {
      const currentQty = prev[p.id]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0) {
        const { [p.id]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [p.id]: { ...p, quantity: newQty }
      };
    });
  };

  const totalItems = Object.values(cart).reduce((sum: any, item: any) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert("Checkout failed. Check your connection.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white min-h-screen text-black font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center border-b pb-6 mb-8">
        <h1 className="text-xl font-black tracking-tighter italic">STUDIO</h1>
        <button 
          onClick={handleCheckout}
          disabled={totalItems === 0}
          className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest disabled:bg-gray-200 transition-all hover:bg-gray-900"
        >
          Checkout — ({totalItems} Items)
        </button>
      </nav>

      {/* Product Grid - Using 3 columns for better sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => (
          <div key={p.id} className="group">
            {/* Controlled Image Size */}
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-sm">
              <img 
                src={p.img} 
                alt={p.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>{p.name}</span>
                <span className="text-gray-400">${p.price / 100}</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex border border-gray-200 rounded-sm">
                  <button onClick={() => updateQuantity(p, -1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                  <span className="px-3 py-1 text-[10px] font-mono flex items-center">{cart[p.id]?.quantity || 0}</span>
                  <button onClick={() => updateQuantity(p, 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}