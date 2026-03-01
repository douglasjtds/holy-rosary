'use client';

import { useState } from 'react';
import { Lang, ui } from '../data/i18n';

const PIX_KEY = '42712365/0001-99';

interface DonationBannerProps {
  lang: Lang;
}

export default function DonationBanner({ lang }: DonationBannerProps) {
  const label = ui[lang].donation.label;
  const [copied, setCopied] = useState(false);

  async function copyPix() {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
        {label}
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
      <a
        href="https://www.instagram.com/_projetoserluz?igsh=MXVtbWgwbmN6NmhydA=="
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '0.8rem', color: 'var(--text-light)', textDecoration: 'none' }}
      >
        @_projetoserluz
      </a>
      <div
        style={{
          marginTop: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            background: 'rgba(139,111,71,0.08)',
            borderRadius: '0.4rem',
            padding: '0.3rem 0.6rem',
            fontFamily: 'monospace',
          }}
        >
          Pix: {PIX_KEY}
        </span>
        <button
          onClick={copyPix}
          title="Copiar chave Pix"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            color: copied ? 'var(--accent)' : 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
          }}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <polyline points="2,8 6,12 14,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-dark)" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
