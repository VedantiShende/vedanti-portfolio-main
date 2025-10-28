import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a passionate IT student who loves building innovative web and app solutions. 
              I'm constantly learning and exploring new technologies to create impactful digital experiences.
              <br />
              <br />
              I'm proficient in
              <i>
                <b className="purple">
                  {" "}
                  Java, C, HTML, and CSS{" "}
                </b>
              </i>
              — and I'm continuously expanding my skill set in web development.
              <br />
              <br />
              My key areas of interest include developing
              <i>
                <b className="purple">
                  {" "}
                  Web Applications, Full-Stack Projects,{" "}
                </b>
              </i>
              and creating user-friendly interfaces that solve real-world problems.
              <br />
              <br />
              I love building projects with modern technologies and frameworks, 
              focusing on creating responsive and interactive web applications.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;

