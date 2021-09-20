import React, { useState, useEffect } from "react";
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
        justifyContent: "start"
    },
    item: {
        fontSize: "18px",
        lineHeight: "26px",

    }

};






function NavBar() {






    return (
        <Navbar style={styles.NavBackground} >

            <Container>

                <Row className="d-flex flex-grow-1 " >
                    {/* Name  */}
                    <Col style={styles.name} >
                        <Navbar.Brand className="text-left"> Michael L. Johnson</Navbar.Brand>
                    </Col>

                    <Col style={styles.item} className="text-right" >
                        <Nav>
                            <Nav.Link >About-Me</Nav.Link>
                        </Nav>
                    </Col>

                    <Col style={styles.item} className="text-right" >
                        save Btn
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default NavBar;