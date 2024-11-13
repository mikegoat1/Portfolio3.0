import React, { useState } from "react";
import "./stye.module.css";
import { AiOutlineDownload } from "react-icons/ai";
import { Box, Tabs, Tab, Typography, AppBar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from "prop-types";
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
    // I am going to make a screen for each tab going forward with the refactor.
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
        <AppBar position="static">
            <Box style={styles.navBar}>
                <Typography variant="h1" style={{ fontFamily: "Inter", fontSize: "26px" }}>Michael L. Johnson</Typography>
                <Tabs value={0} sx={{ display: { xs: "none", sm: 'flex' } }} >
                    <Tab label="About Me" value={0} />
                    <Tab label="Work" value={1} />
                    <Tab label="Contact Me" value={2} />
                    <Tab label="Resume" value={3} />
                    <Tab label={<AiOutlineDownload />} value={4} onClick={handleDownload} />
                </Tabs>
            </Box>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </List>
            </Drawer>
            {/* <Navbar style={stylez.NavBackground} >

                <Container className="container" >
                    <Row className="navbar-container" >
]                        <Col md={6} >
                            <Navbar.Brand style={stylez.name} className="text-left"> Michael L. Johnson</Navbar.Brand>
                        </Col>
                        <Col md={6} className="text-right adjustment" >
                            <Nav style={stylez.item} className="decoration-decoration-none color" >
                                <Nav.Link style={{ color: "black" }} href="#about-me" >About-Me</Nav.Link>
                                <Nav.Link style={{ color: "black" }} href="#work" > Work </Nav.Link>
                                <Nav.Link style={{ color: "black" }} href="#contact-me" > Contact-Me </Nav.Link>
                                <Nav.Link style={{ color: "black" }} href={Resume} > Resume </Nav.Link>
                                <Nav.Link style={{ color: "black" }} href={Resume} download={Resume} > <AiOutlineDownload /> </Nav.Link>
                            </Nav>
                        </Col>

                    </Row>
                </Container>
            </Navbar> */}
        </AppBar>

    );
}

export default NavBar;