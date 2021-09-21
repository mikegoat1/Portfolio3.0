import React from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero Image/inedx"
import ProfileHead from "../components/Username/index"

import { Container, Row, Col } from "react-bootstrap";

const styles = {
    marginTop:{
        marginTop:"100px", 
        marginRight:"10px",
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
                        <ProfileHead/>

                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Home;