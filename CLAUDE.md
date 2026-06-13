# CLAUDE.md — Joke Junkie

> This file is read by Claude Code at the start of every session.
> It captures everything non-obvious about this project so Claude can contribute immediately and correctly.

---

## Project Overview

**Joke Junkie** is a Next.js single-page web app that fetches random jokes from a public REST API.
Users can reveal/hide punchlines, cycle to a new joke, and toggle between dark and light themes.
A continuously scrolling marquee footer credits the author.

**Author:** Dhruvil Mistry  
**Repo:** Joke-generator  

---

## Tech Stack

| Technology       | Version    | Notes                                      |
|------------------|------------|--------------------------------------------|
| Next.js          | ^16.1.6    | App Router (`app/` directory)              |
| React            | ^19.0.0    | Concurrent features available              |
| React DOM        | ^19.0.0    |                                            |
| Tailwind CSS     | ^4         | Via `@tailwindcss/postcss`                 |
| PostCSS          | bundled    | `postcss.config.mjs`                       |
| ESLint           | ^9         | `next/core-web-vitals` flat config         |
| Language         | JavaScript | `.js` / `.jsx` only — **no TypeScript**    |

---

## Development Commands

```bash
npm run dev      # Start dev server → http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint (next/core-web-vitals rules)
```

---

## File Structure

```
Joke-Genrater/
├── CLAUDE.md                    # This file
├── package.json
├── next.config.mjs              # Empty Next.js config (no customisation yet)
├── postcss.config.mjs           # Tailwind v4 PostCSS setup
├── eslint.config.mjs            # ESLint flat config (next/core-web-vitals)
├── jsconfig.json                # Path alias: @/* → ./
├── .gitignore
├── public/
│   ├── favJoke.png              # Favicon (referenced in layout.js <head>)
│   └── *.svg                   # Default Next.js SVGs — currently unused
└── app/
    ├── layout.js                # RootLayout: ThemeProvider wrapper + marquee footer
    ├── page.jsx                 # Home page: RandomJokes component (only route)
    ├── globals.css              # Tailwind import + body bg + marquee keyframes
    └── context/
        ├── ThemeContext.jsx     # createContext() export only
        └── ThemeProvider.jsx   # useState theme + handleToggleTheme handler
```

---

## Architecture

### App Router
This project uses the **Next.js App Router** exclusively. All pages live under `app/`.
There is no `pages/` directory — do not create one.

### Client vs Server Components

| File                          | Directive      | Reason                                  |
|-------------------------------|----------------|-----------------------------------------|
| `app/layout.js`               | Server (none)  | Static layout, no hooks                 |
| `app/page.jsx`                | `"use client"` | Uses useState, useEffect, useContext    |
| `app/context/ThemeProvider.jsx` | `"use client"` | Uses useState                         |
| `app/context/ThemeContext.jsx`  | None           | createContext only — safe anywhere     |

**Rule:** Any component that uses React hooks (`useState`, `useEffect`, `useContext`, etc.) or browser event handlers **must** have `"use client"` as its very first line.

### Theme System

Custom React Context — no third-party library.

- **Default theme:** `"dark"`
- **Toggle:** `"dark"` ↔ `"light"` via `handleToggleTheme()`
- **Consume:** `const { theme, handleToggleTheme } = useContext(ThemeContext)`
- **Pattern:** Theme string drives Tailwind class conditionals inline, e.g.:
  ```jsx
  className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50 text-black"}`}
  ```
- Keep all theme state inside `ThemeContext` / `ThemeProvider`. Do not duplicate theme state.

### External API

```
GET https://official-joke-api.appspot.com/random_joke

Response shape:
{
  id:        number,
  type:      string,   // e.g. "general", "programming"
  setup:     string,   // the question / setup line
  punchline: string    // the punchline
}
```

- No API key or authentication required.
- Called on component mount (`useEffect`) and on "Next Joke" button click.
- No `.env` file exists — do not add one unless integrating a new API that requires credentials.

---

## Styling Conventions

- **Tailwind CSS** for all component-level styles via `className` strings.
- **`globals.css`** for: `body` background colour, `@keyframes` animations, reusable utility classes.
- **Inline `style={{}}`** only for one-off structural overrides that Tailwind can't express cleanly.
- **No CSS Modules** — do not introduce them.

### Colour Palette

| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| Page background | `#101828` | Set on `body` in globals.css |
| Accent          | `orange-400` / `orange-500` | Primary buttons, headings |
| Success action  | `green-500` / `green-600`   | "Next Joke" button          |
| Dark card       | `gray-800` / `gray-900`     | Dark theme surfaces          |
| Light card      | `white` / `orange-50`       | Light theme surfaces         |

### Tailwind Version Note
This project uses **Tailwind CSS v4**. The import syntax in `globals.css` is:
```css
@import "tailwindcss";
```
Do **not** revert to the v3 syntax (`@tailwind base`, `@tailwind components`, `@tailwind utilities`).

### Footer Marquee Animation
The infinite scrolling footer is implemented with pure CSS in `globals.css`:
- `.marquee-inner` — flex container, animated with `translateX(0 → -50%)`
- `.marquee-copy` — each repeated name instance with `padding-right: 80px`
- 20 copies of "Dhruvil Mistry ❤️" are rendered in `layout.js` to fill any screen width seamlessly.

---

## Path Alias

`@/*` → `./` (project root)

```js
// Example usage
import { ThemeContext } from "@/app/context/ThemeContext";
```

---

## Commit Convention

This project follows **Conventional Commits** (semantic versioning-friendly messages).

```
<type>: <short imperative description>
```

| Type       | When to use                                          |
|------------|------------------------------------------------------|
| `feat`     | New feature or visible behaviour change              |
| `fix`      | Bug fix                                              |
| `style`    | CSS / styling changes, no logic change               |
| `refactor` | Code restructuring with no behaviour change          |
| `docs`     | Documentation only (CLAUDE.md, README, comments)     |
| `chore`    | Build config, dependencies, tooling                  |
| `perf`     | Performance improvement                              |

**Examples:**
```
feat: add joke category filter dropdown
fix: prevent punchline flash on initial load
style: update footer marquee speed to 10s
refactor: extract JokeCard into separate component
docs: add architecture notes to CLAUDE.md
chore: upgrade Next.js to 16.2.0
```

---

## Constraints & Gotchas

- **No TypeScript** — keep all files as `.js` / `.jsx`. Do not add `.ts` / `.tsx` or a `tsconfig.json`.
- **No testing framework** — no Jest, Vitest, or Cypress is configured. Don't assume tests exist.
- **Unused `Head` import** — `app/layout.js` imports `Head` from `next/head` but doesn't use it (it's not needed in App Router; the `<head>` block is written directly). Don't add more `next/head` usage.
- **Single route** — currently only `/` exists. No dynamic routing or layouts beyond the root.
- **React 19** — do not use deprecated patterns (class components, legacy refs, `UNSAFE_` lifecycle methods).
- **`next.config.mjs` is empty** — no rewrites, redirects, or image domains configured yet.

---

## Do / Don't

| Do                                                         | Don't                                                    |
|------------------------------------------------------------|----------------------------------------------------------|
| Use Tailwind classes for component styles                   | Introduce styled-components, Emotion, or CSS Modules     |
| Add new global animations / base styles in `globals.css`   | Scatter `<style>` tags or complex inline styles in JSX   |
| Mark any hooks-using component with `"use client"`         | Forget `"use client"` — it causes hard-to-debug errors   |
| Keep theme state in ThemeContext / ThemeProvider            | Add a second theme state or use a third-party theme lib  |
| Use semantic commit messages (Conventional Commits)         | Use vague messages like "fix stuff" or "update"          |
| Import with `@/` alias for cross-directory imports          | Use long relative `../../` paths                         |
| Keep new components inside `app/` following App Router rules| Create a `components/` at root without strong reason     |
