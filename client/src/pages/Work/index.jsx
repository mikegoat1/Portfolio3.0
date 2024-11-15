import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import Quiz from "../../assets/Great-Quiz.png";
import Ticket from "../../assets/ticket-scalper.png";
import Flicc from "../../assets/FLICCPICKER.png";

// I want to create a landing page first, then have the user navigate to the about me page.

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "#F4F4F4",
    boxShadow: "0 4px 8px rgba(138, 143, 153, 0.2)",
    border: "1px solid #8A8F99",
  },
  media: {
    height: 140,
  },
  description: {
    color: "#8A8F99",
  },
  chip: {
    backgroundColor: "#A8BCA1", // Dusty Sage background color for tags
    color: "#3C3C3C", // Charcoal color for the text
    marginRight: 4,
    marginBottom: 4,
  },
});

const projects = [
  {
    title: "Project 1",
    description: "This is a description of project 1.",
    image: "https://via.placeholder.com/140",
    link: "#",
    gitHub: "#",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Flick Picker",
    description: "Ticket-Scalper is a ticket search platform that dynamically aggregates sports, concert, and theater ticket listings from over 60 ticketing sites, offering a seamless and comprehensive browsing experience.",
    image: Flicc,
    link: "https://mikegoat1.github.io/FliccPicker/",
    gitHub: "https://github.com/RandonRussell85/FliccPicker",
    tags: ["Handlebars", "Sequelize", "CSS3", "Sequelize", "Javascript", "Express-session","DotEnv"],
  },
  {
    title: "Ticket Scalper",
    description: "Ticket-Scalper is a ticket search platform that dynamically aggregates sports, concert, and theater ticket listings from over 60 ticketing sites, offering a seamless and comprehensive browsing experience.",
    image: Ticket,
    link: "https://maple-eh-00291.herokuapp.com",
    gitHub: "https://github.com/mikegoat1/Ticket-Scalper",
    tags: ["Handlebars", "Sequelize", "CSS3", "Sequelize", "Javascript", "Express-session","DotEnv"],
  },
  {
    title: "The Great Quiz",
    description:
      "A dynamic card component created using a blend of vanilla JavaScript, jQuery, HTML, and CSS, showcasing interactive content and styles for a responsive user experience.",
    image: Quiz,
    gitHub: "https://github.com/mikegoat1/The-Great-Quiz",
    tags: ["Javascript", "jQuery", "HTML5", "CSS3"],
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
        Recent Work
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "#3C3C3C", fontWeight: "bold" }}
                >
                  {project.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {project.description}
                </Typography>
                <div>
                  {project.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      className={classes.chip}
                      size="small"
                      sx={{ backgroundColor: "#A8BCA1", color: "#3C3C3C" }}
                    />
                  ))}
                </div>
              </CardContent>
              <CardActions>
                <IconButton
                  href={project.gitHub}
                  sx={{ color: "#E2725B" }}
                  aria-label="GitHub Link"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href={project.link}
                  sx={{ color: "#E2725B" }}
                  aria-label="Host Link"
                >
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
