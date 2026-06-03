import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import backgroundImage from "../../assets/background.jpg";
import { projects } from "../../data/projects";
import PageBackground from "../../components/PageBackground";


// I want to create a landing page first, then have the user navigate to the about me page.

const cardSx = {
  maxWidth: 345,
  backgroundColor: "#F4F4F4",
  boxShadow: "0 4px 8px rgba(138, 143, 153, 0.2)",
  border: "1px solid #8A8F99",
};
const mediaSx = {
  height: 140,
};
const chipSx = {
  backgroundColor: "#A8BCA1",
  color: "#3C3C3C",
  marginRight: "4px",
  marginBottom: "4px",
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const Work = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        marginTop: "5rem",
        marginBottom: "5rem",
      }}
    >
      <PageBackground image={backgroundImage} opacity={0.3} backgroundSize="cover" />
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center" }}
        gutterBottom
        marginBottom="4rem"
      >
        Recent Work
      </Typography>
      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {projects.map((project, index) => (
          <Grid2 item size={{ md: 4, sm: 6, xs: 12 }} key={index}>
            <Card sx={cardSx}>
              <CardMedia
                sx={mediaSx}
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
                <div>
                  {project.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={chipSx}
                    />
                  ))}
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  href={project.gitHub}
                  sx={{ color: "#E2725B" }}
                  aria-label="GitHub Link"
                >
                  <GitHubIcon />
                </IconButton>
                {project.link ? (
                  <IconButton
                    href={project.link}
                    sx={{ color: "#E2725B" }}
                    aria-label="Host Link"
                  >
                    <WebIcon />
                  </IconButton>
                ) : null}
                <ExpandMore
                  alignItems="end"
                  expand={expanded === index}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded === index}
                  aria-label="show more"
                  sx={{ alignSelf: "flex-end" }}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {project.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Work;
