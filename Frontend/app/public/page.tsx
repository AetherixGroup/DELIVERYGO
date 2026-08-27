'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Zap, ChevronRight, Star, Clock, Truck,
  Pizza, Wine, Fish, UtensilsCrossed, Flame, Coffee
} from 'lucide-react'
import BusinessCard from '@/components/marketplace/BusinessCard'
import ProductCard from '@/components/marketplace/ProductCard'
import { businesses } from '@/lib/data/businesses'
import { products } from '@/lib/data/products'
import { categories } from '@/lib/data/categories'
import type { BusinessCategory } from '@/types'

const categoryIcons: Record<string, React.ReactNode> = {
  all:        <UtensilsCrossed size={22} />,
  pizzeria:   <Pizza size={22} />,
  licoreria:  <Wine size={22} />,
  cevicheria: <Fish size={22} />,
  restaurant: <UtensilsCrossed size={22} />,
  parrilla:   <Flame size={22} />,
  fastfood:   <Zap size={22} />,
  cafeteria:  <Coffee size={22} />,
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredBusinesses = activeCategory === 'all'
    ? businesses
    : businesses.filter(b => b.category === activeCategory as BusinessCategory)

  const featuredProducts = products.filter(p => p.featured).slice(0, 10)
  const offerProducts = products.filter(p => p.isOffer).slice(0, 8)
  const licorProducts = products.filter(p => p.businessId === 'licoreria-preaft').slice(0, 6)

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero DeliveryGood">
        {/* Background */}
        <div className="hero-bg">
          <Image
            src="/images/cevicheria-banner.jpg"
            alt="Comida deliciosa"
            fill
            style={{ objectFit: 'cover', opacity: 0.3 }}
            priority
          />
          <div className="hero-bg-gradient" />
          <div className="hero-glow" aria-hidden="true" />
        </div>

        <div className="container hero-content">
          {/* Badge */}
          <div className="hero-badge animate-fadeIn">
            <Zap size={14} />
            El marketplace de delivery más rápido
          </div>

          {/* Title */}
          <h1 className="hero-title animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Tu comida favorita
            <span className="accent">cuando quieras</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Pizzas, licores, ceviche, parrillas y mucho más.
            Entrega rápida en Santa Clara y zonas cercanas.
          </p>

          {/* CTA */}
          <div className="hero-cta animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => document.getElementById('businesses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Pizza size={18} />
              Ver negocios
            </button>
            <Link href="/businesses/pizzeria-dlu" className="btn btn-brand-outline btn-lg">
              <Zap size={18} />
              Pedir ahora
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            {[
              { number: '4+', label: 'Negocios asociados' },
              { number: '30+', label: 'Productos disponibles' },
              { number: '30min', label: 'Tiempo promedio' },
              { number: '★ 4.7', label: 'Calificación' },
            ].map(s => (
              <div key={s.label}>
                <p className="hero-stat-number">{s.number}</p>
                <p className="hero-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logo watermark */}
        <div style={{
          position: 'absolute', right: '5%', bottom: '10%',
          opacity: 0.12, pointerEvents: 'none', display: 'none',
        }} aria-hidden="true" id="hero-logo-watermark">
          <Image
            src="/images/WhatsApp Image 2026-08-04 at 17.26.49 (1).jpeg"
            alt=""
            width={220}
            height={260}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </section>

      {/* ─── CATEGORIES ──────────────────────────────────────── */}
      <section className="section" aria-label="Categorías">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Qué <span className="accent">buscas?</span></h2>
          </div>

          <div className="category-grid" role="group" aria-label="Filtrar por categoría">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-card${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                aria-label={`Filtrar por ${cat.name}`}
              >
                <div className="category-icon-wrap">
                  {categoryIcons[cat.id] ?? <UtensilsCrossed size={22} />}
                </div>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} opciones</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUSINESSES ──────────────────────────────────────── */}
      <section className="section" id="businesses" aria-label="Negocios disponibles">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Negocios <span className="accent">cerca de ti</span>
            </h2>
            {filteredBusinesses.length > 0 && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'negocio' : 'negocios'}
              </span>
            )}
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="business-grid">
              {filteredBusinesses.map(b => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              background: 'var(--bg-surface-2)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
            }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>🏪</p>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Próximamente</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Estamos trayendo más negocios en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────────────────── */}
      <section className="section" aria-label="Productos destacados">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo más <span className="accent">pedido</span></h2>
          </div>
          <div className="product-grid">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFERS BANNER ───────────────────────────────────── */}
      <section className="section" aria-label="Promociones">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="accent">Ofertas</span> del día
            </h2>
            <span className="badge badge-error" style={{ fontSize: '0.7rem' }}>
              🔥 Limitadas
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {offerProducts.map(p => (
              <div key={p.id} className="offer-card">
                <div className="offer-card-image" style={{ height: 160 }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'contain', padding: 8 }}
                  />
                </div>
                <div className="offer-card-body">
                  <span className="badge badge-error" style={{ fontSize: '0.7rem', alignSelf: 'flex-start' }}>
                    -{p.discount}% OFF
                  </span>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3 }}>{p.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.businessName}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>S/ {p.price.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                        S/ {p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LICORERÍA SPOTLIGHT ─────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)', padding: '48px 0' }} aria-label="Licorería Preaft">
        <div className="container">
          {/* Header with logo */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            marginBottom: 32, padding: '20px 24px',
            background: 'var(--bg-surface-2)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <Image
                src="/images/WhatsApp Image 2026-08-04 at 17.30.57.jpeg"
                alt="Licorería Preaft"
                fill style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem' }}>
                Licorería <span className="accent">Preaft</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Whiskies, rones, pisco, cervezas y más · Delivery express
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="business-open">Abierto</div>
              <Link href="/businesses/licoreria-preaft" className="btn btn-brand-outline btn-sm">
                Ver todo <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="product-grid">
            {licorProducts.map(p => (
              <ProductCard key={p.id} product={p} showBusiness={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────── */}
      <section className="section" aria-label="Publicar tu negocio">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-surface-2) 0%, var(--bg-surface-3) 100%)',
            border: '1px solid var(--border-brand)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(110,225,0,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="badge badge-brand" style={{ marginBottom: 16, display: 'inline-flex' }}>
                <Zap size={12} />
                ¿Tienes un negocio?
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                Únete a <span style={{ color: 'var(--brand-primary)' }}>DeliveryGood</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 28px', fontSize: '1rem' }}>
                Llega a más clientes en tu zona. Registro gratis para restaurantes, licorerías y más.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/51997760161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  💬 Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
