import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tabs, Tab, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from '../ThemeToggle';
import Resume from "../../assets/10-31-24 Resume Coding .pdf";

const styles = {
    navBar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 1.5rem",
        backgroundColor: "var(--surface)",
        color: "var(--text)",
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
    },
};

// Terminal-prompt brand mark: green prompt glyph + mono name.
const brandSx = {
    fontFamily: "var(--font-mono)",
    fontSize: "18px",
    fontWeight: 600,
    color: "var(--text)",
    letterSpacing: "-0.01em",
};

const tabSx = {
    fontFamily: "var(--font-ui)",
    color: "var(--text-muted)",
    '&:hover': { color: 'var(--accent)' },
    '&.Mui-selected': { color: 'var(--accent)' },
};

const handleDownload = () => {
    const link = document.createElement('a');
    link.href = Resume;
    link.download = '10-31-24 Resume Coding .pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Brand = () => (
    <Typography component="span" sx={brandSx}>
        <Box component="span" sx={{ color: 'var(--accent)' }}>~/</Box>
        michael-l-johnson
    </Typography>
);

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const [value, setValue] = useState(false);

    useEffect(() => {
        const map = { '/about': 0, '/work': 1, '/contact': 2, '/resume': 3 };
        const next = map[location.pathname];
        setValue(next === undefined ? false : next);
    }, [location]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="static" elevation={0}
            sx={{
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                backgroundImage: 'none',
            }}>
            <Box style={styles.navBar}>
                <Box component={Link} to="/" sx={{ display: { xs: "none", sm: 'flex' }, textDecoration: 'none' }}>
                    <Brand />
                </Box>
                <Box sx={{ display: { xs: "none", sm: 'flex' }, alignItems: 'center', gap: '0.5rem' }}>
                    <Tabs
                        value={value}
                        onChange={(e, newValue) => setValue(newValue)}
                        TabIndicatorProps={{ sx: { backgroundColor: 'var(--accent)' } }}
                    >
                        <Tab label="About" component={Link} to="/about" sx={tabSx} />
                        <Tab label="Work" component={Link} to="/work" sx={tabSx} />
                        <Tab label="Contact" component={Link} to="/contact" sx={tabSx} />
                        <Tab label="Resume" component={Link} to="/resume" sx={tabSx} />
                        <Tab value="download" label={<AiOutlineDownload aria-label="Download resume" />} onClick={handleDownload} sx={tabSx} />
                    </Tabs>
                    <ThemeToggle />
                </Box>
            </Box>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--surface)',
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                <Box component={Link} to="/" sx={{ textDecoration: 'none' }}>
                    <Brand />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeToggle />
                    <IconButton
                        color="inherit"
                        aria-label="open navigation menu"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ color: 'var(--text)' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Box>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{ sx: { backgroundColor: 'var(--surface)', color: 'var(--text)' } }}
            >
                <List>
                    <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
                        <ListItemText primary="About" sx={{ color: 'var(--text)' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/work" onClick={handleDrawerToggle}>
                        <ListItemText primary="Work" sx={{ color: 'var(--text)' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
                        <ListItemText primary="Contact" sx={{ color: 'var(--text)' }} />
                    </ListItem>
                    <ListItem button onClick={handleDownload}>
                        <ListItemText primary="View Resume" sx={{ color: 'var(--text)' }} />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default NavBar;
