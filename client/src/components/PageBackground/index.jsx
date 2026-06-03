import React from "react";
import { Box } from "@mui/material";

/**
 * Full-bleed background-image overlay used behind page content.
 * Replaces the copy-pasted Container `&::before` block on each page.
 *
 * Renders an absolutely-positioned, inset-0 layer at zIndex -1 — identical
 * behavior to the previous pseudo-element. Place it as the first child of the
 * page's MUI Container.
 *
 * @param {string} image            - imported background image (url)
 * @param {number} opacity          - overlay opacity (default 1)
 * @param {string} backgroundSize   - CSS background-size (default "cover")
 * @param {string} [backgroundPosition] - CSS background-position (omitted -> CSS default)
 */
const PageBackground = ({
  image,
  opacity = 1,
  backgroundSize = "cover",
  backgroundPosition,
}) => (
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

export default PageBackground;
