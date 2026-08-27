import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import CartDrawer from '@/components/marketplace/CartSummary'

export const metadata: Metadata = {
  title: {
    default: 'DeliveryGood — Marketplace de Delivery',
    template: '%s | DeliveryGood',
  },
  description: 'El marketplace de delivery más rápido. Pizzas, licores, ceviche, restaurantes y más. Entrega a domicilio en Santa Clara y zonas cercanas.',
  keywords: ['delivery', 'pizzas', 'licores', 'ceviche', 'Santa Clara', 'Lima', 'pedidos online'],
  openGraph: {
    title: 'DeliveryGood — Marketplace de Delivery',
    description: 'El marketplace de delivery más rápido de Santa Clara.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <FavoritesProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}
