# Architecture Audit Report
**Date:** 2026-06-02
**Mode:** Full repo (branch `main`)
**Stack:** React 18 SPA via Create React App (react-scripts 5), MUI v6 (primary UI), react-router-dom v6, deployed to GitHub Pages via gh-pages. A second, unused UI kit (Bootstrap 5 + react-bootstrap) is also installed.
**Key metrics:**
- Largest source files: `pages/Work/index.jsx` **252 lines**, `pages/AboutMe/index.jsx` 106, `components/Navbar/index.js` 103, `components/ProjectCard/index.jsx` 93. Total app source ~960 lines across 19 files — a small project.
- Source files: 19 JS/JSX/CSS under `client/src`. Max folder depth: 5. No God files.
- Dependencies: 19 production, 4 dev.
- Notable: **5 of the ~8 components are dead code** (imported nowhere). One (`Hero Image`) imports a missing asset.

**Overall Grade: C** — The live code path is small, readable, and conventionally organized for CRA. But roughly half the components are orphaned dead code, two competing UI libraries are installed, styling approaches are inconsistent across files, and folder/file naming has real defects (a space in a folder name, a `inedx.js` typo). None of this breaks the running site, but it creates onboarding friction and bloat disproportionate to a 960-line project.

---

## Executive Summary
This is a small personal portfolio SPA built with Create React App and MUI. The actual rendered application — `App.js`, four pages, a Navbar, and a Footer — is clean, easy to follow, and uses sensible `pages/` vs `components/` separation. The dominant problem is not the live code but the **dead weight around it**: five `react-bootstrap`-based components (`ProjectCard`, `SkillsComp`, `AboutContainer`, `Username`, `Hero Image`) are imported nowhere, pulling in an entire second UI framework (Bootstrap + react-bootstrap) that the shipped app never uses. Secondary issues are stylistic inconsistency (MUI `makeStyles` vs `sx` vs inline `styles` objects vs CSS files, used interchangeably) and naming defects (`Hero Image/inedx.js` — both a space in the folder and a typo in the filename). The single biggest win is deleting the dead components and the unused Bootstrap dependencies, which shrinks the dependency surface and removes ~50% of the component files with zero behavioral risk.

---

## What's Working Well
- **Clear pages/components split.** `pages/` holds route-level screens (`LandingPage`, `AboutMe`, `Work`, `Resume`) and `components/` holds shared UI (`Navbar`, `Footer`). For a CRA portfolio this is the idiomatic, predictable layout. [High]
- **Routing is centralized and readable.** `App.js` declares all four routes in one place; layout composition (`<NavBar /> ... <Footer />`) is explicit per route. Easy to reason about. [High]
- **No God files.** The largest file is 252 lines and it's mostly a static data array plus one map. Nothing is doing too much. [High]
- **Sensible entry point.** `index.js` correctly uses React 18 `createRoot`, `StrictMode`, and sets the GitHub Pages `basename`. [High]
- **Data-driven Work page.** `pages/Work/index.jsx` drives its cards from a `projects` array rather than copy-pasted markup — the right instinct. (The dead `ProjectCard` component, by contrast, hardcodes pairs of projects via `name1/name2` props — good thing it's the version that got dropped.) [High]

---

## Critical Issues (Fix First)

### Issue: Roughly half the components are dead code [Confidence: High]
**What's happening:** Five components are defined but imported nowhere in the live tree (verified by grepping all imports outside each component's own folder):
- `components/ProjectCard/index.jsx` (93 lines) + `style.css`
- `components/SkillsComp/index.js`
- `components/AboutContainer/index.js`
- `components/Username/index.js` + `style.css`
- `components/Hero Image/inedx.js`

The only live components are `Navbar` and `Footer`. All five orphans are built on `react-bootstrap`, which the rest of the app (MUI-based) does not use.
**Files affected:** the five component folders above (~270 lines + 2 CSS files).
**Why it matters:** A new contributor can't tell which `ProjectCard` is "real" — the dead one or the inline card in `Work/index.jsx`. Dead code gets accidentally edited, searched, and maintained. It also justifies dependencies that shouldn't be there (next issue).
**Pros of fixing:** Removes ~50% of component files; eliminates the react-bootstrap dependency; clarifies the one true card implementation.
**Cons / risks of fixing:** If any of these are intended as scaffolding for upcoming features, deleting them loses that draft. Low risk — they're in git history and can be restored.

### Issue: Two competing UI frameworks installed; one is entirely unused at runtime [Confidence: High]
**What's happening:** `package.json` declares both `@mui/material` (+ emotion, icons, styles) **and** `bootstrap` + `react-bootstrap`. After the dead components are removed, `react-bootstrap`/`bootstrap` have zero live importers. `@mui/styles` (the deprecated legacy styling package) is also installed and used only in `Work/index.jsx`.
**Files affected:** `client/package.json`; transitively the whole `node_modules` and the 1.5 MB `package-lock.json`.
**Why it matters:** Shipping/maintaining two design systems doubles the conceptual surface and bundle weight for no benefit. `@mui/styles` is officially deprecated and not compatible with React 18 concurrent features long-term.
**Pros of fixing:** Smaller dependency tree and bundle; one consistent styling story; removes a deprecated package.
**Cons / risks of fixing:** Removing `@mui/styles` requires migrating the `makeStyles` block in `Work/index.jsx` to `sx`/`styled` (small, ~20 lines). Must remove the dead components first or the build breaks.

---

## Important Improvements (Fix Soon)

### Issue: Naming defects in the components folder [Confidence: High]
**What's happening:** `components/Hero Image/inedx.js` has a **space in the folder name** and a **typo in the filename** (`inedx` instead of `index`). The component also imports `../../assets/HeroImg.jpg`, which **does not exist** in `assets/` — so this file would fail to compile if ever imported.
**Files affected:** `components/Hero Image/inedx.js`.
**Why it matters:** Spaces in paths break some tooling and shell commands; the typo means even an intentional import of `Hero Image` wouldn't resolve via the conventional `index` convention. The missing asset means it's broken regardless.
**Pros of fixing:** Removes a landmine. (In practice this component is dead code, so the cleanest fix is deletion — see Step 1.)
**Cons / risks of fixing:** None; it's unused and currently broken.

### Issue: Inconsistent file extensions and styling strategies [Confidence: High]
**What's happening:** Components mix `.js` and `.jsx` for the same kind of file (`Navbar/index.js`, `SkillsComp/index.js` vs `Footer/index.jsx`, `ProjectCard/index.jsx`). Styling is done four different ways across the small codebase: MUI `sx` prop (LandingPage, AboutMe), inline `style={styles.x}` objects (Navbar, SkillsComp), MUI `makeStyles` (Work), and external `.css` files (`App.css`, `ProjectCard/style.css`). Color hex values (`#3C3C3C`, `#E2725B`, `#E7E9EC`, `#A8BCA1`) are hardcoded and repeated across many files instead of living in a theme.
**Files affected:** all of `client/src`.
**Why it matters:** No single place to change the palette or restyle; a contributor must learn four patterns. For a project this size it's friction more than danger, but it compounds.
**Pros of fixing:** One styling convention (recommend MUI `sx` + a central theme) makes restyling trivial and palette changes one-line.
**Cons / risks of fixing:** Touch-many-files churn; purely cosmetic, so easy to defer.

### Issue: No centralized config / content layer [Confidence: Medium]
**What's happening:** Content and config are embedded in components: the email `mikeg.o.a.t.1@gmail.com` is hardcoded in both `LandingPage` and `Footer`; social URLs live inline in `Footer`; the `projects` array lives inside `Work/index.jsx`; the resume PDF filename is hardcoded in `Navbar`'s download handler. The repeated `&::before` background-image overlay block is copy-pasted in `LandingPage`, `AboutMe`, and `Work`.
**Files affected:** `LandingPage`, `AboutMe`, `Work`, `Navbar`, `Footer`.
**Why it matters:** Updating a link or the project list means hunting through JSX. The duplicated overlay is the clearest reuse miss.
**Pros of fixing:** A `src/data/` (or `src/content/`) module for projects + a `src/config/links.js` for contact/social makes content edits trivial and DRYs the overlay into one `PageBackground` wrapper.
**Cons / risks of fixing:** Minor over-engineering risk for a one-author site; proportionate only if content changes often.

---

## Nice-to-Have Improvements (Fix Eventually)

### Issue: Committed build artifacts and editor cruft [Confidence: Medium]
**What's happening:** `client/build/` (CRA output) and `.DS_Store` files are present in the working tree. `build/` is regenerated by `npm run build`/`predeploy`.
**Files affected:** `client/build/`, `client/.DS_Store`.
**Why it matters:** Build output in source control causes noisy diffs and stale-asset confusion (recent commits are literally "update main.js references in asset-manifest.json").
**Pros of fixing:** Cleaner diffs; `.gitignore` `build/` and `.DS_Store`.
**Cons / risks of fixing:** Verify the gh-pages deploy still works — `gh-pages -d build` builds locally before publishing, so ignoring the committed copy is safe. [Confirm by checking the deploy branch.]

### Issue: Essentially no test coverage [Confidence: High]
**What's happening:** Only the CRA default `App.test.js` (8 lines, "renders learn react") exists, and it likely doesn't match the current App. No tests mirror the pages/components.
**Files affected:** `App.test.js`.
**Why it matters:** For a static portfolio this is low-stakes, but the default test may even fail.
**Pros of fixing:** Either delete the stale default test or replace it with a smoke render test per page.
**Cons / risks of fixing:** Low value for a personal site; fine to deprioritize.

### Issue: Leftover commented-out "Contact" navigation [Confidence: High]
**What's happening:** `Navbar/index.js` has commented-out Contact tab/drawer/route blocks and a corresponding gap in the `value` index logic.
**Why it matters:** Dead commented code rots; either ship Contact or remove the stubs.
**Cons / risks of fixing:** None.

---

## Prioritized Action Plan

### Step 1: Delete the dead react-bootstrap components
**Goal:** Remove the five orphaned components, eliminating ~50% of component files and the broken `Hero Image` file.
**Estimated effort:** Low
**Dependencies:** Do this before Step 2 (removing Bootstrap deps) so nothing references react-bootstrap afterward.

**Claude Prompt:**
```
In the React app under client/src/components, delete these component folders entirely — they are dead code, imported nowhere in the app (the live tree is App.js -> pages/* + components/Navbar + components/Footer):
- components/ProjectCard/ (index.jsx + style.css)
- components/SkillsComp/
- components/AboutContainer/
- components/Username/ (index.js + style.css)
- components/Hero Image/ (inedx.js — note the space in the folder and the filename typo; it also imports a missing assets/HeroImg.jpg)

Before deleting, run `grep -rn "<ComponentName>" client/src` excluding each component's own folder to confirm zero importers for each. Do NOT touch Navbar, Footer, or anything under pages/. After deleting, run `npm run build` in client/ to confirm the app still compiles. Report what was removed.
```

### Step 2: Remove unused UI-framework dependencies
**Goal:** Drop `bootstrap` and `react-bootstrap` (now unused), and remove the deprecated `@mui/styles` after migrating its one usage.
**Estimated effort:** Low
**Dependencies:** After Step 1.

**Claude Prompt:**
```
In client/, after the dead react-bootstrap components have been deleted:
1. Confirm `grep -rn "react-bootstrap" client/src` and `grep -rn "from \"bootstrap\"" client/src` return nothing. If clean, remove `bootstrap` and `react-bootstrap` from client/package.json dependencies.
2. Migrate the single `@mui/styles` `makeStyles` usage in client/src/pages/Work/index.jsx to MUI v6-native styling: replace the `useStyles`/`classes.*` (root, media, description, chip) with either `sx` props or `styled` components, preserving the exact same visual output (maxWidth 345, bg #F4F4F4, the box-shadow/border, media height 140, chip colors). Then remove `@mui/styles` from package.json.
3. Run `npm install` and `npm run build` to confirm the tree resolves and compiles. Do not change any rendered output.
Report the before/after dependency count.
```

### Step 3: Standardize file extensions and remove commented-out nav stubs
**Goal:** Consistent `.jsx` for all React component files; remove rotting commented Contact code.
**Estimated effort:** Low
**Dependencies:** After Steps 1–2 (fewer files to touch).

**Claude Prompt:**
```
In client/src, standardize all React component files to use the .jsx extension (currently Navbar/index.js uses .js while Footer/index.jsx uses .jsx). Rename components/Navbar/index.js -> index.jsx and update any import if needed (imports use the folder path so they should be unaffected). Also in Navbar, remove the commented-out "Contact Me" tab, drawer ListItem, and the related commented route logic — we are not shipping Contact. Run `npm run build` to confirm. Keep all live behavior identical.
```

### Step 4: Centralize content and config; DRY the page background
**Goal:** Move project data, contact email, and social links into dedicated modules; extract the repeated `::before` background overlay into one reusable component.
**Estimated effort:** Medium
**Dependencies:** After Step 3.

**Claude Prompt:**
```
In client/src, introduce a light content/config layer (no behavior change to rendered output):
1. Create src/data/projects.js exporting the `projects` array currently inlined in pages/Work/index.jsx (keep the image imports with it). Import it into Work.
2. Create src/config/site.js exporting contact email and social URLs (LinkedIn, GitHub, Email, resume filename). Replace the hardcoded email in LandingPage and Footer, and the social hrefs in Footer, with these constants.
3. Create a reusable component src/components/PageBackground/index.jsx that renders the repeated MUI Container `&::before` full-bleed background-image overlay (it appears, copy-pasted, in LandingPage, AboutMe, and Work). Parameterize the image, opacity, and backgroundSize/Position. Refactor those three pages to use it without changing their appearance.
Run `npm run build` and verify each page looks identical. Report what was centralized.
```

### Step 5: Stop committing build artifacts and OS cruft
**Goal:** Keep generated output and `.DS_Store` out of source control.
**Estimated effort:** Low
**Dependencies:** Independent.

**Claude Prompt:**
```
Add `client/build/` and `.DS_Store` to the repo's .gitignore (check whether a client/.gitignore or the root .gitignore is the right place). Then `git rm -r --cached client/build` and `git rm --cached` any tracked .DS_Store files so they stop being tracked without deleting local copies. Confirm the gh-pages deploy still works conceptually: the `predeploy` script runs `npm run build` before `gh-pages -d build`, so the committed build/ is not needed. Do not run the deploy. Summarize the .gitignore change and what was untracked.
```

---

## Recommended Target Structure

**Current (`client/src`):**
```
src/
  App.js, index.js, *.css, *.test.js, reportWebVitals.js, setupTests.js
  assets/                (images + resume pdf)
  components/
    Navbar/index.js          (live)
    Footer/index.jsx         (live)
    ProjectCard/             (DEAD)
    SkillsComp/              (DEAD)
    AboutContainer/          (DEAD)
    Username/                (DEAD)
    Hero Image/inedx.js      (DEAD, broken, bad name)
  pages/
    LandingPage/  AboutMe/  Work/  Resume/   (index.jsx each)
```

**Recommended:**
```
src/
  App.jsx, index.js
  assets/
  config/
    site.js              (email, social links, resume filename)
  data/
    projects.js          (extracted from Work)
  components/
    Navbar/index.jsx
    Footer/index.jsx
    PageBackground/index.jsx   (shared ::before overlay)
  pages/
    LandingPage/  AboutMe/  Work/  Resume/   (index.jsx each)
  theme.js               (optional: central MUI palette for the repeated hex colors)
```

---

## Notes & Assumptions
- I judged this as a CRA single-page portfolio and applied React/CRA conventions (pages vs components, colocated `index.*`), not enterprise MVC/DDD layering — appropriate for a ~960-line one-author site. Recommendations are deliberately proportionate; Step 4's config layer is optional polish, not a necessity.
- "Dead code" claims were verified by grepping all imports across `client/src` outside each component's own folder; all five returned zero external importers. If any of these were intentional scaffolding for planned features, treat Step 1 as "park in a branch" rather than hard-delete (git history preserves them either way).
- I did not inspect the gh-pages deploy branch; Step 5 assumes the standard `predeploy: npm run build` flow makes the committed `build/` redundant. Confirm before untracking if your deploy differs.
- This report file is **not** currently matched by `.gitignore` (no `*.md` rule). You can commit it or add it to `.gitignore` as you prefer.
```
