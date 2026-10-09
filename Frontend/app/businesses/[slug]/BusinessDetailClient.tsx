'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Truck, MapPin, Phone, Store } from 'lucide-react'
import ProductCard from '@/components/marketplace/ProductCard'
import { businesses } from '@/lib/data/businesses'
import { products } from '@/lib/data/products'
import { formatPEN, getAssetPath } from '@/lib/utils'

interface BusinessDetailClientProps {
  slug: string
}

export default function BusinessDetailClient({
  slug,
}: BusinessDetailClientProps) {
  const business = businesses.find(b => b.slug === slug)
  const bizProducts = products.filter(p => p.businessSlug === slug)

  const productCategories = ['Todos', ...Array.from(new Set(bizProducts.map(p => p.category)))]
  const [activeCat, setActiveCat] = useState('Todos')
  const [logoError, setLogoError] = useState(!business?.logo)
  const [coverError, setCoverError] = useState(false)

  const filtered = activeCat === 'Todos'
    ? bizProducts
    : bizProducts.filter(p => p.category === activeCat)

  if (!business) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '3rem', marginBottom: 16 }}>🏪</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>
          Negocio no encontrado
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>El negocio que buscas no existe o fue removido.</p>
        <Link href="/" className="btn btn-primary">← Volver al inicio</Link>
      </div>
    )
  }

  const coverSrc = getAssetPath(business.coverImage)
  const logoSrc = getAssetPath(business.logo)

  return (
    <>
      {/* Cover */}
      <div className="business-header">
        <div className="business-cover" style={{ position: 'relative', overflow: 'hidden' }}>
          {coverError ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-surface-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <Store size={48} />
            </div>
          ) : (
            <Image
              src={coverSrc}
              alt={business.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
              onError={() => setCoverError(true)}
            />
          )}
          <div className="business-cover-overlay" />
        </div>

        <div className="container">
          <div className="business-info-bar">
            <div className="business-logo-large" style={{ position: 'relative', overflow: 'hidden' }}>
              {logoError ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--bg-surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-primary)',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                  }}
                >
                  {business.name.substring(0, 2).toUpperCase()}
                </div>
              ) : (
                <Image
                  src={logoSrc}
                  alt={`Logo ${business.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  fontWeight: 900, textTransform: 'uppercase',
                }}>
                  {business.name}
                </h1>
                {business.isOpen ? (
                  <div className="business-open">Abierto</div>
                ) : (
                  <span className="badge badge-neutral">Cerrado</span>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 12 }}>
                {business.tagline}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} color="var(--warning)" fill="var(--warning)" />
                  <strong style={{ color: 'var(--text-primary)' }}>{business.rating}</strong>
                  ({business.reviewCount} reseñas)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={14} /> {business.deliveryTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Truck size={14} /> Delivery {business.deliveryFee === 0 ? 'Gratis' : formatPEN(business.deliveryFee)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={14} /> {business.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="section" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="container">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 700 }}>
            {business.description}
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {business.tags.map(t => (
              <span key={t} className="badge badge-neutral">{t}</span>
            ))}
            <span className="badge badge-brand">
              Mín. {formatPEN(business.minimumOrder)}
            </span>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Nuestro <span className="accent">Menú</span>
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          {/* Tabs */}
          <div className="scroll-x" style={{ marginBottom: 24 }}>
            {productCategories.map(cat => (
              <button
                key={cat}
                className={`btn ${activeCat === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setActiveCat(cat)}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products */}
          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} showBusiness={false} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              background: 'var(--bg-surface-2)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
            }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>🍽️</p>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Sin productos en esta categoría</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Pronto agregaremos más opciones.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'var(--bg-surface-2)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)', padding: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 4 }}>¿Necesitas ayuda con tu pedido?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Contacta directamente con {business.name} ({business.phone})
              </p>
            </div>
            <a
              href={`https://wa.me/51${business.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Phone size={16} /> Llamar / WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
