import { getStripeProducts } from '@/lib/stripe'
import ProductCard from '@/components/ProductCard'

export default async function Home() {
  const products = await getStripeProducts()

  return (
    <main className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white py-3 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] font-black italic">
          Complimentary shipping on all studio orders over $200
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="h-[1px] w-12 bg-black mx-auto mb-6" />
          <p className="text-gray-400 max-w-sm mx-auto uppercase text-[10px] tracking-[0.4em] leading-relaxed">
            Curated Objects <span className="text-black/20 mx-2">/</span>
            Timeless Design <span className="text-black/20 mx-2">/</span>
            Studio Essentials
          </p>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-50 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300">
          © 2026 Zury Studio — All Rights Reserved
        </p>
      </footer>
    </main>
  )
}

