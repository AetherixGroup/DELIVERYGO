'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft, MapPin, Phone, User, CreditCard, Banknote,
  Smartphone, Truck, Store, CheckCircle, ShoppingBag
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { CheckoutData } from '@/types'

const paymentMethods = [
  { id: 'cash', label: 'Efectivo', icon: <Banknote size={18} />, desc: 'Paga al recibir tu pedido' },
  { id: 'yape', label: 'Yape', icon: <Smartphone size={18} />, desc: 'Pago con Yape' },
  { id: 'plin', label: 'Plin', icon: <Smartphone size={18} />, desc: 'Pago con Plin' },
  { id: 'card', label: 'Tarjeta', icon: <CreditCard size={18} />, desc: 'Próximamente' },
] as const

export default function CheckoutPage() {
  const { state, total, deliveryFee, clearCart } = useCart()
  const [confirmed, setConfirmed] = useState(false)
  const [form, setForm] = useState<CheckoutData>({
    name: '', phone: '', address: '', reference: '',
    deliveryMethod: 'delivery', paymentMethod: 'cash',
  })

  const update = (field: keyof CheckoutData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const canSubmit = form.name && form.phone && (form.deliveryMethod === 'pickup' || form.address)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || state.items.length === 0) return
    setConfirmed(true)
    clearCart()
  }

  if (confirmed) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center', maxWidth: 480 }}>
        <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--brand-glow)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={40} color="var(--brand-primary)" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900 }}>
            ¡Pedido <span style={{ color: 'var(--brand-primary)' }}>confirmado</span>!
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Tu pedido ha sido recibido exitosamente. Te contactaremos por WhatsApp para coordinar la entrega.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tiempo estimado: 30-45 minutos
          </p>
          <Link href="/public" className="btn btn-primary btn-lg" style={{ marginTop: 16 }}>
            <ShoppingBag size={18} /> Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  if (state.items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '3rem', marginBottom: 16 }}>🛒</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>
          Tu carrito está vacío
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Agrega productos para continuar con el checkout.</p>
        <Link href="/public" className="btn btn-primary">← Ir al marketplace</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 0 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/public" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 12 }}>
          <ArrowLeft size={16} /> Volver al marketplace
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase' }}>
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">
          {/* Left column — form */}
          <div>
            {/* Delivery method */}
            <div className="checkout-card">
              <h2 className="checkout-card-title">Método de entrega</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  type="button"
                  className={`payment-method-option${form.deliveryMethod === 'delivery' ? ' selected' : ''}`}
                  onClick={() => update('deliveryMethod', 'delivery')}
                >
                  <Truck size={20} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Delivery</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A domicilio</p>
                  </div>
                </button>
                <button
                  type="button"
                  className={`payment-method-option${form.deliveryMethod === 'pickup' ? ' selected' : ''}`}
                  onClick={() => update('deliveryMethod', 'pickup')}
                >
                  <Store size={20} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Recojo</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>En tienda</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Personal data */}
            <div className="checkout-card">
              <h2 className="checkout-card-title">Datos personales</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--text-secondary)' }}>
                    Nombre completo *
                  </label>
                  <input id="name" className="input" placeholder="Tu nombre" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="phone" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--text-secondary)' }}>
                    Teléfono / WhatsApp *
                  </label>
                  <input id="phone" className="input" placeholder="999 999 999" value={form.phone} onChange={e => update('phone', e.target.value)} required />
                </div>
                {form.deliveryMethod === 'delivery' && (
                  <>
                    <div>
                      <label htmlFor="address" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--text-secondary)' }}>
                        Dirección de entrega *
                      </label>
                      <input id="address" className="input" placeholder="Av. / Calle / Jr." value={form.address} onChange={e => update('address', e.target.value)} required />
                    </div>
                    <div>
                      <label htmlFor="ref" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--text-secondary)' }}>
                        Referencia
                      </label>
                      <input id="ref" className="input" placeholder="Cerca de..." value={form.reference} onChange={e => update('reference', e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-card">
              <h2 className="checkout-card-title">Método de pago</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {paymentMethods.map(pm => (
                  <button
                    key={pm.id}
                    type="button"
                    className={`payment-method-option${form.paymentMethod === pm.id ? ' selected' : ''}`}
                    onClick={() => update('paymentMethod', pm.id)}
                    disabled={pm.id === 'card'}
                    style={pm.id === 'card' ? { opacity: 0.5 } : undefined}
                  >
                    {pm.icon}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{pm.label}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pm.desc}</p>
                    </div>
                    {form.paymentMethod === pm.id && (
                      <CheckCircle size={18} color="var(--brand-primary)" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — summary */}
          <div>
            <div className="checkout-card" style={{ position: 'sticky', top: 80 }}>
              <h2 className="checkout-card-title">Resumen del pedido</h2>

              {state.businessName && (
                <p style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 600, marginBottom: 16 }}>
                  📍 {state.businessName}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                {state.items.map(item => (
                  <div key={item.product.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface-3)', overflow: 'hidden',
                      position: 'relative', flexShrink: 0,
                    }}>
                      <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: 'contain', padding: 4 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>x{item.quantity}</p>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      S/ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider" style={{ marginBottom: 12 }} />

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>S/ {state.subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span>{form.deliveryMethod === 'pickup' ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span style={{ color: 'var(--brand-primary)' }}>
                  S/ {form.deliveryMethod === 'pickup' ? state.subtotal.toFixed(2) : total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
                disabled={!canSubmit}
              >
                <CheckCircle size={18} />
                Confirmar pedido
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
                Al confirmar, recibirás un mensaje de WhatsApp con los detalles de tu pedido.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
