'use client';

import Image from 'next/image';
import { Lang, ui } from '../data/i18n';

type InstallStrings = (typeof ui)['pt']['install'] | (typeof ui)['en']['install'];

interface InstallModalProps {
  isIOS: boolean;
  lang: Lang;
  onInstall: () => void;
  onDismiss: () => void;
}

export default function InstallModal({
  isIOS,
  lang,
  onInstall,
  onDismiss,
}: InstallModalProps) {
  const t = ui[lang].install;

  return (
    <div
      className="modal-overlay-enter fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 200, background: 'rgba(0, 0, 0, 0.45)' }}
      onClick={onDismiss}
    >
      <div
        className="modal-enter flex flex-col items-center gap-4"
        style={{
          background: 'var(--bg)',
          borderRadius: 16,
          padding: '28px 24px',
          maxWidth: 320,
          width: 'calc(100% - 40px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* App icon */}
        <Image
          src="/images/logo.jpg"
          alt="Santo Rosário"
          width={56}
          height={56}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />

        {isIOS ? <IOSContent t={t} onDismiss={onDismiss} /> : <AndroidContent t={t} onInstall={onInstall} onDismiss={onDismiss} />}
      </div>
    </div>
  );
}

/* ── Android / Chrome: native install prompt ───────────────── */
function AndroidContent({
  t,
  onInstall,
  onDismiss,
}: {
  t: InstallStrings;
  onInstall: () => void;
  onDismiss: () => void;
}) {
  return (
    <>
      <h2
        style={{
          fontFamily: 'var(--font-crimson), Georgia, serif',
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--text)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        {t.title}
      </h2>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-light)',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {t.description}
      </p>

      <div className="flex flex-col gap-2 w-full" style={{ marginTop: 4 }}>
        <button
          onClick={onInstall}
          className="rounded-xl cursor-pointer transition-transform active:scale-[0.97]"
          style={{
            padding: '0.85rem 1.2rem',
            background: 'var(--accent)',
            color: '#FFF',
            border: 'none',
            fontFamily: 'var(--font-crimson), Georgia, serif',
            fontSize: '1.05rem',
            fontWeight: 600,
            width: '100%',
          }}
        >
          {t.installButton}
        </button>
        <button
          onClick={onDismiss}
          className="cursor-pointer"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            fontSize: '0.8rem',
            padding: '0.4rem',
          }}
        >
          {t.dismissButton}
        </button>
      </div>
    </>
  );
}

/* ── iOS: manual instructions ──────────────────────────────── */
function IOSContent({
  t,
  onDismiss,
}: {
  t: InstallStrings;
  onDismiss: () => void;
}) {
  const steps = [
    { icon: <ShareIcon />, text: t.iosStep1 },
    { icon: <PlusSquareIcon />, text: t.iosStep2 },
    { icon: <CheckIcon />, text: t.iosStep3 },
  ];

  return (
    <>
      <h2
        style={{
          fontFamily: 'var(--font-crimson), Georgia, serif',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--text)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        {t.iosTitle}
      </h2>

      <div className="flex flex-col gap-3 w-full" style={{ marginTop: 4 }}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3"
            style={{ fontSize: '0.85rem', color: 'var(--text)' }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'var(--bg-dark)',
                color: 'var(--accent)',
              }}
            >
              {step.icon}
            </span>
            <span style={{ lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--text)' }}>{i + 1}.</strong>{' '}
              {step.text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onDismiss}
        className="rounded-xl cursor-pointer transition-transform active:scale-[0.97] w-full"
        style={{
          padding: '0.85rem 1.2rem',
          background: 'var(--accent)',
          color: '#FFF',
          border: 'none',
          fontFamily: 'var(--font-crimson), Georgia, serif',
          fontSize: '1.05rem',
          fontWeight: 600,
          marginTop: 4,
        }}
      >
        {t.iosButton}
      </button>
    </>
  );
}

/* ── Inline SVG icons (lightweight, no deps) ───────────────── */
function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function PlusSquareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
