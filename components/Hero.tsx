'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    // Changed to relative to ensure it stays in the document flow
    <section className="relative w-full h-[70vh] bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
          alt="ZC ZuryCollections Campaign"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Content Area - Higher Z-index to stay on top of image */}
      <div className="relative z-10 text-center px-6">
        <span className="text-white text-[10px] uppercase tracking-[0.5em] block mb-4">
          International Edition
        </span>
        
        <h1 className="text-white text-5xl md:text-7xl font-light tracking-tighter mb-8 uppercase">
          Zury <span className="italic font-serif">Collections</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="bg-white text-black px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}