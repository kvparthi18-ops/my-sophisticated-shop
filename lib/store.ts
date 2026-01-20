'use client'

import { create } from 'zustand'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  openCart: () => void
  closeCart: () => void
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  isOpen: false,

  // ✅ ADD OR INCREMENT
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 }],
      }
    }),

  // ✅ DECREMENT OR REMOVE
  removeItem: (id) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === id)
      if (!existing) return state

      if (existing.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== id),
        }
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      }
    }),

  openCart: () => set((state) => ({ ...state, isOpen: true })),
  closeCart: () => set((state) => ({ ...state, isOpen: false })),
}))

