'use client'

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'

export default function Header() {
  const { items, openCart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Image
          src="/zc_logo.png"
          alt="Zury Collections"
          width={140}
          height={40}
          priority
        />

        {/* CART ICON */}
        <button
          onClick={openCart}
          className="relative"
        >
          <ShoppingBag size={22} />

          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

