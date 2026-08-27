'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: '1.5rem', letterSpacing: '-0.02em',
              }}>
                DELIVERY<span style={{ color: 'var(--brand-primary)' }}>GOOD</span>
              </span>
            </div>
            <p className="footer-desc">
              Tu marketplace de delivery favorito. Pizzas, licores, ceviche y mucho más directo a tu puerta.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href="https://wa.me/51997760161"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand-outline btn-sm"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="footer-col-title">Categorías</h4>
            <div className="footer-links">
              <Link href="/public" className="footer-link">🍕 Pizzerías</Link>
              <Link href="/public" className="footer-link">🥃 Licorería</Link>
              <Link href="/public" className="footer-link">🐟 Cevicherías</Link>
              <Link href="/public" className="footer-link">🔥 Parrillas</Link>
              <Link href="/public" className="footer-link">🍔 Fast Food</Link>
            </div>
          </div>

          {/* Negocios */}
          <div>
            <h4 className="footer-col-title">Negocios</h4>
            <div className="footer-links">
              <Link href="/businesses/pizzeria-dlu" className="footer-link">Pizzería D&apos;Lu</Link>
              <Link href="/businesses/licoreria-preaft" className="footer-link">Licorería Preaft</Link>
              <Link href="/businesses/cevicheria-el-muelle" className="footer-link">Cevichería El Muelle</Link>
              <Link href="/businesses/don-brasa" className="footer-link">Don Brasa</Link>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="footer-col-title">Contacto</h4>
            <div className="footer-links">
              <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={14} /> 997 760 161
              </span>
              <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} /> Santa Clara, Lima
              </span>
              <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} /> info@deliverygood.pe
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} DeliveryGood. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/public" className="footer-link">Términos</Link>
            <Link href="/public" className="footer-link">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
