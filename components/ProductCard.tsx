'use client';
import { useCart } from '@/lib/store';
import { useState } from 'react';

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    
    // Brief timeout to show "Added!" state
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="group relative border border-gray-100 p-4 rounded-2xl bg-white hover:shadow-sm transition-shadow">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-light tracking-tight text-gray-900 uppercase">{product.name}</h3>
          {/* FIX: Matches Checkout math. 
            If price is 12000, it shows $120.00
          */}
          <p className="mt-1 text-sm font-medium text-black">
            ${(product.price / 100).toFixed(2)}
          </p>
        </div>
        
        <button 
          onClick={handleAdd}
          disabled={isAdding}
          className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all px-3 py-1 rounded-full border ${
            isAdding 
              ? 'bg-black text-white border-black' 
              : 'bg-transparent text-black border-gray-200 hover:border-black'
          }`}
        >
          {isAdding ? 'Added' : 'Add +'}
        </button>
      </div>
    </div>
  );
}