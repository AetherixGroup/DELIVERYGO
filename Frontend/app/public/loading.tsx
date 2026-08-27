import Spinner from '@/components/ui/Spinner'

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: 16,
    }}>
      <Spinner size={40} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cargando...</p>
    </div>
  )
}
