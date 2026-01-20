'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function toggleWishlistAction(productId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const existing = await db.wishlist.findFirst({
    where: {
      userId,
      productId,
    },
  })

  if (existing) {
    await db.wishlist.delete({
      where: { id: existing.id },
    })
  } else {
    await db.wishlist.create({
      data: {
        userId,
        productId,
      },
    })
  }

  revalidatePath('/')
}

