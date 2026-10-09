'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Utensils } from 'lucide-react'
import { getAssetPath } from '@/lib/utils'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
  iconFallback?: React.ReactNode
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  iconFallback,
  className,
  style,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const normalizedSrc = getAssetPath(src, fallbackSrc)

  if (error) {
    return (
      <div
        className={`image-fallback-placeholder ${className || ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--bg-surface-2, #1e293b)',
          color: 'var(--text-muted, #94a3b8)',
          fontSize: '0.85rem',
          padding: '12px',
          textAlign: 'center',
          userSelect: 'none',
          ...style,
        }}
      >
        {iconFallback || <Utensils size={24} style={{ marginBottom: 4, opacity: 0.7 }} />}
        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{alt || 'DeliveryGood'}</span>
      </div>
    )
  }

  return (
    <Image
      {...props}
      src={normalizedSrc}
      alt={alt || 'Imagen de producto'}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  )
}

