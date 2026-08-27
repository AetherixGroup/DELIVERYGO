'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Truck, MapPin, Phone, ArrowLeft } from 'lucide-react'
import type { Business } from '@/types'

interface Props {
  business: Business
}

export default function BusinessHeader({ business }: Props) {
  return (
    <div className="business-header">
      {/* Cover */}
      <div className="business-cover">
        <Image
          src={business.coverImage}
          alt={business.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="business-cover-overlay" />
      </div>

      <div className="container">
        <div className="business-info-bar">
          {/* Back button */}
          <Link
            href="/public"
            style={{
              position: 'absolute',
              top: -60,
              left: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              background: 'var(--bg-surface-2)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-medium)',
            }}
            aria-label="Volver al marketplace"
          >
            <ArrowLeft size={16} />
          </Link>

          {/* Logo */}
          <div className="business-logo-large">
            <Image
              src={business.logo}
              alt={`Logo ${business.name}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
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
                <Truck size={14} /> Delivery S/ {business.deliveryFee.toFixed(2)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} /> {business.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
