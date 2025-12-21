import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const cartItems = await req.json();
    
    // 1. Calculate subtotal in the backend for security
    const subtotal = Object.values(cartItems).reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    const line_items = Object.values(cartItems).map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { 
          name: item.size ? `${item.name} - Size: ${item.size}` : item.name,
          images: item.img ? [item.img] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
    }));

    if (line_items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      
      // 2. Dynamic Shipping Rates
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              // If subtotal >= $200, charge 0. Otherwise, charge $15.
              amount: subtotal >= 20000 ? 0 : 1500, 
              currency: 'usd',
            },
            display_name: subtotal >= 20000 ? 'Free Shipping' : 'Standard Shipping',
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