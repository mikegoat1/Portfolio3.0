import React from "react";
import "./style.css";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero Image/inedx";
import ProfileHead from "../components/Username/index";
import Skills from "../components/SkillsComp/index";
import AboutMe from "../components/AboutContainer/index";
import Projects from "../components/ProjectCard/index";
import Footer from "../components/Footer/index";

import Quiz from "../Great-Quiz.png";
import Note from "../Note.png";
import Book from "../Google.png";

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
            <Container>
                <Row className="flex-row" >
                    <Col md={12} >
                        <Projects
                            name1="FliccPicker"
                            image1="https://mikegoat1.github.io/FliccPicker/assets/images/FLICCPICKER.png"
                            lang1="HTML5, CSS, jQuery, Ajax"

                            name2="Audio-Freq"
                            image2="https://audio-freq.herokuapp.com/AudioFreq_logo.png"
                            lang2="React, Express, Mongoose, MongoDB, Passport,React-bootstrap"
                        />
                    </Col>
                    <Col md={12} >
                        <Projects
                            name1="Ticket-Scalper"
                            image1="https://maple-eh-00291.herokuapp.com/images/ticket-scalper.png"
                            lang1="Handlebars, Sequelize, CSS, Sequelize, Javascript, Express-session, DotEnv"

                            name2="The Great Quiz"
                            image2={Quiz}
                            lang2="Javascript, jQuery, HTML5, CSS3"
                        />
                    </Col>
                    <Col md={12}>
                    <Projects
                        name1="Note Taker"
                        image1={Note}
                        lang1="Express, Path, HTML5, CSS3, jQuery"

                        name2="Google Books"
                        image2={Book}
                        lang2="React, Mongoose, Express, MongoDB, Axios"
                    />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
};

export default Home;