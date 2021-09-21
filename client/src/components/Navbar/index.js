import React, { useState, useEffect } from "react";
import "./style.css"
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap"; 



const styles = {
    NavBackground: {
        backgroundColor: "#FFB830",
        width: "100%",
        height: "97px",
        top: "0px",
        left: "0px",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        fontFamily: "Rozha One",
    },
    name: {
        justifyContent: "start",
        fontSize: "26px", 
    },
    item: {
        fontSize: "18px",
        lineHeight: "26px",
        margin: "0 5px",
        justifyContent: "end",
        color:"black"

    }

};
function NavBar() {






    return (
        <Navbar style={styles.NavBackground} >

            <Container>

                <Row className="d-flex flex-grow-1 " >
                    {/* Name  */}
                    <Col md={6} >
                        <Navbar.Brand style={styles.name} className="text-left"> Michael L. Johnson</Navbar.Brand>
                    </Col>
                    {/* Items  */}
                    <Col md={6} className="text-right" >
                        <Nav style={styles.item} className="decoration-decoration-none color" >
                            <Nav.Link style={{color:"black"}} href="#about-me" >About-Me</Nav.Link>
                            <Nav.Link style={{color:"black"}} href="#work" > Work </Nav.Link>
                            <Nav.Link style={{color: "black"}} > Contact-Me </Nav.Link>
                            <Nav.Link style={{color: "black"}}  > Resume </Nav.Link>
                            <Nav.Link style={{color: "black"}} >Icon</Nav.Link>
                        </Nav>
                    </Col>

                </Row>
            </Container>
        </Navbar>
    );
}

export default NavBar;