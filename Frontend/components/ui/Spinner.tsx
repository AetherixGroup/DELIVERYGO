interface SpinnerProps {
  size?: number
  className?: string
}

export default function Spinner({ size = 24, className = '' }: SpinnerProps) {
  return (
    <div
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Cargando"
    >
      <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle
          cx="12" cy="12" r="10"
          stroke="var(--bg-surface-4)"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="var(--brand-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
