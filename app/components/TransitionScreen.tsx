'use client';

import { MysterySet } from '../data/mysteries';

interface TransitionScreenProps {
  nextSet: MysterySet;
  onContinue: () => void;
  onHome: () => void;
}

export default function TransitionScreen({ nextSet, onContinue, onHome }: TransitionScreenProps) {
  return (
    <div
      className="screen-enter absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--text-light)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Próximo terço
      </div>

      <h2
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: "1.6rem",
          fontWeight: 600,
          color: nextSet.color,
        }}
      >
        {nextSet.title}
      </h2>

      <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{nextSet.days}</div>

      <button
        onClick={onContinue}
        className="flex flex-col items-center rounded-2xl cursor-pointer transition-transform active:scale-[0.97] border-none"
        style={{
          marginTop: "1rem",
          padding: "1rem 2.5rem",
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
          Continuar
        </span>
      </button>

      <button
        onClick={onHome}
        className="cursor-pointer"
        style={{
          fontSize: "0.85rem",
          color: "var(--text-light)",
          background: "none",
          border: "none",
          padding: "0.5rem",
        }}
      >
        Encerrar
      </button>
    </div>
  );
}
