'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag, Utensils } from 'lucide-react'
import type { Product, SelectedOption } from '@/types'
import { useCart } from '@/context/CartContext'
import { formatPEN, getAssetPath } from '@/lib/utils'

interface ProductDetailsProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetails({ product, isOpen, onClose }: ProductDetailsProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [observations, setObservations] = useState('')
  const [selections, setSelections] = useState<Record<string, SelectedOption>>({})
  const [imgError, setImgError] = useState(false)

  if (!isOpen || !product) return null

  const optionGroups = product.optionGroups || []
  const imgSrc = getAssetPath(product.image)

  const extrasCost = Object.values(selections).reduce((sum, opt) => sum + (opt.price || 0), 0)
  const unitPrice = product.price + extrasCost
  const totalPrice = unitPrice * quantity

  const handleOptionChange = (groupId: string, groupName: string, optionId: string, optionName: string, price: number) => {
    setSelections(prev => ({
      ...prev,
      [groupId]: { groupId, groupName, optionId, optionName, price },
    }))
  }

  const missingRequired = optionGroups
    .filter(g => g.required)
    .some(g => !selections[g.id])

  const handleAddToCart = () => {
    if (missingRequired) return

    const selectedOptionsList = Object.values(selections)
    addItem(product, selectedOptionsList, observations.trim(), quantity)

    setQuantity(1)
    setObservations('')
    setSelections({})
    onClose()
  }

  return (
    <div
      className="modal-overlay animate-fadeIn"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="modal-content animate-slideUp"
        style={{
          backgroundColor: 'var(--bg-surface-1, #1e293b)',
          color: 'var(--text-primary, #f8fafc)',
          borderRadius: 'var(--radius-xl, 16px)',
          maxWidth: 540,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          border: '1px solid var(--border-medium, #334155)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div style={{ position: 'relative', width: '100%', height: 220, backgroundColor: 'var(--bg-surface-2, #0f172a)' }}>
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
              <Utensils size={40} />
            </div>
          ) : (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: 16 }}
              onError={() => setImgError(true)}
            />
          )}
          {product.discount && (
            <span
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                backgroundColor: 'var(--error, #ef4444)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '4px 8px',
                borderRadius: 6,
              }}
            >
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: 24 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--brand-primary, #6ee100)', fontWeight: 600 }}>
            {product.businessName}
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 8px' }}>{product.name}</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #cbd5e1)', lineHeight: 1.5, marginBottom: 16 }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-primary, #6ee100)' }}>
              {formatPEN(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--text-muted, #64748b)' }}>
                {formatPEN(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Option Groups */}
          {optionGroups.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              {optionGroups.map(group => (
                <div
                  key={group.id}
                  style={{
                    backgroundColor: 'var(--bg-surface-2, #0f172a)',
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid var(--border-subtle, #334155)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{group.name}</span>
                    {group.required ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                        Obligatorio
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Opcional</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {group.values.map(val => {
                      const isSelected = selections[group.id]?.optionId === val.id
                      return (
                        <label
                          key={val.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            borderRadius: 8,
                            backgroundColor: isSelected ? 'var(--bg-surface-3, #334155)' : 'transparent',
                            border: isSelected
                              ? '1px solid var(--brand-primary, #6ee100)'
                              : '1px solid var(--border-subtle, #1e293b)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onClick={() => handleOptionChange(group.id, group.name, val.id, val.name, val.price)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                border: isSelected
                                  ? '5px solid var(--brand-primary, #6ee100)'
                                  : '2px solid var(--text-muted, #64748b)',
                                backgroundColor: '#000',
                              }}
                            />
                            <span style={{ fontSize: '0.9rem' }}>{val.name}</span>
                          </div>
                          {val.price > 0 && (
                            <span style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                              +{formatPEN(val.price)}
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customer Observations / Notes */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: 6 }}>
              Observaciones o especificaciones (opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Sin cebolla, salsa de ajo aparte, bien helada..."
              value={observations}
              onChange={e => setObservations(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-medium, #334155)',
                backgroundColor: 'var(--bg-surface-2, #0f172a)',
                color: '#fff',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Footer controls: Quantity & Add Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-surface-2, #0f172a)',
                borderRadius: 8,
                border: '1px solid var(--border-medium, #334155)',
                padding: 4,
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{
                  width: 36,
                  height: 36,
                  border: 'none',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minus size={16} />
              </button>
              <span style={{ width: 36, textAlign: 'center', fontWeight: 700 }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                style={{
                  width: 36,
                  height: 36,
                  border: 'none',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              disabled={missingRequired || !product.available}
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: missingRequired || !product.available ? 0.5 : 1,
                cursor: missingRequired || !product.available ? 'not-allowed' : 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShoppingBag size={18} />
                Agregar al pedido
              </span>
              <span>{formatPEN(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
