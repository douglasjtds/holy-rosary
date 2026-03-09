# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use v22.11.0  # Required — Next.js needs Node >= 20 (default v18 will fail)
npm run dev       # Start development server at http://localhost:3000
npm run build     # Build for production
npm run start     # Serve production build locally
npm run lint      # Run ESLint
```

There are no tests configured in this project.

> If you see `@tailwindcss/oxide` native binding errors after switching Node versions, run `rm -rf node_modules package-lock.json && npm install`.

## Project Purpose

A Holy Rosary (Santo Rosário) prayer guide app supporting Brazilian Portuguese and English. Users can pray the daily mystery set (chosen automatically by day of the week) or the full rosary (all 20 mysteries across 4 sets).

## Architecture

**Next.js 16 + TypeScript + Tailwind CSS v4**, App Router (`app/` directory), single `'use client'` page.

### Key files

- `app/page.tsx` — top-level state machine (`Screen` + `Session` state), renders one screen at a time; also holds `isDark` and `lang` state (both persisted to `localStorage` after hydration to avoid SSR mismatch)
- `app/data/mysteries.ts` — all data: `mysterySets` + `mysterySets_en` (4 sets × 5 mysteries each), `dayMap` (DOW → set index), `dayNames` / `dayNames_en`, TypeScript interfaces
- `app/data/i18n.ts` — `Lang` type (`'pt' | 'en'`) + `ui` object with all UI strings for both languages; components receive a `lang` prop and read strings via `ui[lang].*`
- `app/globals.css` — CSS custom properties for light/dark themes, global resets, `screen-enter` and slide animation keyframes; dark mode activated via `[data-theme="dark"]` on `<html>`
- `app/layout.tsx` — Crimson Text + Inter fonts via `next/font/google`, `lang="pt-BR"`, `viewportFit: cover`
- `app/components/` — one file per screen: `HomeScreen`, `SelectionScreen`, `PrayerScreen`, `TransitionScreen`, `CompletionScreen`; plus `ThemeToggleButton` (moon/sun icon), `DonationBanner`, `DevFooter`
- `inspiration/rosario.html` — original single-file HTML prototype (reference only, not used at runtime)
- `public/manifest.json` — PWA web app manifest (standalone display, icons at 192×192 and 512×512)

### State machine (`app/page.tsx`)

`screen` cycles through: `home → selection → prayer → transition → prayer → … → completion`

`session` tracks: `setIndex`, `startAt` (which mystery to start on), `isFullRosary`, `fullRosaryOrder` (array of 4 set indices starting from the chosen set), `fullRosaryStep` (0–3).

### Styling conventions

- Tailwind utilities for layout (`flex`, `gap`, `rounded`, etc.)
- Inline `style` props for brand colors via CSS vars (`var(--accent)`, `var(--bg)`, etc.)
- Inline `fontFamily` for serif: `"var(--font-crimson), Georgia, serif"`
- Brand CSS vars defined in `globals.css`: `--bg`, `--bg-dark`, `--text`, `--text-light`, `--accent`, `--accent-light`, `--gold`; overridden under `[data-theme="dark"]` (toggled via `document.documentElement.dataset.theme`)
- Each mystery set has its own `color` hex used for titles and accents

### PrayerScreen slide animation

Uses a `SlideState` discriminated union:
- `{ phase: 'idle', idx }` — renders one absolute div
- `{ phase: 'animating', currentIdx, nextIdx, dir }` — renders two absolute divs with CSS animation classes

On navigate: set animating → 370 ms timeout → back to idle. CSS classes: `slide-enter-forward/backward`, `slide-exit-forward/backward` (defined in `globals.css`).

Keyboard handler uses `useEffect` with a bare `navigate` function ref (not in the deps array) to avoid stale closures — the ref is kept current via `slideStateRef.current = slideState`.

Navigation supports: prev/next buttons, swipe gestures (touchstart/touchend with 50 px threshold), keyboard arrows + Space (forward) + Escape (home), and click-zone (right 65% = forward, left 35% = backward) on desktop.
