import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import { useThemeMode } from "../../theme";

// 44x44 target (Fitts's Law / WCAG 2.5.8). Inherits accent on hover.
const ThemeToggle = () => {
  const { mode, toggle } = useThemeMode();
  const next = mode === "dark" ? "light" : "dark";
  return (
    <Tooltip title={`Switch to ${next} mode`}>
      <IconButton
        onClick={toggle}
        aria-label={`Switch to ${next} mode`}
        sx={{
          width: 44,
          height: 44,
          color: "var(--text-muted)",
          transition: "color var(--dur-fast) var(--ease)",
          "&:hover": { color: "var(--accent)", backgroundColor: "transparent" },
        }}
      >
        {mode === "dark" ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
