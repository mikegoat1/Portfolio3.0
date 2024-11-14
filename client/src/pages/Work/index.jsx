import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

// I want to create a landing page first, then have the user navigate to the about me page.

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const projects = [
  {
    title: "Project 1",
    description: "This is a description of project 1.",
    image: "https://via.placeholder.com/140",
    link: "#",
  },
  {
    title: "Project 2",
    description: "This is a description of project 2.",
    image: "https://via.placeholder.com/140",
    link: "#",
  },
  {
    title: "Project 3",
    description: "This is a description of project 3.",
    image: "https://via.placeholder.com/140",
    link: "#",
  },
];
const Work = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" sx={{display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",}}>
      <Typography variant="h4" sx={{ display: "flex", justifyContent: "center"}} gutterBottom>
        My Projects
      </Typography>
      <Grid2 container spacing={4}>
        {projects.map((project, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={project.image}
                title={project.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={project.link}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Work;
