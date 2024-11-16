import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/backgrounds.jpg";

const LandingPage = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:mikeg.o.a.t.1@gmail.com";
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "auto",
          backgroundPosition: "right",
          opacity: 0.8,
          zIndex: -1,
        },
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'white',}}>
      Full Stack Developer | Frontend & Backend Innovation.
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: 'white',}}>
      Bringing Code and Creativity Together.
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/about"
          sx={{
            backgroundColor: "#E2725B", // Burnt Sienna color
            "&:hover": {
              backgroundColor: "#D65A4A", // Darker shade for hover effect
              color: "#fff",
            },
            padding: "0.5rem 1rem", // Smaller button size
          }}
        >
          About Me
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEmailClick}
          sx={{
            backgroundColor: "#E2725B", // Burnt Sienna color
            "&:hover": {
              backgroundColor: "#D65A4A", // Darker shade for hover effect
            },
            padding: "0.5rem 1rem",
          }}
        >
          Contact Me
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
