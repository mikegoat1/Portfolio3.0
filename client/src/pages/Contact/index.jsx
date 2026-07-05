import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PageBackground from "../../components/PageBackground";
import ContactForm from "../../components/ContactForm";
import Seo from "../../components/Seo";

const Contact = () => (
  <Container
    maxWidth="md"
    sx={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh",
      mt: "5rem",
      mb: "5rem",
    }}
  >
    <PageBackground variant="grid" />

    <Seo
      title="Contact"
      description="Start a project with Michael Johnson — full stack MERN and AWS contractor for web apps, media workflows, integrations, and cloud infrastructure."
      path="/contact"
    />

    <Box sx={{ textAlign: "center", mb: "var(--space-5)" }}>
      <Box
        component="span"
        sx={{
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          display: "block",
          mb: 1,
        }}
      >
        <Box component="span" sx={{ color: "var(--accent)" }}>
          $
        </Box>{" "}
        ./contact --send
      </Box>
      <Typography
        variant="h4"
        sx={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}
      >
        Start a Project
      </Typography>
      <Typography
        component="p"
        sx={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-ui)",
          mt: 1,
          maxWidth: "58ch",
          mx: "auto",
        }}
      >
        Share the project type, timeline, and scope so I can respond with the
        right next step.
      </Typography>
    </Box>

    <ContactForm />
  </Container>
);

export default Contact;
