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


//I want the COL to get there own row at this min 



    return (
        <div>
            <NavBar />
            <Container>
                <Row style={styles.marginTop}  >
                    <Col lg={6}  className="hero-media" sm >
                        <Hero/>
                    </Col>
                    <Col lg={6}  sm >
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
            <Container id="work" >
                <Row className="flex-row" >
                    <Col md={12} >
                        <Projects
                            name1="FliccPicker"
                            image1="https://mikegoat1.github.io/FliccPicker/assets/images/FLICCPICKER.png"
                            lang1="HTML5, CSS, jQuery, Ajax"
                            link1="https://github.com/RandonRussell85/FliccPicker"
                            deploy1="https://mikegoat1.github.io/FliccPicker/"

                            name2="Audio-Freq"
                            image2="https://audio-freq.herokuapp.com/AudioFreq_logo.png"
                            lang2="React, Express, Mongoose, MongoDB, Passport,React-bootstrap"
                            link2="https://github.com/chrischo94/audioFreq"
                            deploy2="https://audio-freq.herokuapp.com"
                        />
                    </Col>
                    <Col md={12} >
                        <Projects
                            name1="Ticket-Scalper"
                            image1="https://maple-eh-00291.herokuapp.com/images/ticket-scalper.png"
                            lang1="Handlebars, Sequelize, CSS, Sequelize, Javascript, Express-session, DotEnv"
                            link1="https://github.com/mikegoat1/Ticket-Scalper"
                            deploy1="https://maple-eh-00291.herokuapp.com" 

                            name2="The Great Quiz"
                            image2={Quiz}
                            lang2="Javascript, jQuery, HTML5, CSS3"
                            link2= "https://github.com/mikegoat1/The-Great-Quiz"
                            deploy2="https://mikegoat1.github.io/The-Great-Quiz/"
                        />
                    </Col>
                    <Col md={12}>
                    <Projects
                        name1="Note Taker"
                        image1={Note}
                        lang1="Express, Path, HTML5, CSS3, jQuery"
                        link1="https://github.com/mikegoat1/Lets-Take-Notes"
                        deploy1="https://tranquil-headland-79814.herokuapp.com"


                        name2="Google Books"
                        image2={Book}
                        lang2="React, Mongoose, Express, MongoDB, Axios"
                        link2= "https://github.com/mikegoat1/GoogleB"
                        deploy2="https://secure-beyond-11669.herokuapp.com" 
                    />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
};

export default Home;