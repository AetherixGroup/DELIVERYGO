'use client'

import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className = '', style, ...props }: SkeletonProps) {
  return (
    <div
      className={`skeleton-pulse ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface-3, #334155)',
        borderRadius: 'var(--radius-md, 8px)',
        animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        opacity: 0.7,
        ...style,
      }}
      {...props}
    />
  )
}

export default Skeleton
