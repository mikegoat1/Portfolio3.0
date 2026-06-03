import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { palettes, fonts } from "./tokens";

const STORAGE_KEY = "portfolio-theme";
const ThemeModeContext = createContext({ mode: "dark", toggle: () => {} });

export const useThemeMode = () => useContext(ThemeModeContext);

// Resolve the initial mode: stored choice > OS preference > dark default.
function getInitialMode() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

function buildMuiTheme(mode) {
  const p = palettes[mode];
  return createTheme({
    palette: {
      mode,
      primary: { main: p.accent, contrastText: p.onAccent },
      secondary: { main: p.accent2 },
      background: { default: p.bg, paper: p.surface },
      text: { primary: p.text, secondary: p.textMuted },
      divider: p.border,
    },
    typography: {
      fontFamily: fonts.ui,
      h1: { fontFamily: fonts.ui, fontWeight: 700 },
      h2: { fontFamily: fonts.ui, fontWeight: 700 },
      h3: { fontFamily: fonts.ui, fontWeight: 600 },
      h4: { fontFamily: fonts.ui, fontWeight: 600 },
      h5: { fontFamily: fonts.ui, fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
    },
  });
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  // Reflect the active mode onto <html data-theme> so the CSS token
  // layer (index.css) and MUI stay in sync, and persist the choice.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  const muiTheme = useMemo(() => buildMuiTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
