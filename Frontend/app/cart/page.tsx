'use client'

import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/marketplace/CartItem'

export default function CartPage() {
  const { state, increaseQty, decreaseQty, removeItem, clearCart, total, deliveryFee } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'var(--bg-surface-2)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', color: 'var(--text-muted)',
        }}>
          <ShoppingBag size={40} />
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Tu carrito está <span style={{ color: 'var(--brand-primary)' }}>vacío</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
          Agrega productos de tus negocios favoritos para comenzar tu pedido.
        </p>
        <Link href="/public" className="btn btn-primary btn-lg">
          Explorar negocios
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 0 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Link href="/public" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8,
          }}>
            <ArrowLeft size={16} /> Seguir comprando
          </Link>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
          }}>
            Mi <span style={{ color: 'var(--brand-primary)' }}>Pedido</span>
          </h1>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={clearCart}
          style={{ color: 'var(--error)' }}
          aria-label="Vaciar carrito"
        >
          <Trash2 size={14} />
          Vaciar carrito
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 32,
      }} className="cart-page-layout">
        {/* Cart items */}
        <div>
          {state.businessName && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 16px', background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-md)', marginBottom: 16,
              border: '1px solid var(--border-subtle)',
            }}>
              <span style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                📍 {state.businessName}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {state.items.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="checkout-card" style={{ position: 'sticky', top: 80 }}>
            <h2 className="checkout-card-title">Resumen del pedido</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {state.items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span style={{ fontWeight: 600 }}>S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="divider" style={{ marginBottom: 12 }} />

            <div className="cart-summary-row">
              <span>Subtotal ({state.totalItems} productos)</span>
              <span>S/ {state.subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span>S/ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span style={{ color: 'var(--brand-primary)' }}>S/ {total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', justifyContent: 'center' }}
            >
              Ir a checkout
            </Link>

            <Link
              href="/public"
              style={{
                display: 'block', textAlign: 'center', marginTop: 12,
                fontSize: '0.85rem', color: 'var(--text-muted)',
              }}
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
