'use client'; // Add this at the top
import './globals.css';
import { Inter } from 'next/font/google';
import CartDrawer from './components/CartDrawer';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store'; // Import the store

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const items = useCart((state) => state.items);
  const openCart = useCart((state) => state.openCart);
  
  // Calculate total quantity of all items combined
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-light tracking-widest uppercase">
              Zury Collections
            </Link>
            
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:opacity-50 transition-opacity">Shop</Link>
              
              {/* Cart Button with Badge */}
              <button 
                onClick={openCart}
                className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ShoppingBag size={20} />
                
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-16">
          {children}
        </div>

        <CartDrawer />
      </body>
    </html>
  );
}