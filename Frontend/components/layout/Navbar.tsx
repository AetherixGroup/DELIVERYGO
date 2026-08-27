'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, Heart, Menu, X, MapPin, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { products } from '@/lib/data/products'
import type { Product } from '@/types'

export default function Navbar() {
  const { state: cart, toggleCart } = useCart()
  const { count: favCount } = useFavorites()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setShowResults(false)
      return
    }
    const q = query.toLowerCase()
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.businessName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 6)
    setResults(found)
    setShowResults(true)
  }, [query])

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Navegación principal">
        <div className="container navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="DeliveryGood - Inicio">
            <Image
              src="/images/WhatsApp Image 2026-08-04 at 17.30.57.jpeg"
              alt="DeliveryGood"
              width={44}
              height={44}
              style={{ borderRadius: 8, objectFit: 'contain' }}
              priority
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1,
            }}>
              <span style={{ color: 'var(--text-primary)' }}>DELIVERY</span>
              <span style={{ color: 'var(--brand-primary)' }}>GOOD</span>
            </span>
          </Link>

          {/* Location (desktop) */}
          <button
            className="btn btn-ghost"
            style={{ display: 'none', gap: 6, fontSize: '0.8rem' }}
            aria-label="Cambiar ubicación"
            id="location-btn"
          >
            <MapPin size={14} color="var(--brand-primary)" />
            <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
              Santa Clara, Lima
            </span>
            <ChevronDown size={12} />
          </button>

          {/* Search bar (desktop) */}
          <div className="navbar-search" ref={searchRef} style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} className="navbar-search-icon" aria-hidden="true" />
              <input
                type="search"
                className="input"
                placeholder="Busca pizzas, licores, ceviche..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setShowResults(true)}
                style={{ paddingLeft: 40 }}
                aria-label="Buscar productos"
                aria-expanded={showResults}
                role="combobox"
                aria-autocomplete="list"
              />
            </div>

            {/* Search Results Dropdown */}
            {showResults && results.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: 'var(--bg-surface-4)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                zIndex: 200,
                boxShadow: 'var(--shadow-lg)',
              }}>
                {results.map(p => (
                  <Link
                    href={`/businesses/${p.businessSlug}`}
                    key={p.id}
                    onClick={() => { setShowResults(false); setQuery('') }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 16px',
                      transition: 'background var(--transition-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: 8,
                      background: 'var(--bg-surface-3)',
                      position: 'relative',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}>
                      <Image src={p.image} alt={p.name} fill style={{ objectFit: 'contain', padding: 4 }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{p.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {p.businessName} · S/ {p.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Favorites */}
            <button
              className="btn btn-ghost btn-icon"
              aria-label={`Favoritos (${favCount})`}
              style={{ position: 'relative', display: 'flex' }}
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span style={{
                  position: 'absolute', top: 2, right: 2,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--error)', fontSize: '0.6rem',
                  fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {favCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="navbar-cart-btn"
              onClick={toggleCart}
              aria-label={`Abrir carrito, ${cart.totalItems} productos`}
              id="cart-toggle-btn"
            >
              <ShoppingCart size={18} />
              {cart.totalItems > 0 ? (
                <>
                  <span className="cart-count">{cart.totalItems}</span>
                  <span>S/ {cart.subtotal.toFixed(2)}</span>
                </>
              ) : (
                <span>Carrito</span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              style={{ display: 'flex' }}
              id="mobile-menu-btn"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Menú móvil">
        <div className="mobile-menu-header">
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem' }}>
            <span>DELIVERY</span>
            <span style={{ color: 'var(--brand-primary)' }}>GOOD</span>
          </span>
          <button className="btn btn-ghost btn-icon" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <X size={22} />
          </button>
        </div>

        {/* Mobile search */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-medium)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="search"
              className="input"
              placeholder="Busca productos..."
              style={{ paddingLeft: 40 }}
              aria-label="Buscar en móvil"
            />
          </div>
        </div>

        <nav style={{ padding: '16px 0', flex: 1 }}>
          {[
            { href: '/', label: '🏠 Inicio' },
            { href: '/', label: '🍕 Pizzerías' },
            { href: '/', label: '🥃 Licorería' },
            { href: '/', label: '🐟 Cevicherías' },
            { href: '/', label: '🍽️ Restaurantes' },
            { href: '/', label: '❤️ Favoritos' },
            { href: '/checkout', label: '📦 Mis pedidos' },
          ].map(item => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 500,
                borderBottom: '1px solid var(--border-medium)',
                transition: 'background var(--transition-fast)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-medium)' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { toggleCart(); setMobileOpen(false) }}>
            <ShoppingCart size={18} />
            Ver carrito {cart.totalItems > 0 && `(${cart.totalItems})`}
          </button>
        </div>
      </div>
    </>
  )
}
