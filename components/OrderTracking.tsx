"use client";
import React, { useState } from 'react';
import { Truck, Search, Package, CheckCircle, AlertCircle } from 'lucide-react';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState(false);

  const handleSearch = () => {
    // Basic logic: if input is empty or too short, show error
    if (orderId.trim().length < 5) {
      setError(true);
      // Auto-hide error after 3 seconds
      setTimeout(() => setError(false), 3000);
    } else {
      setError(false);
      // Future logic: Add your API fetch here
      alert("Order tracking coming soon for " + orderId);
    }
  };

  return (
    <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-3 text-black">
            Track Your Order
          </h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">
            Enter your ZURY order ID below
          </p>
        </div>

        <div className="max-w-md mx-auto relative">
          <div className="relative flex items-center mb-4">
            <input 
              type="text"
              placeholder="ZURY-XXXXX"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value.toUpperCase());
                if (error) setError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-100'} px-6 py-5 rounded-full text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm text-black`}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 p-4 bg-black text-white rounded-full hover:bg-zinc-800 transition-all active:scale-90"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={12} />
              <p className="text-[9px] font-black uppercase tracking-widest">No order found with that ID</p>
            </div>
          )}

          {/* Progress Timeline */}
          <div className={`flex justify-between relative px-4 transition-opacity duration-500 ${error ? 'opacity-20' : 'opacity-100'}`}>
            <div className="absolute top-5 left-10 right-10 h-[1px] bg-gray-200 -z-0" />
            
            {[
              { icon: <Package size={16} />, label: 'Processing' },
              { icon: <Truck size={16} />, label: 'In Transit' },
              { icon: <CheckCircle size={16} />, label: 'Arrival' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-white border border-gray-100 text-gray-300'}`}>
                  {step.icon}
                </div>
                <span className={`text-[8px] uppercase tracking-widest font-black ${i === 0 ? 'text-black' : 'text-gray-300'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}