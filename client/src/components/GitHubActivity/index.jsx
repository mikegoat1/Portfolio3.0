import React from "react";
import { Box, Grid2, Typography } from "@mui/material";
import "./GitHubActivity.css";
import useGitHubRepos from "./useGitHubRepos";
import RepoCard from "./RepoCard";
import SkeletonCard from "./SkeletonCard";
import { GITHUB_USERNAME, GITHUB_PROFILE_URL } from "../../config/site";

const GRID_SIZE = { md: 4, sm: 6, xs: 12 };

const ProfileLink = () => (
  <Box
    component="a"
    href={GITHUB_PROFILE_URL}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      color: "var(--accent-2)",
      textDecoration: "none",
      display: "inline-block",
      minHeight: 44,
      lineHeight: "44px",
      "&:hover": { textDecoration: "underline" },
      "&:focus-visible": {
        outline: "2px solid var(--terminal-focus-ring)",
        outlineOffset: "2px",
      },
    }}
  >
    → github.com/{GITHUB_USERNAME}
  </Box>
);

const MonoButton = ({ children, onClick }) => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    sx={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.85rem",
      color: "var(--accent)",
      backgroundColor: "transparent",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      px: "var(--space-3)",
      minHeight: 44,
      minWidth: 44,
      cursor: "pointer",
      "&:hover": { borderColor: "var(--accent)" },
      "&:focus-visible": {
        outline: "2px solid var(--terminal-focus-ring)",
        outlineOffset: "2px",
      },
    }}
  >
    {children}
  </Box>
);

const Rule = () => (
  <Box
    aria-hidden="true"
    sx={{
      borderTop: "1px solid var(--border)",
      opacity: 0.3,
      my: "var(--space-2)",
      maxWidth: "48ch",
      mx: "auto",
    }}
  />
);

const ErrorBlock = ({ children }) => (
  <Box
    role="alert"
    sx={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.875rem",
      lineHeight: 1.65,
      textAlign: "center",
      color: "var(--text-muted)",
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      p: "var(--space-4)",
    }}
  >
    {children}
  </Box>
);

const SectionHeader = () => (
  <Box sx={{ textAlign: "center", mb: "var(--space-5)" }}>
    <Box
      component="span"
      sx={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9rem",
        color: "var(--text-muted)",
        display: "block",
        mb: 1,
      }}
    >
      {"// open source"}
    </Box>
    <Typography
      variant="h4"
      sx={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}
    >
      GitHub Activity
    </Typography>
    <Box
      component="span"
      sx={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        color: "var(--text-muted)",
      }}
    >
      github.com/{GITHUB_USERNAME}
    </Box>
  </Box>
);

const GitHubActivity = () => {
  const { status, repos, resetTime, isStale, refetch } = useGitHubRepos();

  const showCards =
    (status === "success" || (isStale && repos.length > 0)) && repos.length > 0;

  return (
    <Box
      component="section"
      aria-label="GitHub repositories"
      sx={{ mt: "var(--space-6)" }}
    >
      <SectionHeader />

      {/* aria-live for loading/content transitions */}
      <Box
        aria-live="polite"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {status === "loading" ? "Loading repositories" : ""}
      </Box>

      {status === "loading" && (
        <Grid2 container spacing={2} justifyContent="center" alignItems="stretch">
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid2 item size={GRID_SIZE} key={i}>
              <SkeletonCard />
            </Grid2>
          ))}
        </Grid2>
      )}

      {showCards && (
        <>
          <Grid2 container spacing={2} justifyContent="center" alignItems="stretch">
            {repos.map((repo) => (
              <Grid2 item size={GRID_SIZE} key={repo.id}>
                <RepoCard repo={repo} />
              </Grid2>
            ))}
          </Grid2>
          {isStale && (
            <Box
              sx={{
                mt: "var(--space-3)",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              Showing cached data.
            </Box>
          )}
        </>
      )}

      {status === "empty" && (
        <ErrorBlock>
          <Box sx={{ color: "var(--text)" }}>~/portfolio $ ls ~/github</Box>
          <Box>bash: no repositories found.</Box>
          <Box sx={{ mt: "var(--space-2)" }}>
            <ProfileLink />
          </Box>
        </ErrorBlock>
      )}

      {status === "rate-limit" && !isStale && (
        <ErrorBlock>
          <Box sx={{ color: "var(--terminal-error)", fontWeight: 500 }}>
            [exit code 1] GitHub API rate limit exceeded.
          </Box>
          <Rule />
          <Box>bash: fetch: 403 — 60 req/hr limit reached.</Box>
          {resetTime && <Box>Resets at {resetTime}.</Box>}
          <Box sx={{ mt: "var(--space-2)" }}>
            <ProfileLink />
          </Box>
        </ErrorBlock>
      )}

      {status === "error" && !isStale && (
        <ErrorBlock>
          <Box sx={{ color: "var(--terminal-error)", fontWeight: 500 }}>
            [exit code 1] Unable to reach GitHub.
          </Box>
          <Rule />
          <Box>bash: fetch: network error</Box>
          <Box
            sx={{
              mt: "var(--space-3)",
              display: "flex",
              gap: "var(--space-3)",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MonoButton onClick={refetch}>[r] retry</MonoButton>
            <ProfileLink />
          </Box>
        </ErrorBlock>
      )}
    </Box>
  );
};

export default GitHubActivity;
