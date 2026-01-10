'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function toggleWishlistAction(productId: string) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    // The first query (findFirst) will trigger the Neon wake-up
    const existing = await db.wishlist.findFirst({
      where: { userId, productId }
    })

    if (existing) {
      await db.wishlist.delete({ where: { id: existing.id } })
    } else {
      await db.wishlist.create({ data: { userId, productId } })
    }

    revalidatePath('/')
  } catch (error: any) {
    console.error("Database Error:", error.message)
    // If it's a timeout, tell the user to try one more time
    if (error.message.includes("Can't reach database server")) {
      throw new Error("Database is waking up. Please try again in 5 seconds.")
    }
    throw error
  }
}