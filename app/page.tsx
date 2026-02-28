'use client';

import { useEffect, useState } from 'react';
import { dayMap, dayNames, mysterySets } from './data/mysteries';
import HomeScreen from './components/HomeScreen';
import SelectionScreen from './components/SelectionScreen';
import PrayerScreen from './components/PrayerScreen';
import TransitionScreen from './components/TransitionScreen';
import CompletionScreen from './components/CompletionScreen';

type Screen = 'home' | 'selection' | 'prayer' | 'transition' | 'completion';

interface Session {
  setIndex: number;
  startAt: number;
  isFullRosary: boolean;
  fullRosaryOrder: number[];
  fullRosaryStep: number;
}

const todayDow = new Date().getDay();
const todaySetIdx = dayMap[todayDow];

function buildFullRosaryOrder(startIdx: number): number[] {
  return [0, 1, 2, 3].map((i) => (startIdx + i) % 4);
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  // Read saved theme from localStorage only on the client (after hydration)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setIsDark(true);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = isDark ? 'dark' : '';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, themeReady]);

  const [screen, setScreen] = useState<Screen>('home');
  const [session, setSession] = useState<Session>({
    setIndex: todaySetIdx,
    startAt: 0,
    isFullRosary: false,
    fullRosaryOrder: [],
    fullRosaryStep: 0,
  });

  function startDaily() {
    setSession({
      setIndex: todaySetIdx,
      startAt: 0,
      isFullRosary: false,
      fullRosaryOrder: [],
      fullRosaryStep: 0,
    });
    setScreen('prayer');
  }

  function startFull(startIdx: number) {
    const order = buildFullRosaryOrder(startIdx);
    setSession({
      setIndex: order[0],
      startAt: 0,
      isFullRosary: true,
      fullRosaryOrder: order,
      fullRosaryStep: 0,
    });
    setScreen('prayer');
  }

  function handleSetComplete() {
    if (session.isFullRosary && session.fullRosaryStep < 3) {
      const nextStep = session.fullRosaryStep + 1;
      setSession((s) => ({ ...s, fullRosaryStep: nextStep }));
      setScreen('transition');
    } else {
      setScreen('completion');
    }
  }

  function handlePrevSet() {
    if (!session.isFullRosary || session.fullRosaryStep === 0) return;
    const prevStep = session.fullRosaryStep - 1;
    const prevSetIndex = session.fullRosaryOrder[prevStep];
    setSession((s) => ({
      ...s,
      fullRosaryStep: prevStep,
      setIndex: prevSetIndex,
      startAt: 4, // land on mystery 5 of the previous set
    }));
    setScreen('prayer');
  }

  function continueFullRosary() {
    const nextSetIndex = session.fullRosaryOrder[session.fullRosaryStep];
    setSession((s) => ({ ...s, setIndex: nextSetIndex, startAt: 0 }));
    setScreen('prayer');
  }

  function goHome() {
    setScreen('home');
  }

  const todaySet = mysterySets[todaySetIdx];
  const currentSet = mysterySets[session.setIndex];
  const nextSet =
    session.isFullRosary && session.fullRosaryStep < 4
      ? mysterySets[session.fullRosaryOrder[session.fullRosaryStep]]
      : mysterySets[0];

  const canGoPrev = session.isFullRosary && session.fullRosaryStep > 0;

  return (
    <div
      className="relative w-full h-full"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <button
        onClick={() => setIsDark(d => !d)}
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
          right: '0.75rem',
          zIndex: 100,
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
        }}
        aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {screen === 'home' && (
        <HomeScreen
          todayTitle={todaySet.title}
          todayDay={dayNames[todayDow]}
          onStartDaily={startDaily}
          onShowSelection={() => setScreen('selection')}
        />
      )}

      {screen === 'selection' && (
        <SelectionScreen onSelect={startFull} onBack={goHome} />
      )}

      {screen === 'prayer' && (
        <PrayerScreen
          key={`${session.setIndex}-${session.fullRosaryStep}`}
          set={currentSet}
          startAt={session.startAt}
          canGoPrev={canGoPrev}
          onComplete={handleSetComplete}
          onPrevSet={handlePrevSet}
          onHome={goHome}
        />
      )}

      {screen === 'transition' && (
        <TransitionScreen
          nextSet={nextSet}
          onContinue={continueFullRosary}
          onHome={goHome}
        />
      )}

      {screen === 'completion' && <CompletionScreen onHome={goHome} />}
    </div>
  );
}
