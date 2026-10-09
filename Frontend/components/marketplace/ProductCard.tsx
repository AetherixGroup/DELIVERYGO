'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Heart, Plus, Check, Settings2, Utensils } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { formatPEN, getAssetPath } from '@/lib/utils'
import ProductDetails from '@/components/marketplace/ProductDetails'

interface Props {
  product: Product
  showBusiness?: boolean
}

export default function ProductCard({ product, showBusiness = true }: Props) {
  const { addItem, getItemQty } = useCart()
  const { isFavorite, toggle } = useFavorites()
  const [showDetails, setShowDetails] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)

  const qty = getItemQty(product.id)
  const fav = isFavorite(product.id)
  const hasOptions = product.optionGroups && product.optionGroups.length > 0
  const imgSrc = getAssetPath(product.image)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.available) return

    if (hasOptions) {
      setShowDetails(true)
    } else {
      addItem(product)
    }
  }

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  const handleOpenDetails = () => {
    setShowDetails(true)
  }

  return (
    <>
      <article
        className="product-card"
        aria-label={product.name}
        onClick={handleOpenDetails}
        style={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <div className="product-card-image" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
          {imgError ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-surface-2)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
              }}
            >
              <Utensils size={24} style={{ marginBottom: 4, opacity: 0.7 }} />
              <span>{product.name}</span>
            </div>
          ) : (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              style={{
                objectFit: 'contain',
                padding: 12,
                transition: 'opacity 0.3s ease',
                opacity: imgLoading ? 0.4 : 1,
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgLoading(false)
                setImgError(true)
              }}
            />
          )}

          {/* Discount badge */}
          {product.discount && (
            <span className="product-card-discount-badge">-{product.discount}%</span>
          )}

          {/* Favorite */}
          <button
            className={`product-card-fav-btn${fav ? ' active' : ''}`}
            onClick={handleFav}
            aria-label={fav ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
            aria-pressed={fav}
          >
            <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Body */}
        <div className="product-card-body">
          {showBusiness && (
            <p className="product-card-seller">{product.businessName}</p>
          )}

          <h3 className="product-card-name">{product.name}</h3>

          {/* Price row */}
          <div className="product-card-price-row">
            <span className="product-card-price">{formatPEN(product.price)}</span>
            {product.originalPrice && (
              <span className="product-card-price-old">{formatPEN(product.originalPrice)}</span>
            )}
            {product.ml && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{product.ml}</span>
            )}
          </div>

          {/* Add to cart / customize */}
          <button
            className="product-card-add-btn"
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`Agregar ${product.name} al carrito`}
            style={
              qty > 0
                ? {
                    background: 'var(--brand-glow)',
                    color: 'var(--brand-primary)',
                    borderColor: 'var(--border-brand)',
                  }
                : undefined
            }
          >
            {!product.available ? (
              'No disponible'
            ) : hasOptions ? (
              <>
                <Settings2 size={14} />
                {qty > 0 ? `Opciones (${qty})` : 'Personalizar'}
              </>
            ) : qty > 0 ? (
              <>
                <Check size={14} />
                En el carrito ({qty})
              </>
            ) : (
              <>
                <Plus size={14} />
                Agregar
              </>
            )}
          </button>
        </div>
      </article>

      {/* Options & Details Modal */}
      <ProductDetails
        product={product}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
}
