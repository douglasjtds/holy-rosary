'use client';

import { Lang, ui } from '../data/i18n';
import DonationBanner from './DonationBanner';
import DevFooter from './DevFooter';

interface CompletionScreenProps {
  onHome: () => void;
  lang: Lang;
}

export default function CompletionScreen({ onHome, lang }: CompletionScreenProps) {
  const t = ui[lang].completion;

  return (
    <div
      className="screen-enter absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      <div style={{ fontSize: "3rem", opacity: 0.6 }}>✝</div>

      <h2
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: "1.8rem",
          fontWeight: 600,
          color: "var(--text)",
        }}
      >
        {t.title}
      </h2>

      <p style={{ fontSize: "0.9rem", color: "var(--text-light)", lineHeight: 1.6, maxWidth: 280 }}>
        {t.quote}
      </p>

      <button
        onClick={onHome}
        className="flex flex-col items-center rounded-2xl border-none cursor-pointer transition-transform active:scale-[0.97]"
        style={{
          padding: "1.2rem 1.5rem",
          background: "var(--accent)",
          color: "#FFF",
          width: "100%",
          maxWidth: 240,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "1.15rem",
            fontWeight: 600,
          }}
        >
          {t.backBtn}
        </span>
      </button>

      {lang === 'pt' && <DonationBanner lang={lang} />}

      <DevFooter lang={lang} />
    </div>
  );
}
