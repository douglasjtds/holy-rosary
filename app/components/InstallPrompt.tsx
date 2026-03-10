'use client';

import { useEffect, useRef, useState } from 'react';
import { Lang, ui } from '../data/i18n';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare function gtag(command: string, eventName: string, params?: object): void;

interface Props {
  lang: Lang;
}

export default function InstallPrompt({ lang }: Props) {
  const t = ui[lang].install;
  const [show, setShow] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const isIOSRef = useRef(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    const dismissed = localStorage.getItem('pwa-prompt-dismissed') === '1';

    if (!isMobile || isStandalone || dismissed) return;

    isIOSRef.current = ios;

    if (!ios) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShow(true);
        try { gtag('event', 'pwa_prompt_shown'); } catch {}
      };
      window.addEventListener('beforeinstallprompt', handler);

      const installedHandler = () => {
        try { gtag('event', 'pwa_installed'); } catch {}
      };
      window.addEventListener('appinstalled', installedHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', handler);
        window.removeEventListener('appinstalled', installedHandler);
      };
    } else {
      // iOS: show banner after short delay
      const timer = setTimeout(() => {
        setShow(true);
        try { gtag('event', 'pwa_prompt_shown'); } catch {}
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleDismiss() {
    localStorage.setItem('pwa-prompt-dismissed', '1');
    setShow(false);
    setShowIOSModal(false);
  }

  async function handleInstall() {
    try { gtag('event', 'pwa_install_clicked'); } catch {}
    if (isIOSRef.current) {
      setShowIOSModal(true);
      try { gtag('event', 'pwa_ios_instructions_shown'); } catch {}
    } else if (deferredPrompt) {
      await deferredPrompt.prompt();
      setDeferredPrompt(null);
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <>
      {/* Banner */}
      <div
        style={{
          position: 'fixed',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)',
          left: '1rem',
          right: '1rem',
          zIndex: 200,
          background: 'var(--bg-dark)',
          border: '1px solid var(--accent)',
          borderRadius: '0.75rem',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 20px var(--shadow)',
          animation: 'screenEnter 0.35s ease forwards',
        }}
      >
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>📿</span>
        <span
          style={{
            flex: 1,
            fontSize: '0.875rem',
            color: 'var(--text)',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {t.banner}
        </span>
        <button
          onClick={handleInstall}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.4rem 0.85rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {t.installBtn}
        </button>
        <button
          onClick={handleDismiss}
          aria-label={t.close}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-light)',
            fontSize: '1.1rem',
            lineHeight: 1,
            padding: '0.25rem',
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div
          onClick={handleDismiss}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--accent)',
              borderRadius: '1rem',
              padding: '1.5rem',
              margin: '0 1rem',
              maxWidth: '360px',
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-crimson), Georgia, serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '1rem',
              }}
            >
              {t.iosTitle}
            </h3>
            <ol
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                color: 'var(--text)',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter), sans-serif',
                marginBottom: '1.25rem',
              }}
            >
              <li>{t.iosStep1}</li>
              <li>{t.iosStep2}</li>
            </ol>
            <button
              onClick={handleDismiss}
              style={{
                width: '100%',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.625rem',
                padding: '0.7rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              {t.okBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
