'use client';
import React, { use } from 'react'; // Add 'use' here
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/store'; // Our new cart brain
import { notFound } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Use the React 'use' hook to get the ID from the promise
  const { id } = use(params);
  const addItem = useCart((state) => state.addItem);
  
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-12">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-light tracking-tight">{product.name}</h1>
            <p className="text-2xl text-gray-600">${product.price}.00</p>
          </div>
          
          <p className="text-gray-500 leading-relaxed text-lg">{product.description}</p>

          <button 
            onClick={() => addItem(product)}
            className="w-full md:w-max px-12 py-4 bg-black text-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95"
          >
            <ShoppingBag size={20} />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}