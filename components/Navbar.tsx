'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'

export default function Navbar() {
  const openCart = useCart((s) => s.openCart)
  const items = useCart((s) => s.items)

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/zc_logo.png"
            alt="Zury Collections"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* CART */}
        <button
          onClick={openCart}
          className="relative"
          aria-label="Open cart"
        >
          <ShoppingBag size={20} />

          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full px-1.5">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

