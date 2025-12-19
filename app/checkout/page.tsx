'use client';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation'; // Add this

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter(); // Initialize router
  
  // We'll use a simple trick to clear the cart: just refresh the page or 
  // you can add a 'clearCart' function to your store.ts
  
  const handlePayment = () => {
    // In a real app, you'd process the payment here
    router.push('/success');
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    // ... inside your return, find the Pay button and change it to:
    <button 
      onClick={handlePayment}
      className="w-full py-5 bg-black text-white rounded-full mt-8 hover:bg-gray-800 transition-colors"
    >
      Pay ${total}.00
    </button>
  );
}