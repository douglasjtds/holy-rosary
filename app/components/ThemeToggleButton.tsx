'use client';

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="8" y1="1" x2="8" y2="3" />
        <line x1="8" y1="13" x2="8" y2="15" />
        <line x1="1" y1="8" x2="3" y2="8" />
        <line x1="13" y1="8" x2="15" y2="8" />
        <line x1="2.93" y1="2.93" x2="4.34" y2="4.34" />
        <line x1="11.66" y1="11.66" x2="13.07" y2="13.07" />
        <line x1="13.07" y1="2.93" x2="11.66" y2="4.34" />
        <line x1="4.34" y1="11.66" x2="2.93" y2="13.07" />
      </g>
    </svg>
  );
}

interface ThemeToggleButtonProps {
  isDark: boolean;
  onToggle: () => void;
  style?: React.CSSProperties;
}

export default function ThemeToggleButton({ isDark, onToggle, style }: ThemeToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(139,111,71,0.2)',
        background: 'var(--bg-dark)',
        color: 'var(--text-light)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
