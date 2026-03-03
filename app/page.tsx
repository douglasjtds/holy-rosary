'use client';

import { startTransition, useEffect, useState } from 'react';
import { dayMap, dayNames, dayNames_en, mysterySets, mysterySets_en } from './data/mysteries';
import { Lang } from './data/i18n';
import HomeScreen from './components/HomeScreen';
import SelectionScreen from './components/SelectionScreen';
import PrayerScreen from './components/PrayerScreen';
import TransitionScreen from './components/TransitionScreen';
import CompletionScreen from './components/CompletionScreen';
import InstallModal from './components/InstallModal';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useInstallPrompt } from './hooks/useInstallPrompt';

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

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<Lang>('pt');

  // Read preferences from localStorage only after hydration to avoid SSR mismatch
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang');
    startTransition(() => {
      if (theme === 'dark') setIsDark(true);
      if (savedLang === 'en') setLang('en');
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : '';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

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
      startAt: 4,
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

  const toggleTheme = () => setIsDark(d => !d);
  const toggleLang = () => setLang(l => l === 'pt' ? 'en' : 'pt');

  const { showInstallModal, isIOS, promptInstall, dismissInstall } = useInstallPrompt();

  const sets = lang === 'en' ? mysterySets_en : mysterySets;
  const names = lang === 'en' ? dayNames_en : dayNames;

  const todaySet = sets[todaySetIdx];
  const currentSet = sets[session.setIndex];
  const nextSet =
    session.isFullRosary && session.fullRosaryStep < 4
      ? sets[session.fullRosaryOrder[session.fullRosaryStep]]
      : sets[0];

  const canGoPrev = session.isFullRosary && session.fullRosaryStep > 0;

  return (
    <div
      className="relative w-full h-full"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Overlay theme button — hidden on prayer screen (rendered inside its header) */}
      {screen !== 'prayer' && (
        <ThemeToggleButton
          isDark={isDark}
          onToggle={toggleTheme}
          lang={lang}
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
            right: '0.75rem',
            zIndex: 100,
          }}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          todayTitle={todaySet.title}
          todayDay={names[todayDow]}
          onStartDaily={startDaily}
          onShowSelection={() => setScreen('selection')}
          lang={lang}
          onToggleLang={toggleLang}
        />
      )}

      {screen === 'selection' && (
        <SelectionScreen onSelect={startFull} onBack={goHome} lang={lang} sets={sets} />
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
          isDark={isDark}
          onToggleTheme={toggleTheme}
          lang={lang}
        />
      )}

      {screen === 'transition' && (
        <TransitionScreen
          nextSet={nextSet}
          onContinue={continueFullRosary}
          onHome={goHome}
          lang={lang}
        />
      )}

      {screen === 'completion' && <CompletionScreen onHome={goHome} lang={lang} />}

      {screen === 'home' && showInstallModal && (
        <InstallModal
          isIOS={isIOS}
          lang={lang}
          onInstall={promptInstall}
          onDismiss={dismissInstall}
        />
      )}
    </div>
  );
}
