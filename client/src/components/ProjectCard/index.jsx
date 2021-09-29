import React from "react";
import "./style.css"
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { Image } from "react-bootstrap";
import { Button } from "react-bootstrap";




function Projects({name1,name2,image1,image2,lang1,lang2}) {



    return (
        <Container className="project-section-container" >
            <Row>

                <Col >
                    <Row className="project-container" >
                        <Col md={6}>
                            <Image
                                className="project-image"
                                src={image1}
                                alt={name1}
                            ></Image>
                        </Col>
                        <Col md={6} >
                            <Row className="project-info-container" >
                                <Col md={12} className="p-2 project-title " >
                                    <h4><u> Title: </u> <span>{name1}</span> </h4>
                                    <h4><u>Languages:</u></h4>
                                    <h6>{lang1}</h6>
                                </Col>
                                <Col md={12} className="justify-content-around d-flex align-items-center" >
                                    <Button className="project-button" href="https://github.com/RandonRussell85/FliccPicker">GitHub</Button>
                                    <Button className="project-button" href="https://mikegoat1.github.io/FliccPicker/">Deployed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col >
                    <Row className="project-container" >
                        
                        <Col md={6}>
                            <Image
                                className="project-image"
                                src={image2}
                                alt={name2}
                            ></Image>
                        </Col>
                        <Col md={6}>
                            <Row className="project-info-container" >
                                <Col md={12} className="p-2 project-title " >
                                    <h4><u> Title:</u> <span>{name2}</span> </h4>
                                    <h4><u>Languages:</u></h4>
                                    <h6>{lang2}</h6>
                                </Col>
                                <Col md={12} className="justify-content-around d-flex align-items-center" >
                                    <Button className="project-button" href="https://github.com/chrischo94/audioFreq">GitHub</Button>
                                    <Button className="project-button" href="https://audio-freq.herokuapp.com">Deployed</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                
            </Row>
        </Container>

    );
}

export default Projects;