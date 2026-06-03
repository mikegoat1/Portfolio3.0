import React from "react";
import { Box } from "@mui/material";

/**
 * Full-bleed background layer used behind page content.
 * Renders an absolutely-positioned, inset-0 layer at zIndex -1.
 * Place it as the first child of the page's MUI Container/Box.
 *
 * Two modes:
 *  - Photo mode (default): pass `image` to render a dimmed photo overlay
 *    (backward-compatible with the landing page).
 *  - Grid mode: pass `variant="grid"` to render a token-driven mono CSS
 *    grid/scanline pattern over --bg. No image weight, no CLS.
 *
 * @param {string} [image]           - imported background image (url). Photo mode.
 * @param {"photo"|"grid"} [variant] - "photo" (default) or "grid".
 * @param {number} opacity           - overlay opacity (default 1)
 * @param {string} backgroundSize    - CSS background-size (default "cover")
 * @param {string} [backgroundPosition] - CSS background-position
 * @param {number} [gridSize]        - grid cell size in px (default 48)
 */
const PageBackground = ({
  image,
  variant = "photo",
  opacity = 1,
  backgroundSize = "cover",
  backgroundPosition,
  gridSize = 48,
}) => {
  if (variant === "grid") {
    // Two faint repeating-linear-gradients form vertical + horizontal rules
    // over the page --bg, evoking an editor minimap / blueprint grid.
    const line = "var(--border)";
    return (
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--bg)",
          backgroundImage: `
            repeating-linear-gradient(0deg, ${line} 0 1px, transparent 1px ${gridSize}px),
            repeating-linear-gradient(90deg, ${line} 0 1px, transparent 1px ${gridSize}px)
          `,
          // Keep it a whisper — ~3% so it reads as texture, not a table.
          opacity: 0.03,
          zIndex: -1,
        }}
      />
    );
  }

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${image})`,
        backgroundSize,
        ...(backgroundPosition ? { backgroundPosition } : {}),
        opacity,
        zIndex: -1,
      }}
    />
  );
};

export default PageBackground;
