# dreamdev0-portfolio

> A modern, scroll-driven personal portfolio for a game programmer & frontend web developer.

A slide-based single-page portfolio built around custom navigation, GSAP-driven transitions and ambient motion. Designed with the [Catppuccin](https://github.com/catppuccin) palette, 14 swappable accent colors, light/dark theming and full EN/ES localization.

![Stack: Vue 3](https://img.shields.io/badge/Vue-3-42b883)
![Stack: Vite 6](https://img.shields.io/badge/Vite-6-646cff)
![Stack: TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![Stack: Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Stack: GSAP](https://img.shields.io/badge/GSAP-3-88ce02)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

---

## Highlights

- **Custom slide navigation** — wheel, touch swipe, keyboard, footer dots and a cooldown system to keep rapid scrolling smooth.
- **GSAP-powered transitions** — every slide cross-fades with parallel `xPercent` and `opacity` timelines, with cancellation to prevent stacking artifacts.
- **Ambient loops** — per-slide in-place animations (drifting orbs, rotating frames, pulsing timeline dots, conic gradient ring) gated by a `useAmbientLoop` composable that respects `prefers-reduced-motion`.
- **Cursor glow** — subtle radial highlight that follows the pointer (desktop only, disabled under reduced motion).
- **14 accent colors** — switchable at runtime through a unified `--accent` CSS token; Tailwind v4 `@theme inline` keeps the whole UI in sync.
- **Mocha & Latte themes** — dark and light variants of the Catppuccin palette with system preference detection.
- **EN / ES** — full i18n via `vue-i18n` v11 with type-checked message schemas.
- **Accessibility first** — focus rings, ARIA labels, `inert` on inactive slides, keyboard navigation and full reduced-motion compliance.

---

## Tech stack

| Layer               | Choice                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| Framework           | **Vue 3** (Composition API + `<script setup>`)                            |
| Bundler             | **Vite 6**                                                                |
| Language            | **TypeScript** (strict)                                                   |
| Styling             | **Tailwind CSS v4** (via `@tailwindcss/vite`) with `@theme inline` tokens |
| Palette             | **`@catppuccin/tailwindcss`** (Mocha + Latte)                             |
| Animation           | **GSAP 3**                                                                |
| State / composables | **`@vueuse/core`**, custom composables                                    |
| i18n                | **`vue-i18n` 11** (type-checked messages)                                 |
| Quality             | **ESLint 9** (flat config)                                                |
| Package manager     | **pnpm** (version pinned in `packageManager`)                             |

---

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

### Scripts

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `pnpm dev`           | Start the dev server                |
| `pnpm build`         | Type-check and build for production |
| `pnpm preview`       | Preview the production build        |
| `pnpm type-check`    | Run `vue-tsc --noEmit`              |
| `pnpm lint`          | Lint with ESLint (auto-fix)         |
| `pnpm lint:check`    | Lint with ESLint (no fix)           |

---

## Project structure

```
src/
├── main.ts                  # App bootstrap, plugin registration, init state
├── App.vue                  # Root component rendering HomeView
├── style.css                # Tailwind + Catppuccin + @theme inline tokens
├── i18n/                    # vue-i18n setup, locales (en, es), schema types
├── data/                    # profile, skills, projects, experience, accents
├── types/                   # TypeScript interfaces
├── composables/             # useTheme, useAccent, useLocale, useNavigation,
│                            # useSlideNavigation, useGsap, useGsapReveal,
│                            # useEntryTimeline, useAmbientLoop, useReducedMotion
├── directives/              # vHoverGsap

├── components/
│   ├── layout/              # AppHeader, AppFooter, SlideStage, CursorGlow
│   ├── ui/                  # TagChip, GradientButton, ThemeToggle,
│   │                        # AccentPicker, LocaleSwitcher, SocialIconLink,
│   │                        # SectionHeading
│   └── slides/              # Hero, About, Skills, Projects, Experience, Contact
└── views/                   # HomeView
public/
├── favicon.svg
├── avatar.png
├── projects/                # Project cover SVGs
└── robots.txt
```

---

## Architecture notes

### Slide navigation

`useSlideNavigation` (`src/composables/useSlideNavigation.ts`) is the single source of truth for the current slide. It exposes an integer `current`, an animated float `index`, a `target` for the next slide, a `progress` value for the footer bar and a `cooldown` flag that prevents rapid-fire transitions from breaking the visual stack.

### Transitions

`SlideStage` (`src/components/layout/SlideStage.vue`) watches `[target, current]`, kills any in-flight timeline and builds a fresh GSAP timeline that cross-fades the outgoing and incoming panels in parallel.

### Ambient motion

`useAmbientLoop` is a tiny composable that wires `watch(activeRef)` to a setup/teardown pair. Every slide uses it to start/stop its looping tweens cleanly when the slide becomes active or inactive.

### Theming

A single `--accent` CSS variable is overridden at runtime by `useAccent`. Tailwind v4's `@theme inline` binds utilities like `bg-accent` to that variable, so the whole UI updates in one place.

---

## Customization

- **Profile data** — `src/data/profile.ts`
- **Projects / skills / experience** — `src/data/projects.ts`, `skills.ts`, `experience.ts`
- **Translations** — `src/i18n/locales/en.json` and `es.json` (type-checked at build time)
- **Default accent** — `src/data/accents.ts` → `DEFAULT_ACCENT`
- **Slide order and content** — `src/views/HomeView.vue`
- **Per-slide ambient animations** — the matching file in `src/components/slides/`

---

## License

[MIT](./LICENSE)
