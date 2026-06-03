# Portfolio 3.0

Michael Johnson's personal portfolio — a terminal-themed React SPA deployed on GitHub Pages.

## Tech Stack

| Layer | Libraries / Tools |
|---|---|
| UI framework | React 18, MUI v6 (Material UI) |
| Routing | React Router v6 |
| SEO / meta | react-helmet-async |
| Styling | MUI `sx` prop, CSS custom properties |
| PDF viewer | @react-pdf-viewer/core |
| Forms | Formspree (unauthenticated POST) |
| CI/CD | GitHub Actions → GitHub Pages |

## Pages and Routes

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Terminal hero section with interactive CLI |
| `/about` | `AboutMe` | Bio and background |
| `/work` | `Work` | Project showcase with live GitHub activity panel |
| `/contact` | `Contact` | Terminal-styled contact form |
| `/resume` | `Resume` | Inline PDF resume viewer |

## Features

### Terminal Hero (`client/src/components/TerminalHero/`)

An interactive mini-CLI on the landing page. Available commands:

| Command | Effect |
|---|---|
| `help` | Lists all commands |
| `whoami` | Prints name and title |
| `about` | Summary + navigates to `/about` |
| `projects` | Lists recent work + navigates to `/work` |
| `contact` | Prints contact links + navigates to `/contact` |
| `clear` | Clears terminal history |

Supports Tab autocomplete, arrow-key command history, and respects `prefers-reduced-motion`.

### GitHub Activity Panel (`client/src/components/GitHubActivity/`)

Displays the six most recently updated public repos for the GitHub username configured in `client/src/config/site.js`. Data is fetched from the unauthenticated GitHub REST API (rate limit: 60 requests/hr per IP). Responses are cached in `sessionStorage` under the key `gh_repos` to avoid redundant requests within a browser session.

### Contact Form (`client/src/components/ContactForm/`)

Terminal-styled form backed by Formspree. Submits `name`, `email`, and `message` fields as JSON. Includes inline validation, a submitting state, and retry/quit actions on network error.

### SEO + Open Graph (`client/src/components/Seo/`)

Reusable `<Seo>` component wrapping `react-helmet-async`. Every page sets `<title>`, `meta description`, canonical URL, and Open Graph / Twitter card tags. Configuration lives in `client/src/config/site.js`.

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
cd client
npm install
```

### Environment / configuration

All site-wide values are in **`client/src/config/site.js`** — no `.env` file is required. Edit that file directly:

```js
// Formspree — create a form at https://formspree.io, then paste the form ID here.
export const FORMSPREE_ID = "YOUR_FORMSPREE_ID";   // e.g. "xayzwabc"

// GitHub username — controls the activity panel on the Work page.
export const GITHUB_USERNAME = "mikegoat1";

// Deployed URL — used for canonical links and OG meta.
export const SITE_URL = "https://mikegoat1.github.io/Portfolio3.0";
```

### OG image

The Open Graph image must be placed at **`client/public/og-image.png`** (1200 × 630 px recommended). The `OG_IMAGE` constant in `site.js` resolves to `<SITE_URL>/og-image.png` automatically. The file is not committed to the repo; add it before building for production.

## Available Scripts

Run all scripts from the `client/` directory.

| Script | Command | Description |
|---|---|---|
| Start dev server | `npm start` | Runs on [http://localhost:3000](http://localhost:3000) with hot reload |
| Run tests | `npm test` | Jest + React Testing Library in watch mode |
| Production build | `npm run build` | Outputs to `client/build/` |
| Eject CRA config | `npm run eject` | One-way operation — exposes webpack/Babel config |

## Deployment

The site deploys automatically to GitHub Pages via the workflow at `.github/workflows/`. Pushes to `main` trigger a build and deploy. The `homepage` field in `client/package.json` is set to `https://mikegoat1.github.io/Portfolio3.0`.
