'use client';

import { useCart } from '@/lib/store';
import { useState, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs'; // Changed useSignIn to useClerk
import { toggleWishlistAction } from '@/app/actions/wishlist';

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isWishlisted, setIsWishlisted] = useState(false); 

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk(); // useClerk provides the openSignIn method

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      // Now this call will match the TypeScript type
      return openSignIn();
    }

    startTransition(async () => {
      try {
        await toggleWishlistAction(product.id);
        setIsWishlisted(!isWishlisted);
      } catch (error) {
        console.error("Failed to update wishlist:", error);
      }
    });
  };

  return (
    <div className="group relative border border-gray-100 p-4 rounded-2xl bg-white hover:shadow-sm transition-shadow">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />

        <button 
          onClick={handleWishlist}
          disabled={isPending}
          className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-all z-10 ${
            isPending ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <Heart 
            size={16} 
            className={`transition-colors ${
              isWishlisted ? "fill-black stroke-black" : "stroke-gray-400"
            } ${isPending ? "animate-pulse" : ""}`}
          />
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-light tracking-tight text-gray-900 uppercase">{product.name}</h3>
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