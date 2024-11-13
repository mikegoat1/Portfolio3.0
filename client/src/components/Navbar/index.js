import React, { useState } from "react";
import "./stye.module.css";
import { AiOutlineDownload } from "react-icons/ai";
import { Box, Tabs, Tab, Typography, AppBar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Resume from "../../assets/10-31-24 Resume Coding .pdf";



const styles = {
    navBar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "1%",
        backgroundColor: "#E7E9EC",
        color: "#3C3C3C",
        alignItems: "center",
    },
}
const handleDownload = () => {
    const link = document.createElement('a');
    link.href = Resume;
    link.download = '10-31-24 Resume Coding .pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const NavBar = () => {
    // Plan: Refactor each tab to navigate to a dedicated screen/component for better organization and maintainability.
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [value, setValue] = useState(0);


    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
        <AppBar position="static"
            sx={{
                '--AppBar-background': "#E7E9EC",
                '--AppBar-color': "#3C3C3C",
                backgroundColor: 'var(--AppBar-background)',
                color: 'var(--AppBar-color)',
            }}>
            <Box style={styles.navBar}>
                <Typography variant="h1" sx={{ display: { xs: "none", sm: 'flex' } }} style={{ fontFamily: "Inter", fontSize: "26px" }}>Michael L. Johnson</Typography>
                <Tabs value={value} sx={{ display: { xs: "none", sm: 'flex' } }} onChange={(newValue) => setValue(newValue)} >
                    <Tab label="About Me" component={Link} to="/"/>
                    <Tab label="Work" component={Link} to="/work" />
                    <Tab label="Contact Me" component={Link} to="#footer" />
                    <Tab label="Resume" component={Link} to="/resume" />
                    <Tab label={<AiOutlineDownload />} onClick={handleDownload} />
                </Tabs>
            </Box>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ backgroundColor: '#E7E9EC', display: { xs: 'flex', sm: 'none', justifyContent: 'space-between' } }}
            >
                <Typography variant="h1" style={{ fontFamily: "Inter", fontSize: "26px" }}>Michael L. Johnson</Typography>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    <ListItem button component={Link} to="/" >
                        <ListItemText primary="About Me" />
                    </ListItem>
                    <ListItem button component={Link} to="/work">
                        <ListItemText primary="Work" />
                    </ListItem>
                    <ListItem button component={Link} to="#footer">
                        <ListItemText primary="Contact Me" />
                    </ListItem>
                    <ListItem button onClick={handleDownload}>
                        <ListItemText primary="View Resume" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>

    );
}

export default NavBar;