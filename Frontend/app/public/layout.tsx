import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Marketplace — Todos los negocios',
  description: 'Explora restaurantes, licorería, cevicherías y más en tu zona. Delivery rápido a domicilio.',
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
