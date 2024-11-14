import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from '@mui/icons-material/Web';
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
    gitHub: "#",
  },
  {
    title: "Project 2",
    description: "This is a description of project 2.",
    image: "https://via.placeholder.com/140",
    link: "#",
    gitHub: "#",

  },
  {
    title: "Project 3",
    description: "This is a description of project 3.",
    image: "https://via.placeholder.com/140",
    link: "#",
    gitHub: "#",
  },
];
const Work = () => {
  const classes = useStyles();
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
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
        gutterBottom
      >
        My Projects
      </Typography>
      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {projects.map((project, index) => (
          <Grid2 item size={{ md: 4, sm: 6, xs: 12 }} key={index}>
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
                <IconButton href={project.gitHub} aria-label="GitHub Link">
                    <GitHubIcon />
                </IconButton>
                <IconButton href={project.link} aria-label="Host Link">
                    <WebIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Work;
