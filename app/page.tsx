"use client";
import React, { useState } from 'react';

export default function HomePage() {
  const [cart, setCart] = useState<any>({});
  const [selectedSizes, setSelectedSizes] = useState<any>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    { id: 'prod_1', name: "STUDIO WHITE TEE", price: 3500, img: "https://picsum.photos/id/20/800/1000" },
    { id: 'prod_2', name: "STUDIO CHINOS", price: 7500, img: "https://picsum.photos/id/22/800/1000" },
    { id: 'prod_3', name: "STUDIO LINEN SHIRT", price: 5500, img: "https://picsum.photos/id/26/800/1000" },
    { id: 'prod_4', name: "RAW DENIM", price: 12000, img: "https://picsum.photos/id/1/800/1000" },
    { id: 'prod_5', name: "OVERSIZED HOODIE", price: 9000, img: "https://picsum.photos/id/2/800/1000" },
    { id: 'prod_6', name: "STUDIO CAP", price: 3000, img: "https://picsum.photos/id/3/800/1000" }
  ];

  // --- LOGIC & CALCULATIONS ---
  const SHIPPING_THRESHOLD = 20000; // $200 in cents
  
  const totalItems = Object.values(cart).reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
  const subtotal = Object.values(cart).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  const amountToFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const updateQuantity = (p: any, delta: number, explicitSize?: string) => {
    const size = explicitSize || selectedSizes[p.id] || "M";
    const cartKey = `${p.id}-${size}`;

    setCart((prev: any) => {
      const currentQty = prev[cartKey]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0) {
        const { [cartKey]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [cartKey]: { ...p, quantity: newQty, size: size }
      };
    });
  };

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
    <main className="max-w-5xl mx-auto p-6 bg-white min-h-screen text-black font-sans relative">
      
      {/* --- CART DRAWER OVERLAY --- */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* --- CART DRAWER --- */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest italic">Your Bag ({totalItems})</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold uppercase tracking-widest">Close</button>
          </div>

          {/* --- FREE SHIPPING PROGRESS BAR --- */}
          <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-sm">
            <div className="flex justify-between items-center mb-2 text-[9px] font-bold uppercase tracking-widest">
              <span>
                {amountToFreeShipping > 0 
                  ? `Add $${(amountToFreeShipping / 100).toFixed(2)} for free shipping` 
                  : "You've earned free shipping!"}
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-700 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {Object.values(cart).length === 0 ? (
              <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mt-20">Your bag is empty.</p>
            ) : (
              Object.values(cart).map((item: any) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-50 pb-6">
                  <img src={item.img} alt={item.name} className="w-20 h-24 object-cover" />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest">{item.name}</h3>
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Size: {item.size}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex border border-gray-100 rounded-sm">
                        <button onClick={() => updateQuantity(item, -1, item.size)} className="px-2 py-1 text-xs">-</button>
                        <span className="px-3 py-1 text-[10px] font-mono flex items-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item, 1, item.size)} className="px-2 py-1 text-xs">+</button>
                      </div>
                      <span className="text-[10px] font-bold">${(item.price * item.quantity) / 100}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-8 mt-auto">
            <div className="flex justify-between mb-6 text-[10px] font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>${(subtotal / 100).toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={totalItems === 0}
              className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 disabled:bg-gray-100 transition-all"
            >
              Secure Checkout
            </button>
          </div>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center border-b pb-6 mb-8">
        <h1 className="text-xl font-black tracking-tighter italic">STUDIO</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-gray-900"
        >
          Bag — ({totalItems})
        </button>
      </nav>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => {
          const currentSize = selectedSizes[p.id] || "M";
          const cartKey = `${p.id}-${currentSize}`;
          const currentQty = cart[cartKey]?.quantity || 0;

          return (
            <div key={p.id} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>{p.name}</span>
                  <span className="text-gray-400">${p.price / 100}</span>
                </div>

                <div className="flex gap-2 mt-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(p.id, size)}
                      className={`text-[9px] w-7 h-7 border rounded-full transition-all flex items-center justify-center font-bold ${
                        currentSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <button 
                    onClick={() => {
                      updateQuantity(p, 1);
                      setIsCartOpen(true);
                    }}
                    className="w-full border border-black py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    {currentQty > 0 ? `Add More (${currentQty})` : 'Add to Bag'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}