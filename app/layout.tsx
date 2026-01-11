import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zury Collections | Premium E-commerce',
  description: 'Secure and scalable shopping experience.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Explicitly grab the key to ensure it's available during build/prerendering
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in environment variables.");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Navbar />
          
          <main>
            {children}
          </main>
          
          <CartDrawer />
        </body>
      </html>
    </ClerkProvider>
  )
}