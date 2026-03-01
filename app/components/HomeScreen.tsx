'use client';

import Image from 'next/image';
import { Lang, ui } from '../data/i18n';

interface HomeScreenProps {
  todayTitle: string;
  todayDay: string;
  onStartDaily: () => void;
  onShowSelection: () => void;
  lang: Lang;
  onToggleLang: () => void;
}

export default function HomeScreen({
  todayTitle,
  todayDay,
  onStartDaily,
  onShowSelection,
  lang,
  onToggleLang,
}: HomeScreenProps) {
  const t = ui[lang].home;

  return (
    <div
      className="screen-enter absolute inset-0 flex flex-col items-center justify-center gap-10 p-8"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      {/* Logo */}
      <Image
        src="/images/logo.jpg"
        alt="Santo Rosário"
        width={120}
        height={120}
        style={{ borderRadius: "50%", objectFit: "cover" }}
        priority
      />

      <h1
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: "2rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "var(--text)",
        }}
      >
        {t.title}
      </h1>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-light)",
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 280,
        }}
      >
        {t.subtitle}
      </p>

      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: 320 }}>
        {/* Primary button: today's mystery */}
        <button
          onClick={onStartDaily}
          className="flex flex-col items-center gap-1 rounded-2xl border-none cursor-pointer transition-transform active:scale-[0.97]"
          style={{
            padding: "1.2rem 1.5rem",
            background: "var(--accent)",
            color: "#FFF",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-crimson), Georgia, serif",
              fontSize: "1.15rem",
              fontWeight: 600,
            }}
          >
            {t.daily}
          </span>
          <span style={{ fontSize: "0.75rem", opacity: 0.75, fontWeight: 300 }}>
            {t.dailySub(todayTitle, todayDay)}
          </span>
        </button>

        {/* Secondary button: full rosary */}
        <button
          onClick={onShowSelection}
          className="flex flex-col items-center gap-1 rounded-2xl cursor-pointer transition-transform active:scale-[0.97]"
          style={{
            padding: "1.2rem 1.5rem",
            background: "var(--bg-dark)",
            color: "var(--text)",
            border: "1px solid rgba(139, 111, 71, 0.12)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-crimson), Georgia, serif",
              fontSize: "1.15rem",
              fontWeight: 600,
            }}
          >
            {t.full}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: 300 }}>
            {t.fullSub}
          </span>
        </button>

        {/* Language toggle */}
        <button
          onClick={onToggleLang}
          className="cursor-pointer"
          style={{
            background: "none",
            border: "none",
            fontSize: "0.8rem",
            color: "var(--text-light)",
            padding: "0.25rem",
            textAlign: "center",
          }}
        >
          🌐 {t.langBtn}
        </button>
      </div>
    </div>
  );
}
