import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <CartDrawer />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

