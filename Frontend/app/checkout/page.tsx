'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, CreditCard, Banknote, Smartphone, Truck, Store, CheckCircle, ShoppingBag
} from 'lucide-react'
import { useCart, generateCartItemId } from '@/context/CartContext'
import type { CheckoutData } from '@/types'
import { formatPEN, getAssetPath } from '@/lib/utils'

const paymentMethods = [
  { id: 'cash', label: 'Efectivo', icon: <Banknote size={18} />, desc: 'Paga al recibir tu pedido' },
  { id: 'yape', label: 'Yape', icon: <Smartphone size={18} />, desc: 'Pago con Yape (51993186933)' },
  { id: 'plin', label: 'Plin', icon: <Smartphone size={18} />, desc: 'Pago con Plin (51993186933)' },
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

  const finalTotal = form.deliveryMethod === 'pickup' ? state.subtotal : total

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || state.items.length === 0) return

    // Construct WhatsApp message
    let message = `🛒 *NUEVO PEDIDO DELIVERYGOOD*\n\n`
    message += `👤 *Cliente:* ${form.name}\n`
    message += `📱 *Teléfono:* ${form.phone}\n`
    message += `📍 *Método:* ${form.deliveryMethod === 'delivery' ? 'Delivery a domicilio' : 'Recojo en tienda'}\n`
    if (form.deliveryMethod === 'delivery') {
      message += `🏠 *Dirección:* ${form.address}\n`
      if (form.reference) message += `📍 *Ref:* ${form.reference}\n`
    }
    message += `💳 *Pago:* ${form.paymentMethod.toUpperCase()}\n`
    if (state.businessName) message += `🏪 *Negocio:* ${state.businessName}\n`
    message += `\n📋 *DETALLE DEL PEDIDO:*\n`

    state.items.forEach(item => {
      const itemTotal = item.unitPriceWithExtras * item.quantity
      message += `• ${item.product.name} x${item.quantity} - ${formatPEN(itemTotal)}\n`
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        item.selectedOptions.forEach(opt => {
          message += `   └ ${opt.groupName}: ${opt.optionName}\n`
        })
      }
      if (item.observations) {
        message += `   └ Nota: "${item.observations}"\n`
      }
    })

    message += `\n💰 *Subtotal:* ${formatPEN(state.subtotal)}\n`
    if (form.deliveryMethod === 'delivery') {
      message += `🚚 *Delivery:* ${formatPEN(deliveryFee)}\n`
    }
    message += `TOTAL:* ${formatPEN(finalTotal)}\n`

    const waUrl = `https://wa.me/51993186933?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')

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
            Tu pedido ha sido generado exitosamente. Se ha abierto WhatsApp para confirmar el despacho con la tienda.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tiempo estimado de llegada: 30-45 minutos
          </p>
          <Link href="/" className="btn btn-primary btn-lg" style={{ marginTop: 16 }}>
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
        <Link href="/" className="btn btn-primary">← Ir al marketplace</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 0 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 12 }}>
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
                {state.items.map((item, idx) => {
                  const itemKey = generateCartItemId(item.product.id, item.selectedOptions, item.observations)
                  const itemTotal = item.unitPriceWithExtras * item.quantity
                  const imgSrc = getAssetPath(item.product.image)

                  return (
                    <div key={itemKey || idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-surface-3)', overflow: 'hidden',
                        position: 'relative', flexShrink: 0,
                      }}>
                        <Image src={imgSrc} alt={item.product.name} fill style={{ objectFit: 'contain', padding: 4 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                          {item.product.name} <span style={{ color: 'var(--brand-primary)' }}>x{item.quantity}</span>
                        </p>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {item.selectedOptions.map(o => o.optionName).join(', ')}
                          </p>
                        )}
                        {item.observations && (
                          <p style={{ fontSize: '0.7rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                            &quot;{item.observations}&quot;
                          </p>
                        )}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        {formatPEN(itemTotal)}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="divider" style={{ marginBottom: 12 }} />

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPEN(state.subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span>{form.deliveryMethod === 'pickup' ? 'Gratis' : formatPEN(deliveryFee)}</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span style={{ color: 'var(--brand-primary)' }}>
                  {formatPEN(finalTotal)}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
                disabled={!canSubmit}
              >
                <CheckCircle size={18} />
                Confirmar por WhatsApp
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
                Al confirmar, se abrirá WhatsApp con el desglose exacto de tu pedido para el envío.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
