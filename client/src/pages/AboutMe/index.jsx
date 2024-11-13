import React from "react";
import "./style.css";
import { Container, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";

const styles = {
  marginTop: {
    marginTop: "100px",
    marginRight: "10px",
  },
  ColFlex: {
    display: "flex",
  },
};

function Home() {
  //I want the COL to get there own row at this min

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={9} alignItems="center">
          {/* Left Side: Image */}
          <Grid size={{ md: 4, sm: 5, xs: 12 }} item>
            <Avatar
              src={require("../../assets/IMG_1411 2.jpg")} // Replace with your image path
              alt="Michael Johnson"
              sx={{ width: "100%", height: "auto", borderRadius: 2 }}
            />
          </Grid>

          {/* Right Side: About Me Text */}
          <Grid item size={{ md: 8, sm: 7, xs: 12 }}>
            <Typography variant="h4" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" component="p">
              Hello! I'm [Your Name], a [Your Job Title or Specialization]. With
              a passion for creating meaningful digital experiences, I
              specialize in [Your Skills/Field of Expertise].
            </Typography>
            <Typography variant="body1" component="p">
              Over the years, I've honed my skills in [mention key skills, e.g.,
              user-centered design, interaction design, front-end development,
              etc.], allowing me to bring innovative solutions to each project.
              Whether I'm designing a mobile app or an e-commerce website, I
              focus on understanding user needs to create intuitive and
              impactful experiences.
            </Typography>
            <Typography variant="body1" component="p">
              When I'm not working, I enjoy [mention hobbies or interests that
              reflect your personality and relatability, e.g., photography,
              traveling, or reading up on the latest in tech trends]. I'm always
              eager to take on new challenges and continue learning in this
              dynamic field.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
