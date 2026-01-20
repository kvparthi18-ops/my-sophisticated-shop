'use client'

import Image from 'next/image'
import { useCart } from '@/lib/store'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCart()

  if (!isOpen) return null

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-md bg-white h-full p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-6">Shopping Bag</h2>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your bag is empty.</p>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm">
                    ${(item.price * item.quantity / 100).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs underline text-gray-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="pt-6 border-t">
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-medium">
                ${(total / 100).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-full text-sm"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

