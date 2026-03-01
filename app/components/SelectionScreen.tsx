'use client';

import { MysterySet } from '../data/mysteries';
import { Lang, ui } from '../data/i18n';

interface SelectionScreenProps {
  onSelect: (setIdx: number) => void;
  onBack: () => void;
  lang: Lang;
  sets: MysterySet[];
}

export default function SelectionScreen({ onSelect, onBack, lang, sets }: SelectionScreenProps) {
  const t = ui[lang].selection;

  return (
    <div
      className="screen-enter absolute inset-0 flex flex-col items-center justify-center gap-6 p-8"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      <h2
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "var(--text)",
        }}
      >
        {t.heading}
      </h2>

      <div className="flex flex-col gap-2 w-full" style={{ maxWidth: 320 }}>
        {sets.map((set, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className="flex items-center gap-3 rounded-2xl cursor-pointer text-left transition-transform active:scale-[0.97]"
            style={{
              padding: "1rem 1.2rem",
              border: "1px solid rgba(139, 111, 71, 0.12)",
              background: "var(--bg-dark)",
            }}
          >
            <span
              className="shrink-0 rounded-full"
              style={{ width: 10, height: 10, background: set.color }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-crimson), Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {set.title}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: "0.1rem" }}>
                {set.days}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="cursor-pointer"
        style={{
          fontSize: "0.85rem",
          color: "var(--text-light)",
          background: "none",
          border: "none",
          marginTop: "0.5rem",
          padding: "0.5rem",
        }}
      >
        {t.back}
      </button>
    </div>
  );
}
