'use client';

interface HomeScreenProps {
  todayTitle: string;
  todayDay: string;
  onStartDaily: () => void;
  onShowSelection: () => void;
}

export default function HomeScreen({
  todayTitle,
  todayDay,
  onStartDaily,
  onShowSelection,
}: HomeScreenProps) {
  return (
    <div
      className="screen-enter absolute inset-0 flex flex-col items-center justify-center gap-10 p-8"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}
    >
      {/* Rosary icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ width: 56, height: 56, opacity: 0.2, color: "var(--accent)" }}
      >
        <circle cx="12" cy="4" r="2.5" />
        <circle cx="12" cy="10" r="1.5" />
        <circle cx="12" cy="15" r="1.5" />
        <circle cx="12" cy="20" r="1.5" />
        <circle cx="7" cy="12.5" r="1.5" />
        <circle cx="17" cy="12.5" r="1.5" />
      </svg>

      <h1
        style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: "2rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "var(--text)",
        }}
      >
        Santo Rosário
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
        Contemple os mistérios com tranquilidade e sem distrações.
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
            Terço do Dia
          </span>
          <span style={{ fontSize: "0.75rem", opacity: 0.75, fontWeight: 300 }}>
            {todayTitle} · {todayDay}
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
            Rosário Completo
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: 300 }}>
            Todos os 20 mistérios
          </span>
        </button>
      </div>
    </div>
  );
}
