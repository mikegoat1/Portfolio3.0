import React from "react";
import { Container, Typography, Avatar, Box, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
  "AWS",
  "MongoDB",
  "MySQL",
  "JavaScript",
  "UI/UX",
];

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <PageBackground variant="grid" />

      <Seo
        title="About"
        description="About Michael Johnson — full stack developer in Los Angeles with 5+ years building UI/UX and full-stack solutions for Apple and 2U."
        path="/about"
      />

      <Grid container spacing={6} alignItems="center">
        {/* Left Side: Image (asymmetric 4/8 split kept per audit) */}
        <Grid size={{ md: 4, sm: 5, xs: 12 }} item>
          <Avatar
            src={require("../../assets/IMG_1411 2.jpg")}
            alt="Michael Johnson"
            variant="rounded"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
            }}
          />
        </Grid>

        {/* Right Side: About Me Text */}
        <Grid item sx={{ color: "var(--text-muted)" }} size={{ md: 8, sm: 7, xs: 12 }}>
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
            companies like Apple and 2U, bringing my expertise in UI/UX design
            and full-stack development to each project.
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
              I’m fluent across the front and back end and thrive on finding
              efficient, innovative solutions — whether it’s crafting a seamless
              user interface or managing complex data.
            </Typography>
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
