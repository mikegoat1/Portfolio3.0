import React from "react";

import { BottomNavigation, BottomNavigationAction, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { LINKEDIN_URL, GITHUB_URL, EMAIL_HREF } from "../../config/site";

// Static (in-flow) footer. Previously position:fixed, which overlapped
// page content and could obscure focused elements (WCAG 2.4.11). Now it
// sits below content and reserves its own space.
const Footer = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <Box
        sx={{
          px: "var(--space-4)",
          py: "var(--space-4)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "var(--space-3)",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Typography
          component="p"
          sx={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}
        >
          Need full-stack or AWS support?
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/contact"
          sx={{
            color: "var(--text)",
            borderColor: "var(--border)",
            fontFamily: "var(--font-ui)",
            "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" },
          }}
        >
          Start a Project
        </Button>
      </Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: "var(--surface)",
          "& .MuiBottomNavigationAction-root": {
            color: "var(--text-muted)",
            "&:hover": { color: "var(--accent)" },
            "&.Mui-selected": { color: "var(--text)" },
          },
          "& .MuiSvgIcon-root": {
            color: "inherit",
          },
        }}
      >
        <BottomNavigationAction
          label="LinkedIn"
          icon={<LinkedInIcon />}
          component="a"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        />
        <BottomNavigationAction
          label="GitHub"
          icon={<GitHubIcon />}
          component="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        />
        <BottomNavigationAction
          label="Email"
          icon={<EmailIcon />}
          component="a"
          href={EMAIL_HREF}
          target="_blank"
          rel="noopener noreferrer"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
