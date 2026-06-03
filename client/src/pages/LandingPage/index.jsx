import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/backgrounds.jpg";
import PageBackground from "../../components/PageBackground";
import { EMAIL_HREF } from "../../config/site";

const LandingPage = () => {
  const handleEmailClick = () => {
    window.location.href = EMAIL_HREF;
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 64px - 56px)", // viewport minus navbar + footer
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--bg)",
        overflow: "hidden",
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

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, py: 6 }}>
        {/* Terminal-prompt treatment */}
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
          <Box component="span" sx={{ color: "var(--text-muted)" }}>
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
          Full Stack Developer
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
          {"// frontend & backend innovation — bringing code and creativity together."}
        </Typography>

        <Box sx={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            component={Link}
            to="/work"
            sx={{
              backgroundColor: "var(--accent)",
              color: "var(--on-accent)",
              fontFamily: "var(--font-ui)",
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "var(--accent-2)", color: "var(--on-accent)" },
            }}
          >
            View Work →
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/about"
            sx={{
              color: "var(--text)",
              borderColor: "var(--border)",
              fontFamily: "var(--font-ui)",
              px: 3,
              py: 1,
              "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" },
            }}
          >
            About
          </Button>
          <Button
            variant="text"
            onClick={handleEmailClick}
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
      </Container>
    </Box>
  );
};

export default LandingPage;
