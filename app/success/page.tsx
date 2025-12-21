// app/success/page.tsx
"use client";
import React from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white text-black">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <svg 
          className="w-8 h-8 text-green-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-black tracking-tighter italic uppercase mb-2">
        Payment Confirmed
      </h1>
      
      <p className="text-gray-500 text-sm max-w-xs mb-8">
        Thank you for your order. We’ve sent a confirmation email to your inbox and started preparing your STUDIO pieces.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link 
          href="/" 
          className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all text-center"
        >
          Continue Shopping
        </Link>
        
        <button 
          onClick={() => window.print()}
          className="border border-gray-200 text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
        >
          Print Receipt
        </button>
      </div>

      <footer className="mt-12 text-[10px] text-gray-400 uppercase tracking-widest">
        STUDIO — Order Support: support@studio.com
      </footer>
    </main>
  );
}