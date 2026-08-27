'use client'

import { Check, Clock, ChefHat, Truck, PackageCheck } from 'lucide-react'

type OrderStep = 'received' | 'preparing' | 'on_the_way' | 'delivered'

interface Props {
  currentStep: OrderStep
}

const steps: { key: OrderStep; label: string; icon: React.ReactNode }[] = [
  { key: 'received', label: 'Recibido', icon: <Check size={18} /> },
  { key: 'preparing', label: 'Preparando', icon: <ChefHat size={18} /> },
  { key: 'on_the_way', label: 'En camino', icon: <Truck size={18} /> },
  { key: 'delivered', label: 'Entregado', icon: <PackageCheck size={18} /> },
]

export default function OrderStatus({ currentStep }: Props) {
  const currentIndex = steps.findIndex(s => s.key === currentStep)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => {
        const isActive = i <= currentIndex
        const isCurrent = i === currentIndex

        return (
          <div
            key={step.key}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              position: 'relative',
            }}
          >
            {/* Line */}
            {i < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                left: 17,
                top: 38,
                width: 2,
                height: 40,
                background: isActive ? 'var(--brand-primary)' : 'var(--border-medium)',
              }} />
            )}

            {/* Circle */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isActive ? 'var(--brand-primary)' : 'var(--bg-surface-3)',
              color: isActive ? 'var(--text-inverse)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: isCurrent ? '2px solid var(--brand-primary-bright)' : 'none',
              transition: 'all var(--transition-base)',
            }}>
              {step.icon}
            </div>

            {/* Text */}
            <div style={{ paddingBottom: 24 }}>
              <p style={{
                fontWeight: isCurrent ? 700 : 500,
                fontSize: '0.9rem',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              }}>
                {step.label}
              </p>
              {isCurrent && (
                <p style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', marginTop: 2 }}>
                  Estado actual
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
