import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar'; 
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zury Collections | Premium E-commerce',
  description: 'Secure and scalable shopping experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}