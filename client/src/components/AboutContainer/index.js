import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
const styles = {
    containerBackground: {
        backgroundColor: "#FFEDDA",
        width: "571px",
        height:"301px",
        opacity: 0.8,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        marginTop: "60px", 
        marginLeft: "3px", 
        color: "black"
    }, 
    descriptionMargin:{
        marginBottom: 7, 
        paddingTop: 8, 
        color:"black"
    }
}

function AboutMe() {
    return (
        <Container style={styles.containerBackground} >
            <Row style={styles.descriptionMargin}> 
                Description
                </Row> 
                <Row>
                    <Col style={{fontSize: "14px"}} >
                    Full-stack Developer in creating and managing websites. Recently earned a Certificate in Full-stack Development from UCLA, expanding skills in HTML, CSS, React, NoSql, MySQL, Bootstrap, and JavaScript. I pride myself on persistence, patience and adaptation to new and challenging environments. During my time at UCLA, I served as a project manager to multiple groups, helping to establish weekly goals as well as strategies and timelines for accomplishing those goals. The freedom of coding and the discipline of utilizing a new competency to make it run efficiently not only excites but motivates me. Passionate about creating life-enhancing user experiences and collaborating with others to develop meaningful mobile and web applications. My professional background in technologies and other mediums, also my drive for problem solving makes me a great piece to add to any organization.
                    </Col>
                </Row>
        </Container>
    );
}

export default AboutMe;