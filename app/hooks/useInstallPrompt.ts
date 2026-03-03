'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* ── GA4 helper ────────────────────────────────────────────── */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function track(event: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

function getPlatform(): 'ios' | 'android' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  // iOS standalone check
  if ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone) return true;
  // Standard check
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  return false;
}

const DISMISS_KEY = 'pwa-install-dismissed';
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isDismissedRecently(): boolean {
  if (typeof localStorage === 'undefined') return false;
  const ts = localStorage.getItem(DISMISS_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < COOLDOWN_MS;
}

/* ── Eligibility check (safe to run in initializer — only reads) ── */
function shouldShowOnMount(): boolean {
  if (typeof window === 'undefined') return false;
  if (isStandalone() || !isMobile() || isDismissedRecently()) return false;
  // On iOS we show right away (no beforeinstallprompt available)
  return getPlatform() === 'ios';
}

/* ── Hook ──────────────────────────────────────────────────── */
export function useInstallPrompt() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const shownTracked = useRef(false);

  // Compute isIOS and initial modal visibility in state initializer (no effect needed for iOS)
  const [isIOS] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return getPlatform() === 'ios';
  });
  const [showInstallModal, setShowInstallModal] = useState(shouldShowOnMount);

  useEffect(() => {
    // Only Android / Chrome needs event listeners
    if (isStandalone() || !isMobile() || isDismissedRecently() || getPlatform() === 'ios') return;

    // Android / Chrome: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent the mini-infobar
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setShowInstallModal(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install (works even without our modal)
    const installedHandler = () => {
      track('pwa_installed', { platform: getPlatform() });
      setShowInstallModal(false);
      deferredPrompt.current = null;
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  // Track modal shown (once per session)
  useEffect(() => {
    if (showInstallModal && !shownTracked.current) {
      shownTracked.current = true;
      const platform = getPlatform();
      track(isIOS ? 'pwa_install_ios_shown' : 'pwa_install_modal_shown', { platform });
    }
  }, [showInstallModal, isIOS]);

  const promptInstall = useCallback(async () => {
    const platform = getPlatform();
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    await prompt.prompt();
    const { outcome } = await prompt.userChoice;

    if (outcome === 'accepted') {
      track('pwa_install_accepted', { platform });
    } else {
      track('pwa_install_dismissed_native', { platform });
    }

    deferredPrompt.current = null;
    setShowInstallModal(false);
  }, []);

  const dismissInstall = useCallback(() => {
    const platform = getPlatform();
    track('pwa_install_dismissed_modal', { platform });
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShowInstallModal(false);
  }, []);

  return { showInstallModal, isIOS, promptInstall, dismissInstall };
}
