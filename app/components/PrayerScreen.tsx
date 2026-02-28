'use client';

import { useEffect, useRef, useState } from 'react';
import { MysterySet } from '../data/mysteries';
import ThemeToggleButton from './ThemeToggleButton';

interface PrayerScreenProps {
  set: MysterySet;
  startAt: number;
  canGoPrev: boolean;
  onComplete: () => void;
  onPrevSet: () => void;
  onHome: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type SlideState =
  | { phase: 'idle'; idx: number }
  | { phase: 'animating'; currentIdx: number; nextIdx: number; dir: 'forward' | 'backward' };

export default function PrayerScreen({
  set,
  startAt,
  canGoPrev,
  onComplete,
  onPrevSet,
  onHome,
  isDark,
  onToggleTheme,
}: PrayerScreenProps) {
  const [slideState, setSlideState] = useState<SlideState>({ phase: 'idle', idx: startAt });
  const slideStateRef = useRef(slideState);
  slideStateRef.current = slideState;

  // Touch tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const currentIdx = slideState.phase === 'idle' ? slideState.idx : slideState.currentIdx;

  const navigate = (dir: 'forward' | 'backward') => {
    const state = slideStateRef.current;
    if (state.phase === 'animating') return; // debounce

    const idx = state.idx;

    if (dir === 'forward') {
      if (idx < 4) {
        const nextIdx = idx + 1;
        setSlideState({ phase: 'animating', currentIdx: idx, nextIdx, dir: 'forward' });
        setTimeout(() => setSlideState({ phase: 'idle', idx: nextIdx }), 370);
      } else {
        onComplete();
      }
    } else {
      if (idx > 0) {
        const nextIdx = idx - 1;
        setSlideState({ phase: 'animating', currentIdx: idx, nextIdx, dir: 'backward' });
        setTimeout(() => setSlideState({ phase: 'idle', idx: nextIdx }), 370);
      } else if (canGoPrev) {
        onPrevSet();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        navigate('forward');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate('backward');
      } else if (e.key === 'Escape') {
        onHome();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressPct = ((currentIdx + 1) / 5) * 100;
  const isPrevDisabled = currentIdx === 0 && !canGoPrev;

  const renderSlideContent = (idx: number) => {
    const m = set.mysteries[idx];
    return (
      <>
        <div
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "3.5rem",
            fontWeight: 700,
            color: "var(--accent-light)",
            opacity: 0.35,
            lineHeight: 1,
            marginBottom: "0.75rem",
          }}
        >
          {idx + 1}
        </div>
        <div
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.3,
            marginBottom: "0.6rem",
            textAlign: "center",
          }}
        >
          {m.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "var(--text-light)",
            lineHeight: 1.6,
            maxWidth: 340,
            textAlign: "center",
          }}
        >
          {m.desc}
        </div>
      </>
    );
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif", overflow: "hidden" }}
    >
      {/* Header */}
      <div
        className="relative text-center shrink-0"
        style={{ padding: "1rem 1.25rem 0.75rem", zIndex: 10 }}
      >
        <button
          onClick={onHome}
          className="absolute cursor-pointer"
          style={{
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            color: "var(--text-light)",
            padding: "0.5rem",
            lineHeight: 1,
          }}
        >
          ←
        </button>
        <ThemeToggleButton
          isDark={isDark}
          onToggle={onToggleTheme}
          style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
        />
        <div
          style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: set.color,
          }}
        >
          {set.title}
        </div>
        <div style={{ fontSize: "0.7rem", color: "var(--text-light)", marginTop: "0.15rem", fontWeight: 300 }}>
          {set.days}
        </div>
      </div>

      {/* Progress bar */}
      <div className="shrink-0" style={{ height: 2, background: "var(--bg-dark)" }}>
        <div
          style={{
            height: "100%",
            background: "var(--accent-light)",
            width: `${progressPct}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Slide container */}
      <div
        className="relative flex-1"
        style={{ overflow: "hidden", touchAction: "pan-y" }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          touchStartY.current = e.touches[0].clientY;
          touchMoved.current = false;
        }}
        onTouchMove={() => {
          touchMoved.current = true;
        }}
        onTouchEnd={(e) => {
          if (!touchMoved.current) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          const dy = e.changedTouches[0].clientY - touchStartY.current;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            navigate(dx < 0 ? 'forward' : 'backward');
          }
        }}
        onClick={(e) => {
          // Desktop click navigation
          if (!('ontouchstart' in window)) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            navigate(x > rect.width * 0.35 ? 'forward' : 'backward');
          }
        }}
      >
        {slideState.phase === 'idle' ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ padding: "2rem 1.75rem" }}
          >
            {renderSlideContent(slideState.idx)}
          </div>
        ) : (
          <>
            {/* Exiting slide */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${
                slideState.dir === 'forward' ? 'slide-exit-forward' : 'slide-exit-backward'
              }`}
              style={{ padding: "2rem 1.75rem" }}
            >
              {renderSlideContent(slideState.currentIdx)}
            </div>
            {/* Entering slide */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${
                slideState.dir === 'forward' ? 'slide-enter-forward' : 'slide-enter-backward'
              }`}
              style={{ padding: "2rem 1.75rem" }}
            >
              {renderSlideContent(slideState.nextIdx)}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ gap: "2rem", padding: "1rem 1.5rem 2rem" }}
      >
        <button
          onClick={() => navigate('backward')}
          disabled={isPrevDisabled}
          className="flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-[0.92] disabled:opacity-25 disabled:cursor-default"
          style={{
            width: 48,
            height: 48,
            border: "1.5px solid rgba(139, 111, 71, 0.2)",
            background: "#FFF",
            color: "var(--accent)",
            fontSize: "1.2rem",
          }}
        >
          ‹
        </button>

        {/* Dot indicators */}
        <div className="flex" style={{ gap: 6 }}>
          {set.mysteries.map((_, i) => (
            <div
              key={i}
              style={{
                height: 6,
                borderRadius: i === currentIdx ? 3 : "50%",
                background: "var(--accent-light)",
                opacity: i === currentIdx ? 1 : 0.25,
                width: i === currentIdx ? 20 : 6,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate('forward')}
          className="flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-[0.92]"
          style={{
            width: 48,
            height: 48,
            border: "1.5px solid rgba(139, 111, 71, 0.2)",
            background: "#FFF",
            color: "var(--accent)",
            fontSize: "1.2rem",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
