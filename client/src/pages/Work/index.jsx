import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
import { projects } from "../../data/projects";
import PageBackground from "../../components/PageBackground";
import GitHubActivity from "../../components/GitHubActivity";
import Seo from "../../components/Seo";

// Derive an editor-style filename from a project title, e.g.
// "The Event" -> "the-event.tsx". Pure, data-driven (no hardcoding).
const toFileName = (title) =>
  `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}.tsx`;

// Card reads as a code-editor panel: --surface "tab strip" + body, lifted
// off --bg by --border (no drop shadow on dark — elevation via tint/border).
const cardSx = {
  backgroundColor: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  boxShadow: "none",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "border-color var(--dur-fast) var(--ease)",
  "&:hover": { borderColor: "var(--accent)" },
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  color: "var(--text-muted)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: { transform: "rotate(0deg)" },
    },
    {
      props: ({ expand }) => !!expand,
      style: { transform: "rotate(180deg)" },
    },
  ],
}));

const Work = () => {
  const [expanded, setExpanded] = useState(null);

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
      <PageBackground variant="grid" />

      <Seo
        title="Work"
        description="Selected projects and current contract work by Michael Johnson — Qubee, React, Node.js, GraphQL, AWS, MongoDB, and media-processing workflows."
        path="/work"
      />

      {/* Section header as a terminal prompt */}
      <Box sx={{ textAlign: "center", mb: "4rem" }}>
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
          ls ~/projects
        </Box>
        <Typography
          variant="h4"
          sx={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}
        >
          Recent Work
        </Typography>
      </Box>

      <Grid2 container spacing={4} justifyContent="center" alignItems="stretch">
        {projects.map((project, index) => (
          <Grid2 item size={{ md: 4, sm: 6, xs: 12 }} key={index}>
            <Card sx={cardSx}>
              {/* File-tab header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  px: "var(--space-3)",
                  py: "var(--space-2)",
                  borderBottom: "1px solid var(--border)",
                  backgroundColor: "var(--bg)",
                }}
              >
                {/* traffic-light dots, drawn from tokens */}
                <Box sx={{ display: "flex", gap: "6px" }} aria-hidden="true">
                  {["var(--accent)", "var(--accent-2)", "var(--text-muted)"].map(
                    (c, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: c,
                          opacity: 0.85,
                        }}
                      />
                    )
                  )}
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    ml: "0.25rem",
                  }}
                >
                  {toFileName(project.title)}
                </Box>
              </Box>

              <CardMedia
                sx={{ height: 140 }}
                image={project.image}
                title={project.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontFamily: "var(--font-ui)",
                    color: "var(--text)",
                    fontWeight: 700,
                  }}
                >
                  {project.title}
                </Typography>

                {project.context ? (
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      mb: "var(--space-2)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--accent-2)",
                    }}
                  >
                    {`// ${project.context}`}
                  </Box>
                ) : null}

                {/* Tags as a mono import statement */}
                <Box
                  sx={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    lineHeight: 1.6,
                  }}
                >
                  <Box component="span" sx={{ color: "var(--accent-2)" }}>
                    import
                  </Box>{" "}
                  <Box component="span" sx={{ color: "var(--text)" }}>
                    {"{ "}
                  </Box>
                  {project.tags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <Box component="span" sx={{ color: "var(--accent)" }}>
                        {tag}
                      </Box>
                      {i < project.tags.length - 1 ? (
                        <Box component="span" sx={{ color: "var(--text-muted)" }}>
                          ,{" "}
                        </Box>
                      ) : null}
                    </React.Fragment>
                  ))}
                  <Box component="span" sx={{ color: "var(--text)" }}>
                    {" }"}
                  </Box>
                </Box>
              </CardContent>

              {/* Editor toolbar: external links + expand */}
              <CardActions
                disableSpacing
                sx={{ borderTop: "1px solid var(--border)" }}
              >
                {project.gitHub ? (
                  <IconButton
                    href={project.gitHub}
                    sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--accent)" } }}
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon />
                  </IconButton>
                ) : null}
                {project.link ? (
                  <IconButton
                    href={project.link}
                    sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--accent)" } }}
                    aria-label={`Live site for ${project.title}`}
                  >
                    <WebIcon />
                  </IconButton>
                ) : null}
                {!project.gitHub && !project.link ? (
                  <Box
                    component="span"
                    sx={{
                      px: "var(--space-2)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    private client work
                  </Box>
                ) : null}
                <ExpandMore
                  expand={expanded === index}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded === index}
                  aria-label={
                    expanded === index
                      ? `Hide details for ${project.title}`
                      : `Show details for ${project.title}`
                  }
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <CardContent sx={{ borderTop: "1px solid var(--border)" }}>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}
                  >
                    {/* leading comment marker to keep the editor metaphor */}
                    <Box
                      component="span"
                      sx={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                    >
                      {"// "}
                    </Box>
                    {project.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Live GitHub activity */}
      <GitHubActivity />
    </Container>
  );
};

export default Work;
