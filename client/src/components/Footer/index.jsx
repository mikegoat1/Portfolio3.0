import React from "react";
import "./style.css";

import Envelope from "../../assets/envelope.png";

import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <Container
      id="contact-me"
      className="footer-container d-flex justify-content-center text-align-center"
    >
      <Row>
        <Col md={12} className=" contact">
          {" "}
          Contacts
        </Col>
        <Col
          md={12}
          className="icons d-flex align-self-center justify-content-center"
        >
          {/* Linkedin */}
          <svg
            className="icons"
            width="33"
            height="32"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="https://www.linkedin.com/in/michael-johnson-8b752790/">
              <path
                d="M20.9166 0.593018H2.16174C1.30237 0.593018 0.604126 1.30103 0.604126 2.17017V20.8909C0.604126 21.76 1.30237 22.468 2.16174 22.468H20.9166C21.776 22.468 22.4791 21.76 22.4791 20.8909V2.17017C22.4791 1.30103 21.776 0.593018 20.9166 0.593018ZM7.21545 19.343H3.97327V8.90356H7.22034V19.343H7.21545ZM5.59436 7.47778C4.55432 7.47778 3.71448 6.63306 3.71448 5.5979C3.71448 4.56274 4.55432 3.71802 5.59436 3.71802C6.62952 3.71802 7.47424 4.56274 7.47424 5.5979C7.47424 6.63794 6.6344 7.47778 5.59436 7.47778V7.47778ZM19.3688 19.343H16.1266V14.2649C16.1266 13.054 16.1022 11.4963 14.442 11.4963C12.7526 11.4963 12.4938 12.8147 12.4938 14.177V19.343H9.25159V8.90356H12.3619V10.3293H12.4059C12.8405 9.50903 13.9 8.64478 15.4772 8.64478C18.7584 8.64478 19.3688 10.8079 19.3688 13.6204V19.343V19.343Z"
                fill="black"
              />
            </a>
          </svg>
          {/* GitHub */}
          <svg
            className="icons"
            width="33"
            height="30"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="https://github.com/mikegoat1?tab=repositories">
              <path
                d="M19.5312 0H2.34375C1.0498 0 0 1.0498 0 2.34375V19.5312C0 20.8252 1.0498 21.875 2.34375 21.875H19.5312C20.8252 21.875 21.875 20.8252 21.875 19.5312V2.34375C21.875 1.0498 20.8252 0 19.5312 0ZM13.54 18.7354C13.1299 18.8086 12.9785 18.5547 12.9785 18.3447C12.9785 18.0811 12.9883 16.7334 12.9883 15.6445C12.9883 14.8828 12.7344 14.3994 12.4365 14.1455C14.2432 13.9453 16.1475 13.6963 16.1475 10.5762C16.1475 9.6875 15.8301 9.24316 15.3125 8.67188C15.3955 8.46191 15.6738 7.59766 15.2295 6.47461C14.5508 6.26465 12.998 7.34863 12.998 7.34863C12.3535 7.16797 11.6553 7.0752 10.9668 7.0752C10.2783 7.0752 9.58008 7.16797 8.93555 7.34863C8.93555 7.34863 7.38281 6.26465 6.7041 6.47461C6.25977 7.59277 6.5332 8.45703 6.62109 8.67188C6.10352 9.24316 5.85938 9.6875 5.85938 10.5762C5.85938 13.6816 7.68066 13.9453 9.4873 14.1455C9.25293 14.3555 9.04297 14.7168 8.96973 15.2344C8.50586 15.4443 7.31934 15.8057 6.61133 14.5557C6.16699 13.7842 5.36621 13.7207 5.36621 13.7207C4.5752 13.7109 5.3125 14.2188 5.3125 14.2188C5.83984 14.4629 6.21094 15.4004 6.21094 15.4004C6.68457 16.8506 8.9502 16.3623 8.9502 16.3623C8.9502 17.041 8.95996 18.1445 8.95996 18.3447C8.95996 18.5547 8.81348 18.8086 8.39844 18.7354C5.17578 17.6563 2.91992 14.5898 2.91992 11.0059C2.91992 6.52344 6.34766 3.12012 10.8301 3.12012C15.3125 3.12012 18.9453 6.52344 18.9453 11.0059C18.9502 14.5898 16.7627 17.6611 13.54 18.7354ZM8.75 15.752C8.65723 15.7715 8.56934 15.7324 8.55957 15.6689C8.5498 15.5957 8.61328 15.5322 8.70605 15.5127C8.79883 15.5029 8.88672 15.542 8.89648 15.6055C8.91113 15.6689 8.84766 15.7324 8.75 15.752ZM8.28613 15.708C8.28613 15.7715 8.21289 15.8252 8.11523 15.8252C8.00781 15.835 7.93457 15.7813 7.93457 15.708C7.93457 15.6445 8.00781 15.5908 8.10547 15.5908C8.19824 15.5811 8.28613 15.6348 8.28613 15.708ZM7.61719 15.6543C7.59766 15.7178 7.5 15.7471 7.41699 15.7178C7.32422 15.6982 7.26074 15.625 7.28027 15.5615C7.2998 15.498 7.39746 15.4688 7.48047 15.4883C7.57812 15.5176 7.6416 15.5908 7.61719 15.6543ZM7.0166 15.3906C6.97266 15.4443 6.87988 15.4346 6.80664 15.3613C6.7334 15.2979 6.71387 15.2051 6.7627 15.1611C6.80664 15.1074 6.89941 15.1172 6.97266 15.1904C7.03613 15.2539 7.06055 15.3516 7.0166 15.3906ZM6.57227 14.9463C6.52832 14.9756 6.44531 14.9463 6.3916 14.873C6.33789 14.7998 6.33789 14.7168 6.3916 14.6826C6.44531 14.6387 6.52832 14.6729 6.57227 14.7461C6.62598 14.8193 6.62598 14.9072 6.57227 14.9463V14.9463ZM6.25488 14.4727C6.21094 14.5166 6.1377 14.4922 6.08398 14.4434C6.03027 14.3799 6.02051 14.3066 6.06445 14.2725C6.1084 14.2285 6.18164 14.2529 6.23535 14.3018C6.28906 14.3652 6.29883 14.4385 6.25488 14.4727ZM5.92773 14.1113C5.9082 14.1553 5.84473 14.165 5.79102 14.1309C5.72754 14.1016 5.69824 14.0479 5.71777 14.0039C5.7373 13.9746 5.79102 13.96 5.85449 13.9844C5.91797 14.0186 5.94727 14.0723 5.92773 14.1113Z"
                fill="black"
              />
            </a>
          </svg>
          {/* Twitter */}
          <svg
            className="icons"
            width="33"
            height="31"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="https://twitter.com/DJOwlEye">
              <path
                d="M20.4297 0.127441H3.24219C1.94824 0.127441 0.898438 1.17725 0.898438 2.47119V19.6587C0.898438 20.9526 1.94824 22.0024 3.24219 22.0024H20.4297C21.7236 22.0024 22.7734 20.9526 22.7734 19.6587V2.47119C22.7734 1.17725 21.7236 0.127441 20.4297 0.127441ZM18.042 7.88135C18.0518 8.01807 18.0518 8.15967 18.0518 8.29639C18.0518 12.5298 14.8291 17.4077 8.94043 17.4077C7.12402 17.4077 5.43945 16.8804 4.02344 15.9722C4.28223 16.0015 4.53125 16.0112 4.79492 16.0112C6.29395 16.0112 7.6709 15.5034 8.76953 14.644C7.36328 14.6147 6.18164 13.6919 5.77637 12.4224C6.26953 12.4956 6.71387 12.4956 7.22168 12.3638C5.75684 12.0659 4.6582 10.7769 4.6582 9.21924V9.18018C5.08301 9.41943 5.58105 9.56592 6.10352 9.58545C5.66427 9.29328 5.30419 8.89691 5.05541 8.43172C4.80662 7.96652 4.67687 7.44697 4.67773 6.91943C4.67773 6.32373 4.83398 5.77686 5.1123 5.30322C6.68945 7.24658 9.05762 8.51611 11.7139 8.65283C11.2598 6.47998 12.8857 4.71729 14.8389 4.71729C15.7617 4.71729 16.5918 5.10303 17.1777 5.72803C17.9004 5.59131 18.5937 5.32275 19.209 4.95654C18.9697 5.69873 18.4668 6.32373 17.8027 6.71924C18.4473 6.65088 19.0723 6.47021 19.6484 6.22119C19.2139 6.86084 18.667 7.42725 18.042 7.88135Z"
                fill="black"
              />
            </a>
          </svg>
          {/* Email */}
          <a href="mailto:mikeg.o.a.t.1@gmail.com">
            <img className="envelope" src={Envelope} alt="Envelope icon" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
