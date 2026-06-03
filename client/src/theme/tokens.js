// JS mirror of the CSS token palettes (index.css).
// Used to build the MUI theme so components inherit Direction A colors.
// Keep these in sync with the [data-theme] blocks in index.css.

export const palettes = {
  dark: {
    bg: "#0d1117",
    surface: "#161b22",
    border: "#30363d",
    text: "#c9d1d9",
    textMuted: "#8b949e",
    accent: "#3fb950",
    accent2: "#56d4dd",
    onAccent: "#0d1117",

    // === Terminal feature tokens (additive) ===
    // Contrast ratios computed against bg (#0d1117) and surface (#161b22).
    terminal: {
      chrome:      "#010409",   // deepest bg for terminal window body
      dotClose:    "#ff5f57",   // traffic-light close dot (decorative, aria-hidden)
      dotMin:      "#febc2e",   // traffic-light minimise dot (decorative)
      dotMax:      "#28c840",   // traffic-light maximise dot (decorative)
      error:       "#f85149",   // 5.65:1 on bg, 5.16:1 on surface — AA pass
      warning:     "#d29922",   // 7.50:1 on bg — AA pass
      focusRing:   "#3fb950",   // reuses accent — 6.81:1 on surface
      shadow:      "0 16px 48px rgba(1, 4, 9, 0.8), 0 1px 0 rgba(63, 185, 80, 0.08)",
    },
    skeleton: {
      base:        "#1c2128",   // subtle lift above bg for skeleton shapes
      shimmer:     "#21262d",   // shimmer highlight — not text, no contrast req
    },
    // Language badge dot colors (decorative — aria-hidden dots, no contrast req).
    // Sourced from GitHub Linguist languages.yml.
    lang: {
      javascript:  "#f7df1e",
      typescript:  "#3178c6",
      python:      "#3572A5",
      css:         "#563d7c",
      html:        "#e34c26",
      shell:       "#89e051",
      go:          "#00ADD8",
      rust:        "#dea584",
      java:        "#b07219",
      ruby:        "#701516",
      default:     "#8b949e",   // fallback for unknown languages
    },
  },
  light: {
    bg: "#ffffff",
    surface: "#f6f8fa",
    border: "#d0d7de",
    text: "#1f2328",
    textMuted: "#59636e",
    accent: "#1a7f37",
    accent2: "#0969da",
    onAccent: "#ffffff",

    // === Terminal feature tokens (additive) ===
    terminal: {
      chrome:      "#f6f8fa",   // surface in light — no deep black available
      dotClose:    "#ff5f57",
      dotMin:      "#febc2e",
      dotMax:      "#28c840",
      error:       "#cf222e",   // 5.36:1 on bg (#fff), 5.03:1 on surface — AA pass
      warning:     "#9a6700",   // 4.87:1 on bg — AA pass
      focusRing:   "#0969da",   // reuses accent2 — 4.88:1 on surface
      shadow:      "0 8px 24px rgba(31, 35, 40, 0.12)",
    },
    skeleton: {
      base:        "#eaeef2",
      shimmer:     "#d0d7de",
    },
    // Same dot hex values as dark — decorative only, no contrast requirement.
    lang: {
      javascript:  "#f7df1e",
      typescript:  "#3178c6",
      python:      "#3572A5",
      css:         "#563d7c",
      html:        "#e34c26",
      shell:       "#89e051",
      go:          "#00ADD8",
      rust:        "#dea584",
      java:        "#b07219",
      ruby:        "#701516",
      default:     "#59636e",
    },
  },
};

export const fonts = {
  ui: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace",
};

// Motion constants — theme-invariant, mirror --dur-* additions in index.css.
export const motion = {
  durTypeChar:    "35ms",     // per-character typing delay in intro sequence
  durSkeleton:    "1600ms",   // skeleton shimmer animation cycle
  durCursorBlink: "1000ms",   // terminal caret blink cycle
  durSubmitStep:  "500ms",    // submitting ellipsis step duration
  ease:           "cubic-bezier(0.2, 0, 0, 1)",  // mirrors --ease in index.css
};
