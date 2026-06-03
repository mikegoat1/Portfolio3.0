import React from "react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
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
      }}
    >
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
