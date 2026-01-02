import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
  try {
    // The body contains { items: [...] } from our handleCheckout function
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    
    // 1. Calculate subtotal for shipping logic (values in cents)
    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    // 2. Map frontend items to Stripe line items
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { 
          name: item.name,
          images: item.image ? [item.image] : [], // Matches 'item.image' from your store
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // 3. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              // Threshold: $200.00 (20000 cents)
              amount: subtotal >= 20000 ? 0 : 1500, 
              currency: 'usd',
            },
            display_name: subtotal >= 20000 ? 'Complimentary Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("STRIPE ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}