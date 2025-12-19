'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center">
          <div className="bg-green-50 p-6 rounded-full">
            <CheckCircle size={64} className="text-green-500" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-tight">Order Confirmed</h1>
          <p className="text-gray-500 leading-relaxed">
            Thank you for your purchase. We've sent a receipt and tracking details to your email.
          </p>
        </div>

        <Link 
          href="/" 
          className="inline-block w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}