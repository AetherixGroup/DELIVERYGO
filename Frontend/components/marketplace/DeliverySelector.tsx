'use client'

import { Truck, Store } from 'lucide-react'

interface Props {
  value: 'delivery' | 'pickup'
  onChange: (method: 'delivery' | 'pickup') => void
}

export default function DeliverySelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <button
        type="button"
        className={`payment-method-option${value === 'delivery' ? ' selected' : ''}`}
        onClick={() => onChange('delivery')}
        aria-pressed={value === 'delivery'}
      >
        <Truck size={20} />
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Delivery</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A domicilio</p>
        </div>
      </button>
      <button
        type="button"
        className={`payment-method-option${value === 'pickup' ? ' selected' : ''}`}
        onClick={() => onChange('pickup')}
        aria-pressed={value === 'pickup'}
      >
        <Store size={20} />
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Recojo</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>En tienda</p>
        </div>
      </button>
    </div>
  )
}
