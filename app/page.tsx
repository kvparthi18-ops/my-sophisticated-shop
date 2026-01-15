import ProductCard from '@/components/ProductCard'; 
import OrderTracking from '@/components/OrderTracking';
import WelcomeGreeting from '@/components/WelcomeGreeting'; // Import the new component

const products = [
  {
    id: '1',
    name: 'Signature Vase',
    price: 12000, 
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=2000&auto=format&fit=crop',
    description: 'Hand-crafted ceramic vase with a matte finish.'
  },
  {
    id: '2',
    name: 'Minimalist Studio Chair',
    price: 45000, 
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=2000&auto=format&fit=crop',
    description: 'Ergonomic wooden chair designed for the modern studio.'
  },
  {
    id: '3',
    name: 'Brutalist Lamp',
    price: 8500, 
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=2000&auto=format&fit=crop',
    description: 'Raw concrete texture with warm ambient glow.'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Global Announcement Bar */}
      <div className="bg-black text-white py-3 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] font-black italic">
          Complimentary shipping on all studio orders over $200
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* 2. Hero Header */}
        <header className="mb-24 text-center">
          {/* PERSONALIZED GREETING ADDED HERE */}
          <WelcomeGreeting />
          
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-6">
            Zury Collections
          </h1>
          <div className="h-[1px] w-12 bg-black mx-auto mb-6" />
          <p className="text-gray-400 max-w-sm mx-auto uppercase text-[10px] tracking-[0.4em] leading-relaxed">
            Curated Objects <span className="text-black/20 mx-2">/</span> Timeless Design <span className="text-black/20 mx-2">/</span> Studio Essentials
          </p>
        </header>

        {/* 3. Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 4. Order Tracking Section */}
      <OrderTracking />

      {/* 5. Minimal Footer */}
      <footer className="py-12 border-t border-gray-50 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300">
          © 2026 Zury Studio — All Rights Reserved
        </p>
      </footer>
    </main>
  );
} 
