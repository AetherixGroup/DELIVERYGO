'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trash2, Plus, Minus, Utensils } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'
import { generateCartItemId } from '@/context/CartContext'
import { formatPEN, getAssetPath } from '@/lib/utils'

interface Props {
  item: CartItemType
  onIncrease: (cartItemId: string) => void
  onDecrease: (cartItemId: string) => void
  onRemove: (cartItemId: string) => void
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity, selectedOptions, observations, unitPriceWithExtras } = item
  const [imgError, setImgError] = useState(false)
  const cartItemId = generateCartItemId(product.id, selectedOptions, observations)
  const itemTotal = unitPriceWithExtras * quantity
  const imgSrc = getAssetPath(product.image)

  return (
    <div className="cart-item animate-fadeIn">
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface-3)',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {imgError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <Utensils size={20} />
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            style={{ objectFit: 'contain', padding: 4 }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="cart-item-info" style={{ flex: 1 }}>
        <p className="cart-item-name" style={{ whiteSpace: 'normal', fontWeight: 700 }}>
          {product.name}
        </p>
        <p className="cart-item-seller" style={{ fontSize: '0.75rem', color: 'var(--brand-primary)' }}>
          {product.businessName}
        </p>

        {/* Selected options */}
        {selectedOptions && selectedOptions.length > 0 && (
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {selectedOptions.map((opt, i) => (
              <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                • {opt.groupName}: <strong>{opt.optionName}</strong>
                {opt.price > 0 && ` (+${formatPEN(opt.price)})`}
              </span>
            ))}
          </div>
        )}

        {/* Observations */}
        {observations && (
          <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: 4 }}>
            Nota: &quot;{observations}&quot;
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div className="cart-item-controls">
            <button
              className="qty-btn"
              onClick={() => (quantity === 1 ? onRemove(cartItemId) : onDecrease(cartItemId))}
              aria-label={quantity === 1 ? `Eliminar ${product.name}` : `Disminuir ${product.name}`}
            >
              {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
            </button>
            <span className="qty-display">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onIncrease(cartItemId)}
              aria-label={`Aumentar ${product.name}`}
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="cart-item-price" style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>
            {formatPEN(itemTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
