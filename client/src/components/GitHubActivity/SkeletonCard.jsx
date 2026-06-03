import React from "react";
import { Box } from "@mui/material";

// Dimension-matched skeleton — mirrors RepoCard proportions to prevent CLS.
const SkeletonCard = () => (
  <Box
    aria-hidden="true"
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
    }}
  >
    {/* title bar strip */}
    <Box
      sx={{
        height: 36,
        backgroundColor: "var(--skeleton-base)",
        borderBottom: "1px solid var(--border)",
      }}
    />

    {/* body */}
    <Box sx={{ p: "var(--space-3)", flexGrow: 1 }}>
      <Box
        className="skeleton-pulse"
        sx={{ width: "60%", height: 16, mb: "var(--space-2)" }}
      />
      <Box
        className="skeleton-pulse"
        sx={{ width: "100%", height: 12, mb: "var(--space-1)" }}
      />
      <Box className="skeleton-pulse" sx={{ width: "75%", height: 12 }} />
    </Box>

    {/* footer */}
    <Box
      sx={{
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: "var(--space-3)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--skeleton-base)",
          }}
        />
        <Box className="skeleton-pulse" sx={{ width: 48, height: 10 }} />
      </Box>
      <Box className="skeleton-pulse" sx={{ width: 32, height: 10 }} />
    </Box>
  </Box>
);

export default SkeletonCard;
