'use client';

export default function DonationBanner() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 320,
        borderRadius: '1rem',
        border: '1px solid rgba(139,111,71,0.25)',
        background: 'var(--bg-dark)',
        padding: '0.85rem 1.1rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}
    >
      <span
        style={{
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--accent)',
          fontWeight: 600,
        }}
      >
        pelas vítimas da chuva em Minas Gerais
      </span>
      <span
        style={{
          fontFamily: 'var(--font-crimson), Georgia, serif',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3,
        }}
      >
        Ajude Juiz de Fora!
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
        @_projetoserluz
      </span>
      <span
        style={{
          marginTop: '0.25rem',
          fontSize: '0.75rem',
          color: 'var(--text-light)',
          background: 'rgba(139,111,71,0.08)',
          borderRadius: '0.4rem',
          padding: '0.3rem 0.6rem',
          fontFamily: 'monospace',
        }}
      >
        Pix: 42712365/0001-99
      </span>
    </div>
  );
}
