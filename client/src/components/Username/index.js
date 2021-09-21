import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

import image from "../../Me.jpg"

const styles = {
    profileImage: {
        height: "76px",
        width: "72px",
        flex: 0,
    },
    containerProfile: {
        border: " 2px solid #000000",
        width: "332px",
        height: "92px",
        padding: "3px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    proffession: {
        lineHeight:"80px", 
        fontSize: "14px",
    }

}

function ProfileHeading() {
    return (
        <Container style={styles.containerProfile} >
            <Row>
                <Col className="imageFlex" style={{ flex: 0 }} >
                    <Image style={styles.profileImage} src={image} roundedCircle />
                </Col>
                <Col style={{ flex: 1 }}  >
                    <h4 style={styles.proffession} >Full-stack Developer</h4>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileHeading;