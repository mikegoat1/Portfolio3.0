import React from "react";
import { Box, Typography, Button, Chip, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/backgrounds.jpg";
import PageBackground from "../../components/PageBackground";
import TerminalHero from "../../components/TerminalHero";
import Seo from "../../components/Seo";

const serviceLanes = [
  {
    title: "Full-stack product builds",
    body:
      "React, Next.js, Node.js, GraphQL, REST APIs, auth, dashboards, admin flows, and production-ready UI.",
  },
  {
    title: "AWS and media workflows",
    body:
      "S3, CloudFront, Lambda, ECS, SQS, Redis, background workers, upload flows, thumbnails, and processing pipelines.",
  },
  {
    title: "Integrations and stabilization",
    body:
      "Stripe, storage providers, SaaS APIs, operational debugging, deployment cleanup, and legacy workflow improvements.",
  },
];

const goodFit = [
  "Startups needing a hands-on full-stack contractor",
  "Teams with complex AWS or media-processing workflows",
  "Founders who need production help beyond prototypes",
  "Agencies needing technical execution support",
];

const LandingPage = () => {
  return (
    <>
      <Seo
        title="Home"
        description="Michael Johnson — full stack developer in Los Angeles building MERN, AWS, media-processing, and cloud platform solutions."
        path="/"
      />
      <Box
        sx={{
          position: "relative",
          minHeight: "calc(100vh - 64px - 56px)", // viewport minus navbar + footer
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--bg)",
          overflow: "hidden",
          py: 6,
        }}
      >
        {/* Photo, dimmed, behind a scrim so hero text is never white-on-photo */}
        <PageBackground
          image={backgroundImage}
          opacity={0.35}
          backgroundSize="cover"
          backgroundPosition="right center"
        />
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, var(--scrim) 0%, var(--scrim) 55%, transparent 100%)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
            }}
          >
            {/* Left: existing hero content (typewriter + CTAs) */}
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mb: 2 }}
              >
                <Chip
                  label="Available for contract work"
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
                <Chip
                  label="Remote · Los Angeles / Pacific Time"
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-2)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </Stack>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  color: "var(--accent)",
                  mb: 2,
                }}
              >
                <Box component="span">$</Box>
                <Box
                  component="span"
                  className="type-line type-caret"
                  sx={{ color: "var(--text-muted)" }}
                >
                  whoami
                </Box>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.05,
                  fontSize: { xs: "2.25rem", sm: "3.25rem" },
                  mb: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                  }}
                >
                  Full-Stack MERN + AWS Contractor
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                  mb: 4,
                  maxWidth: "46ch",
                }}
              >
                {"// I help teams ship reliable cloud apps, automate media workflows, and stabilize production systems."}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  maxWidth: "100%",
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to="/contact"
                  sx={{
                    backgroundColor: "var(--accent)",
                    color: "var(--on-accent)",
                    fontFamily: "var(--font-ui)",
                    px: 3,
                    py: 1,
                    "&:hover": { backgroundColor: "var(--accent-2)", color: "var(--on-accent)" },
                  }}
                >
                  Start a Project →
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/work"
                  sx={{
                    color: "var(--text)",
                    borderColor: "var(--border)",
                    fontFamily: "var(--font-ui)",
                    px: 3,
                    py: 1,
                    "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" },
                  }}
                >
                  View Work
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  to="/contact"
                  sx={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-ui)",
                    px: 3,
                    py: 1,
                    "&:hover": { color: "var(--accent)", backgroundColor: "transparent" },
                  }}
                >
                  Contact
                </Button>
              </Box>
            </Box>

            {/* Right: interactive terminal (primary interaction) */}
            <TerminalHero />
          </Box>
          </Container>
        </Box>

        <Box component="section" sx={{ py: { xs: 7, md: 9 }, backgroundColor: "var(--bg)" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: "var(--space-5)" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                  fontSize: "0.9rem",
                  display: "block",
                  mb: 1,
                }}
              >
                {"// what I build"}
              </Box>
              <Typography
                variant="h4"
                sx={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}
              >
                Client-Ready Engineering Support
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {serviceLanes.map((service) => (
                <Grid key={service.title} size={{ md: 4, sm: 6, xs: 12 }}>
                  <Box
                    sx={{
                      height: "100%",
                      p: "var(--space-4)",
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--text)",
                        fontFamily: "var(--font-ui)",
                        mb: "var(--space-2)",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}
                    >
                      {service.body}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box component="section" sx={{ py: { xs: 7, md: 9 }, backgroundColor: "var(--surface)" }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ md: 5, xs: 12 }}>
                <Box
                  component="span"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent)",
                    fontSize: "0.9rem",
                    display: "block",
                    mb: 1,
                  }}
                >
                  {"// good fit for"}
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "var(--font-ui)", color: "var(--text)", mb: 2 }}
                >
                  Teams That Need Production Momentum
                </Typography>
                <Typography
                  component="p"
                  sx={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}
                >
                  I’m best suited for teams that need someone who can move
                  between UI, APIs, cloud services, deployment, and debugging
                  without handing work across multiple people.
                </Typography>
              </Grid>

              <Grid size={{ md: 7, xs: 12 }}>
                <Stack spacing={1.25}>
                  {goodFit.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                        p: "var(--space-3)",
                        backgroundColor: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          mt: "0.35rem",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        component="p"
                        variant="body2"
                        sx={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
  );
};

export default LandingPage;
