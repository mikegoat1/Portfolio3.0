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
  },
};

export const fonts = {
  ui: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace",
};
