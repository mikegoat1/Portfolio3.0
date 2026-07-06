import React from "react";
import { Container, Typography, Box, Button, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import profilePhoto from "../../assets/IMG_1411 2.jpg";
import PageBackground from "../../components/PageBackground";
import Seo from "../../components/Seo";

// Mono label rendered as a section "comment" header, e.g. "// about"
const SectionLabel = ({ children }) => (
  <Box
    component="span"
    sx={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      color: "var(--accent)",
      display: "block",
      mb: 0.5,
    }}
  >
    {children}
  </Box>
);

const skills = [
  "React.js",
  "Node.js",
  "GraphQL",
  "AWS",
  "MongoDB",
  "Redis/SQS",
  "Docker",
  "Stripe",
  "JavaScript",
  "UI/UX",
];

const services = [
  "Full-stack web apps",
  "MERN + AWS architecture",
  "Cloud storage workflows",
  "Media processing pipelines",
  "API and SaaS integrations",
  "Deployment and debugging",
];

const engagementModels = [
  "Project-based builds",
  "Monthly retainers",
  "Fractional full-stack engineering",
  "Infrastructure/debugging audits",
  "Integration sprints",
];

const trustSignals = ["Qubee", "Apple", "2U", "MERN + AWS", "Production deployments"];

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        py: { xs: "4rem", md: "5rem" },
      }}
    >
      <PageBackground variant="grid" />

      <Seo
        title="About"
        description="About Michael Johnson — full stack developer in Los Angeles building MERN, AWS, media-processing, and cloud platform solutions."
        path="/about"
      />

      <Grid container spacing={6} alignItems="flex-start">
        {/* Left Side: Image (asymmetric 4/8 split kept per audit) */}
        <Grid size={{ md: 4, sm: 5, xs: 12 }}>
          <Box
            component="img"
            src={profilePhoto}
            alt="Michael Johnson"
            decoding="async"
            sx={{
              display: "block",
              width: "100%",
              maxWidth: { xs: 280, sm: "none" },
              height: "auto",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              mx: { xs: "auto", sm: 0 },
            }}
          />
        </Grid>

        {/* Right Side: About Me Text */}
        <Grid sx={{ color: "var(--text-muted)" }} size={{ md: 8, sm: 7, xs: 12 }}>
          <SectionLabel>{"// about"}</SectionLabel>
          <Typography
            sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            variant="h4"
            gutterBottom
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            component="p"
            sx={{ color: "var(--text-muted)" }}
          >
            I’m a{" "}
            <strong style={{ color: "var(--text)" }}>Full-Stack Developer</strong>{" "}
            based in Los Angeles, CA, with a passion for creating digital
            experiences that are both user-friendly and technically sound. Over
            the past 5+ years, I’ve had the privilege to work with renowned
            companies like Apple and 2U, and I currently contract on Qubee, a
            full-stack cloud storage and media-processing platform for teams.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "var(--text-muted)" }}
          >
            <strong style={{ color: "var(--text)" }}> My journey </strong>into
            tech started with a curiosity for how things work behind the screen,
            leading me to pursue certifications and hands-on experiences. I’ve
            grown from supporting clients with technical issues at Apple’s Tower
            Theater to developing user-centered solutions for Apple’s marketing
            teams. Along the way, I’ve also taught coding and mentored students,
            igniting a passion for knowledge-sharing and collaboration.
          </Typography>

          {/* Services */}
          <Box sx={{ mt: "var(--space-4)" }}>
            <SectionLabel>{"// services"}</SectionLabel>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            >
              Services I Provide
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "var(--text-muted)", mb: 1 }}
            >
              I build and maintain full-stack MERN + AWS products, from React
              interfaces and GraphQL APIs to cloud infrastructure, media
              pipelines, third-party integrations, and production deployments.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1}
              sx={{ mt: 1, mb: 1 }}
            >
              {services.map((service) => (
                <Chip
                  key={service}
                  label={service}
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent-2)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Engagement Models */}
          <Box sx={{ mt: "var(--space-4)" }}>
            <SectionLabel>{"// engagement"}</SectionLabel>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            >
              Ways to Work Together
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "var(--text-muted)", mb: 1 }}
            >
              I work with teams that need hands-on engineering support across
              product builds, platform upgrades, cloud infrastructure, and
              integration-heavy workflows.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1}
              sx={{ mt: 1, mb: 1 }}
            >
              {engagementModels.map((model) => (
                <Chip
                  key={model}
                  label={model}
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Trust Signals */}
          <Box sx={{ mt: "var(--space-4)" }}>
            <SectionLabel>{"// selected experience"}</SectionLabel>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            >
              Trusted Experience
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "var(--text-muted)", mb: 1 }}
            >
              My work spans client-facing support, marketing technology,
              full-stack instruction, and current contractor ownership of a
              production cloud media platform.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1}
              sx={{ mt: 1, mb: 1 }}
            >
              {trustSignals.map((signal) => (
                <Chip
                  key={signal}
                  label={signal}
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent-2)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Skills and Expertise */}
          <Box sx={{ mt: "var(--space-4)" }}>
            <SectionLabel>{"// skills"}</SectionLabel>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            >
              My Skills at a Glance
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              spacing={1}
              sx={{ mt: 1, mb: 1 }}
            >
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "var(--text-muted)" }}
            >
              I’m fluent across frontend, backend, cloud infrastructure, and
              async workflows, with hands-on experience in React, Node.js,
              GraphQL, MongoDB/DocumentDB, Redis, SQS, ECS, Lambda, S3, and
              CloudFront.
            </Typography>
          </Box>

          <Box sx={{ mt: "var(--space-4)" }}>
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
                "&:hover": {
                  backgroundColor: "var(--accent-2)",
                  color: "var(--on-accent)",
                },
              }}
            >
              Start a Project
            </Button>
          </Box>

          {/* Personal Interests */}
          <Box sx={{ mt: "var(--space-4)" }}>
            <SectionLabel>{"// off-hours"}</SectionLabel>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
            >
              When I’m Not Coding...
            </Typography>
            <Typography
              variant="body2"
              component="p"
              gutterBottom
              sx={{ color: "var(--text-muted)" }}
            >
              You’ll likely find me exploring new places, bouldering, or testing
              out the latest tech gadgets. I believe in a balanced life, and
              these hobbies give me fresh perspectives and inspiration that I
              bring back to my work.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
