'use client';

import { useState } from 'react';
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

export default function Home() {
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
