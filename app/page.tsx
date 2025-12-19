import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="h-[40vh] flex flex-col items-center justify-center text-center px-6">
        <span className="uppercase tracking-[0.3em] text-xs mb-4 text-gray-500">Collection 2025</span>
        <h1 className="text-5xl font-light tracking-tighter text-black">Pure Elegance.</h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 right-6 p-4 bg-white shadow-xl rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-500">${product.price}.00</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}