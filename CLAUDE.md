# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

There are no tests configured in this project.

## Project Purpose

A Holy Rosary (Santo Rosário) prayer guide app in Brazilian Portuguese. It lets users pray either the daily mystery set (chosen automatically by day of the week) or the full rosary (all 20 mysteries across 4 sets).

## Architecture

This is a **Next.js 16 + TypeScript + Tailwind CSS v4** project using the App Router (`app/` directory).

### Current state

The app is in early development. The Next.js scaffold in `app/` is still the default `create-next-app` template — `app/page.tsx` has not been customized yet.

The **actual application logic** lives in `inspiration/rosario.html` — a self-contained single-file HTML prototype (no frameworks) that demonstrates the target UX. This file is the reference implementation to port into Next.js:

- **Screens**: Home, Mystery Selection, Prayer (slide carousel), Set Transition, Completion
- **State machine**: managed via vanilla JS (`currentSetIndex`, `currentMystery`, `isFullRosary`, `fullRosaryOrder`, `fullRosaryStep`)
- **Data**: `mysterySets` array with 4 sets × 5 mysteries each (Gozosos, Luminosos, Dolorosos, Gloriosos)
- **Day mapping**: `dayMap` maps `Date.getDay()` (0=Sun … 6=Sat) to mystery set index
- **Navigation**: prev/next buttons, swipe gestures (touchstart/touchend), keyboard arrows, and click-zone on slide area
- **Animation**: CSS slide transitions (`translateX`) with cloned DOM nodes

### Key design decisions in the prototype

- Mystery sets are color-coded (gold, blue, terracotta, green)
- Typography: Crimson Text (serif, for headings/mystery text) + Inter (sans, for UI)
- Color palette uses CSS custom properties (`--accent`, `--gold`, etc.) with a warm parchment background
- Mobile-first with safe-area insets for notched phones
- No external state management — all state is module-level JS variables
