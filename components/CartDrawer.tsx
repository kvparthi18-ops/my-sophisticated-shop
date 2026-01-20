'use client'

import Image from 'next/image'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/store'

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    addItem,
    removeItem,
  } = useCart()

  // ✅ EARLY EXIT
  if (!isOpen) {
    return null
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    try {
      if (!items.length) return

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!res.ok) {
        const msg = await res.text()
        console.error(msg)
        alert('Checkout failed')
        return
      }

      const data = await res.json()
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert('Checkout error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full max-w-md bg-white h-full flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Bag</h2>
          <button onClick={closeCart}>
            <X size={20} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border p-3 rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${(item.price / 100).toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="border p-1 rounded"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="text-sm">{item.quantity}</span>

                  <button
                    onClick={() => addItem(item)}
                    className="border p-1 rounded"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t p-4">
          <div className="flex justify-between mb-3 text-sm font-medium">
            <span>Total</span>
            <span>${(total / 100).toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
