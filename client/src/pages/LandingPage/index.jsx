import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:your-email@example.com";
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h2" gutterBottom>
        Welcome to My Portfolio
      </Typography>
      <Typography variant="h5" gutterBottom>
        Discover my work and get to know me better.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/about" sx={{ margin: "1rem" }}>
        About Me
      </Button>
      <Button variant="contained" color="primary" onClick={handleEmailClick} sx={{ margin: "1rem" }}>
        Contact Me
      </Button>
    </Container>
  );
};

export default LandingPage;