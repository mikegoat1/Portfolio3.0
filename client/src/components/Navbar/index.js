import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tabs, Tab, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import MenuIcon from '@mui/icons-material/Menu';
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
};

const handleDownload = () => {
    const link = document.createElement('a');
    link.href = Resume;
    link.download = '10-31-24 Resume Coding .pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (location.pathname === '/about') {
            setValue(0);
        }
        if (location.pathname === '/work') {
            setValue(1);
        }
        // if (location.pathname === '/contact') {
        //     setValue(2);
        // }
        if (location.pathname === '/resume') {
            setValue(2);
        }
    }, [location]);

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
                <Typography variant="h1" sx={{ display: { xs: "none", sm: 'flex' } }} style={{ fontFamily: "Playfair Display", fontSize: "26px" }}>Michael L. Johnson</Typography>
                <Tabs value={value} sx={{ display: { xs: "none", sm: 'flex' } }} onChange={(e, newValue) => setValue(newValue)} >
                    <Tab label="About Me" component={Link} to="/about" sx={{ '&:hover': { color: '#6A7BA2' }, '&.Mui-selected': { color: '#6A7BA2' } }} />
                    <Tab label="Work" component={Link} to="/work" sx={{ '&:hover': { color: '#6A7BA2' }, '&.Mui-selected': { color: '#6A7BA2' } }} />
                    {/* <Tab label="Contact Me" component={Link} to="/contact" sx={{ '&:hover': { color: '#6A7BA2' }, '&.Mui-selected': { color: '#6A7BA2' } }} /> */}
                    <Tab label="Resume" component={Link} to="/resume" sx={{ '&:hover': { color: '#6A7BA2' }, '&.Mui-selected': { color: '#6A7BA2' } }} />
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
                <Typography variant="h1" style={{ fontFamily: "Playfair Display", fontSize: "26px" }}>Michael L. Johnson</Typography>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
                        <ListItemText primary="About Me" sx={{ color: '#3C3C3C' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/work" onClick={handleDrawerToggle}>
                        <ListItemText primary="Work" sx={{ color: '#3C3C3C' }} />
                    </ListItem>
                    {/* <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
                        <ListItemText primary="Contact Me" sx={{ color: '#3C3C3C' }} />
                    </ListItem> */}
                    <ListItem button onClick={handleDownload}>
                        <ListItemText primary="View Resume" sx={{ color: '#3C3C3C' }} />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default NavBar;