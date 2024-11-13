import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const styles = {
    sizeFont: {
        fontSize: 10

    }
}


function Skills() {

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <ul style={styles.sizeFont} >
                        <li>React.js</li>
                        <li>Bootstrap</li>
                        <li>HTML5</li>
                        <li>NodeJS</li>
                        <li>MongoDB</li>
                        <li>MySQL</li>
                    </ul>
                </Col>
                <Col md={6}>
                    <ul style={styles.sizeFont} >
                        <li>HandleBars</li>
                        <li>Sequelize</li>
                        <li>AWS</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>#C</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Skills; 