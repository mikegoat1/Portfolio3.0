import React from "react";
import { Box } from "@mui/material";

// Map a GitHub language name to its decorative dot token. Falls back to default.
const langToken = (language) => {
  if (!language) return "var(--lang-default)";
  const key = language.toLowerCase().replace(/[^a-z]/g, "");
  const known = [
    "javascript",
    "typescript",
    "python",
    "css",
    "html",
    "shell",
    "go",
    "rust",
    "java",
    "ruby",
  ];
  return known.includes(key) ? `var(--lang-${key})` : "var(--lang-default)";
};

const TrafficDots = () => (
  <Box sx={{ display: "flex", gap: "6px" }} aria-hidden="true">
    {[
      "var(--terminal-dot-close)",
      "var(--terminal-dot-min)",
      "var(--terminal-dot-max)",
    ].map((c, i) => (
      <Box
        key={i}
        sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }}
      />
    ))}
  </Box>
);

const RepoCard = ({ repo }) => {
  const { name, description, language, stars, url } = repo;

  return (
    <Box
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} repository on GitHub${
        description ? ` — ${description}` : ""
      }`}
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "none",
        overflow: "hidden",
        transition: "border-color var(--dur-fast) var(--ease)",
        "&:hover": { borderColor: "var(--accent)" },
        "&:focus-visible": {
          outline: "2px solid var(--terminal-focus-ring)",
          outlineOffset: "2px",
          borderColor: "var(--accent)",
        },
      }}
    >
      {/* File-tab header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          px: "var(--space-3)",
          py: "var(--space-2)",
          minHeight: 36,
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg)",
        }}
      >
        <TrafficDots />
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            ml: "0.25rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}.git
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: "var(--space-3)", flexGrow: 1 }}>
        <Box
          sx={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--text)",
            mb: "var(--space-2)",
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.6em",
          }}
        >
          {description || "// no description"}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "var(--space-3)",
          py: "var(--space-2)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: langToken(language),
            }}
          />
          <Box
            component="span"
            sx={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            {language || "—"}
          </Box>
        </Box>

        <Box
          component="span"
          aria-label={`${stars} ${stars === 1 ? "star" : "stars"}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <Box component="span" aria-hidden="true">
            ★
          </Box>
          {stars}
        </Box>
      </Box>
    </Box>
  );
};

export default RepoCard;
