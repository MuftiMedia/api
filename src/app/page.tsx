export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        background: 'rgba(255,255,255,0.1)',
        padding: '3rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          ✅ AI Summary API
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
          CORS Enabled - Ready to use!
        </p>
        <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
          Endpoint: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>POST /api/ai-summary</code>
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.9rem'
          }}>
            ✅ CORS Enabled
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.9rem'
          }}>
            ✅ No API Key
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.9rem'
          }}>
            🇮🇩 Indonesian
          </span>
        </div>
      </div>
    </main>
  )
}
