'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Business } from '@/types'
import { Star, Clock, Truck, ChevronRight, Store } from 'lucide-react'
import { formatPEN, getAssetPath } from '@/lib/utils'

interface Props {
  business: Business
}

export default function BusinessCard({ business }: Props) {
  const [logoError, setLogoError] = useState(false)
  const [coverError, setCoverError] = useState(false)

  const coverSrc = getAssetPath(business.coverImage)
  const logoSrc = getAssetPath(business.logo)

  return (
    <Link href={`/businesses/${business.slug}`} className="business-card" aria-label={`Ver ${business.name}`}>
      {/* Cover */}
      <div className="business-card-cover" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
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
            <Store size={32} />
          </div>
        ) : (
          <Image
            src={coverSrc}
            alt={`${business.name} - portada`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setCoverError(true)}
          />
        )}
        <div className="business-card-cover-gradient" />

        {/* Logo */}
        <div className="business-card-logo-wrap" style={{ position: 'absolute', overflow: 'hidden' }}>
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
                fontWeight: 800,
                fontSize: '0.9rem',
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

        {/* Featured badge */}
        {business.featured && (
          <span
            className="badge badge-brand"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize: '0.65rem',
            }}
          >
            ⚡ Destacado
          </span>
        )}
      </div>

      {/* Body */}
      <div className="business-card-body">
        {/* Open/Closed */}
        {business.isOpen ? (
          <div className="business-open">Abierto ahora</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block' }} />
            Cerrado
          </div>
        )}

        <h3 className="business-card-name">{business.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.4 }}>
          {business.tagline}
        </p>

        {/* Meta */}
        <div className="business-card-meta">
          <span className="business-card-meta-item">
            <Star size={12} color="var(--warning)" fill="var(--warning)" />
            <strong style={{ color: 'var(--text-primary)' }}>{business.rating}</strong>
            <span>({business.reviewCount})</span>
          </span>
          <span className="business-card-meta-item">
            <Clock size={12} />
            {business.deliveryTime}
          </span>
          <span className="business-card-meta-item">
            <Truck size={12} />
            {business.deliveryFee === 0 ? (
              <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Gratis</span>
            ) : (
              formatPEN(business.deliveryFee)
            )}
          </span>
        </div>

        {/* Tags */}
        <div className="business-card-tags">
          {business.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge badge-neutral">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
            borderTop: '1px solid var(--border-medium)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Mín. {formatPEN(business.minimumOrder)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.8rem' }}>
            Ver tienda <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
