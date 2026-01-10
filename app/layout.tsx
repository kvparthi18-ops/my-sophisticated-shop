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
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {/* The Navbar now contains the SignIn/UserButton logic, 
              so we keep this layout clean and focused on structure.
          */}
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