'use client'

import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types'

interface Props {
  item: CartItemType
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity } = item

  return (
    <div className="cart-item animate-fadeIn">
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-surface-3)',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: 6 }}
        />
      </div>

      <div className="cart-item-info" style={{ flex: 1 }}>
        <p className="cart-item-name" style={{ whiteSpace: 'normal' }}>{product.name}</p>
        <p className="cart-item-seller">{product.businessName}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div className="cart-item-controls">
            <button
              className="qty-btn"
              onClick={() => quantity === 1 ? onRemove(product.id) : onDecrease(product.id)}
              aria-label={quantity === 1 ? `Eliminar ${product.name}` : `Disminuir ${product.name}`}
            >
              {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
            </button>
            <span className="qty-display">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onIncrease(product.id)}
              aria-label={`Aumentar ${product.name}`}
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="cart-item-price">
            S/ {(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
