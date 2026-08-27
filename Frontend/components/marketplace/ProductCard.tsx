'use client'

import Image from 'next/image'
import { Heart, Plus, Check } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

interface Props {
  product: Product
  showBusiness?: boolean
}

export default function ProductCard({ product, showBusiness = true }: Props) {
  const { addItem, getItemQty } = useCart()
  const { isFavorite, toggle } = useFavorites()
  const qty = getItemQty(product.id)
  const fav = isFavorite(product.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.available) addItem(product)
  }

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image */}
      <div className="product-card-image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: 12 }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

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
          <span className="product-card-price">S/ {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="product-card-price-old">S/ {product.originalPrice.toFixed(2)}</span>
          )}
          {product.ml && (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{product.ml}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className="product-card-add-btn"
          onClick={handleAdd}
          disabled={!product.available}
          aria-label={`Agregar ${product.name} al carrito`}
          style={qty > 0 ? {
            background: 'var(--brand-glow)',
            color: 'var(--brand-primary)',
            borderColor: 'var(--border-brand)',
          } : undefined}
        >
          {!product.available ? (
            'No disponible'
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
  )
}
