'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Plus, Minus, Trash2, ChevronRight, Utensils } from 'lucide-react'
import { useCart, generateCartItemId } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { formatPEN, getAssetPath } from '@/lib/utils'

export default function CartDrawer() {
  const { state, closeCart, increaseQty, decreaseQty, total, deliveryFee } = useCart()
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const handleImgError = (key: string) => {
    setFailedImages(prev => ({ ...prev, [key]: true }))
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-drawer-overlay${state.isOpen ? ' open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${state.isOpen ? ' open' : ''}`}
        aria-label="Carrito de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} color="var(--brand-primary)" />
            <span className="cart-drawer-title">
              Mi Pedido
              {state.businessName && (
                <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
                  {state.businessName}
                </span>
              )}
            </span>
          </div>
          <button
            className="cart-drawer-close"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {state.items.length === 0 ? (
            <div className="cart-empty animate-fadeIn">
              <div className="cart-empty-icon">
                <ShoppingCart size={36} />
              </div>
              <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Tu carrito está vacío
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Agrega productos de tus negocios favoritos
              </p>
            </div>
          ) : (
            <div>
              {state.items.map((item, i) => {
                const itemKey = generateCartItemId(item.product.id, item.selectedOptions, item.observations)
                const imgSrc = getAssetPath(item.product.image)
                const hasError = failedImages[itemKey]

                return (
                  <div key={itemKey} className="cart-item animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-surface-3)',
                        flexShrink: 0,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {hasError ? (
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
                          <Utensils size={18} />
                        </div>
                      ) : (
                        <Image
                          src={imgSrc}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'contain', padding: 4 }}
                          onError={() => handleImgError(itemKey)}
                        />
                      )}
                    </div>

                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.product.name}</p>
                      <p className="cart-item-seller">{item.product.businessName}</p>

                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '2px 0' }}>
                          {item.selectedOptions.map(o => o.optionName).join(', ')}
                        </p>
                      )}

                      {item.observations && (
                        <p style={{ fontSize: '0.7rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                          &quot;{item.observations}&quot;
                        </p>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                        <div className="cart-item-controls">
                          <button
                            className="qty-btn"
                            onClick={() => decreaseQty(itemKey)}
                            aria-label="Disminuir cantidad"
                          >
                            {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                          </button>
                          <span className="qty-display">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => increaseQty(itemKey)}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="cart-item-price">
                          {formatPEN(item.unitPriceWithExtras * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatPEN(state.subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span>{formatPEN(deliveryFee)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span style={{ color: 'var(--brand-primary)' }}>{formatPEN(total)}</span>
            </div>
            <button
              className="btn btn-primary w-full btn-lg"
              onClick={handleCheckout}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
            >
              Ir a pagar
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
