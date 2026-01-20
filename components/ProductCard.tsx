'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import { toggleWishlistAction } from '@/app/actions/wishlist'
import { useCart } from '@/lib/store'

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem)

  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()

  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleAdd = () => {
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 800)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!isSignedIn) {
      openSignIn()
      return
    }

    startTransition(async () => {
      await toggleWishlistAction(product.id)
      setIsWishlisted((prev) => !prev)
    })
  }

  return (
    <div className="border p-4 rounded-xl">
      <img src={product.image} alt={product.name} />

      <button onClick={handleWishlist}>
        <Heart
          size={16}
          className={isWishlisted ? 'fill-black' : ''}
        />
      </button>

      <h3>{product.name}</h3>
      <p>${(product.price / 100).toFixed(2)}</p>

      <button onClick={handleAdd}>
        {isAdding ? 'Added' : 'Add +'}
      </button>
    </div>
  )
}

