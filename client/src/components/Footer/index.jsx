import React from "react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <Box sx={{ width: "100%", position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            backgroundColor: "#E7E9EC",
            "& .MuiBottomNavigationAction-root": {
              color: "#3C3C3C !important",
              "&:hover": {
                color: "#6A7BA2 !important",
              },
              "&.Mui-selected": {
                color: "#3C3C3C !important",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "#3C3C3C !important",
              "&:hover": {
                color: "#6A7BA2 !important",
              },
            },
          }}
        >
          <BottomNavigationAction
            label="LinkedIn"
            icon={<LinkedInIcon />}
            component="a"
            href="https://www.linkedin.com/in/michael-johnson-8b752790/"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            label="GitHub"
            icon={<GitHubIcon />}
            component="a"
            href="https://github.com/mikegoat1?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            label="Email"
            icon={<EmailIcon />}
            component="a"
            href="mailto:mikeg.o.a.t.1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Footer;
