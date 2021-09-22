import React from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero Image/inedx"
import ProfileHead from "../components/Username/index"
import Skills from "../components/SkillsComp/index"
import AboutMe from "../components/AboutContainer/index"


import { Container, Row, Col } from "react-bootstrap";

const styles = {
    marginTop: {
        marginTop: "100px",
        marginRight: "10px",
    },
    ColFlex: {
        display: "flex",
    },

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
                            <Col style={styles.ColFlex} md={7} >
                                <ProfileHead />
                                
                            </Col>
                            <Col md={5} >
                                <Skills style={styles.skillsWrap} />
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