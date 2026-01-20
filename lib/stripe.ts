import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  })

  return products.data.map((product) => {
    const price = product.default_price as Stripe.Price | null

    return {
      id: product.id,
      name: product.name,
      image: product.images?.[0] ?? '',
      price: price?.unit_amount ?? 0,
      currency: price?.currency ?? 'usd',
    }
  })
}

