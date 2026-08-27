import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{
      padding: '120px 0',
      textAlign: 'center',
      maxWidth: 480,
      margin: '0 auto',
    }}>
      <p style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.5rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Página <span style={{ color: 'var(--brand-primary)' }}>no encontrada</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link href="/public" className="btn btn-primary btn-lg">
        Volver al inicio
      </Link>
    </div>
  )
}
