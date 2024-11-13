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
          <Grid item sx={{ color: "#8A8F99" }} size={{ md: 8, sm: 7, xs: 12 }}>
            <Typography sx={{ color: "#3C3C3C" }} variant="h4" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" gutterBottom component="p">
            I’m a Full-Stack Developer based in Los Angeles, CA, with a
              passion for creating digital experiences that are both
              user-friendly and technically sound. Over the past 5+ years, I’ve
              had the privilege to work with renowned companies like Apple and
              2U, bringing my expertise in UI/UX design and full-stack
              development to each project.
            </Typography>

            <Typography variant="body2" component="p">
            My journey into tech started with a curiosity for how things work
              behind the screen, leading me to pursue certifications and
              hands-on experiences. I’ve grown from supporting clients with
              technical issues at Apple’s Tower Theater to developing
              user-centered solutions for Apple’s marketing teams. Along the
              way, I’ve also taught coding and mentored students, igniting a
              passion for knowledge-sharing and collaboration.
            </Typography>

            {/* Skills and Expertise */}
            <Typography variant="h5" gutterBottom sx={{ color: "#3C3C3C" }}>
              My Skills at a Glance
            </Typography>
            <Typography variant="body2" component="p">
              I’m fluent in technologies like React.js, Node.js, and AWS, and I
              have experience with design and problem-solving in both front-end
              and back-end development. Whether it’s creating a seamless user
              interface or managing complex data with MongoDB and MySQL, I
              thrive on finding efficient, innovative solutions.
            </Typography>

            {/* Personal Interests */}
            <Typography variant="h5" gutterBottom sx={{ color: "#3C3C3C" }}>
              When I’m Not Coding...
            </Typography>
            <Typography variant="body2" component="p" gutterBottom >
              You’ll likely find me exploring new places, bouldering, or testing
              out the latest tech gadgets. I believe in a balanced life, and
              these hobbies give me fresh perspectives and inspiration that I
              bring back to my work.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
