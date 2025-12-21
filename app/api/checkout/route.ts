import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const cartItems = await req.json();
    
    // Map cart items to Stripe format with safety checks
    const line_items = Object.values(cartItems).map((item: any) => {
      if (!item.price || !item.name) {
        throw new Error(`Missing data for item: ${item.name || 'Unknown'}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: { 
            name: item.name,
            // If images fail, Stripe crashes. We wrap it in a check.
            images: item.img ? [item.img] : [],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
      };
    });

    if (line_items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    // THIS IS KEY: Check your VS Code Terminal to see this message
    console.error("STRIPE ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}