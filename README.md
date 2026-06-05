# dreamdev0-portfolio

A modern, scroll-driven portfolio for a game programmer & frontend web developer. Built with Vue 3, Vite, TypeScript, Tailwind CSS v4, and the Catppuccin Mocha theme.

## Stack

- **Vue 3** + Composition API + `<script setup>`
- **Vite 6** as bundler / dev server
- **TypeScript** strict mode
- **Tailwind CSS v4** (via `@tailwindcss/vite`) with `@theme inline` for the global accent token
- **@catppuccin/tailwindcss** (Mocha flavor + Latte support)
- **@vueuse/core** + **@vueuse/motion** for scroll-spy, progress bar, and declarative animations
- **vue-i18n v11** for EN / ES translations with type-safe message schemas
- **vue-router** for navigation (with a slide-style single-page home and a 404 view)
- **ESLint v9** (flat config) + **Prettier** + **lefthook** + **lint-staged**
- **pnpm** as the package manager (version pinned in `packageManager`)

## Features

- 🖼️ **Slide-based scroll** — each section is a snap-anchored full-viewport slide
- 📊 **Scroll progress bar** (vertical rail + horizontal top bar + active dot indicator)
- 🎨 **14 selectable accents** (Mauve, Blue, Lavender, Peach, etc.) with reactive updates
- 🌗 **Mocha / Latte** theme toggle with system preference detection
- 🌐 **EN / ES** i18n with browser-language detection
- ♿ Accessible focus rings, aria labels, reduced-motion support, keyboard navigation
- 🪄 `v-motion` entrance + stagger animations on every slide

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Scripts

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `pnpm dev`           | Start the dev server                |
| `pnpm build`         | Type-check and build for production |
| `pnpm preview`       | Preview the production build        |
| `pnpm type-check`    | Run `vue-tsc --noEmit`              |
| `pnpm lint`          | Lint with ESLint (auto-fix)         |
| `pnpm format`        | Format with Prettier                |
| `pnpm hooks:install` | Install the lefthook git hooks      |

## Project structure

```
src/
├── main.ts                # App bootstrap, plugin registration, init state
├── App.vue                # RouterView with transition
├── style.css              # Tailwind + Catppuccin + @theme inline accent tokens
├── i18n/                  # vue-i18n setup, locales (en, es), schema types
├── data/                  # profile, skills, projects, experience, accents
├── types/                 # TypeScript interfaces
├── composables/           # useTheme, useAccent, useLocale, useScrollProgress, useActiveSection
├── router/                # Vue Router config
├── components/
│   ├── layout/            # AppHeader, AppFooter, ScrollProgressBar
│   ├── ui/                # TagChip, GradientButton, ThemeToggle, AccentPicker, LocaleSwitcher, SocialIconLink, SectionHeading
│   └── slides/            # Hero, About, Skills, Projects, Experience, Contact
└── views/                 # HomeView, NotFoundView
public/
├── favicon.svg
├── projects/              # Placeholder SVG covers
└── robots.txt
```

## Customization

- **Profile data** — edit `src/data/profile.ts`
- **Projects / skills / experience** — `src/data/projects.ts`, `skills.ts`, `experience.ts`
- **Translations** — `src/i18n/locales/en.json` and `es.json` (type-checked at build time)
- **Default accent** — `src/data/accents.ts` → `DEFAULT_ACCENT`
- **Section order** — `src/views/HomeView.vue` and `src/components/layout/AppHeader.vue`

## License

MIT
