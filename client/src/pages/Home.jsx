import React from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero Image/inedx"
import ProfileHead from "../components/Username/index"
import AboutMe from "../components/AboutContainer/index"

import { Container, Row, Col } from "react-bootstrap";

const styles = {
    marginTop: {
        marginTop: "100px",
        marginRight: "10px",
    }
};


function Home() {






    return (
        <div>
            <NavBar />
            <Container>
                <Row style={styles.marginTop} >
                    <Col md={6}>
                        <Hero />
                    </Col>
                    <Col md={6} >
                        <Row>
                            <Col md={12} >
                                <ProfileHead />
                            </Col>
                            <Col>
                                <AboutMe md={12} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Home;