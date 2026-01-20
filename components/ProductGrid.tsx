'use client'

import ProductCard from './ProductCard'

type Product = {
  id: string
  name: string
  image: string
  price: number
  currency: string
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

