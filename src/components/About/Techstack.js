import React from "react";
import { Col, Row } from "react-bootstrap";
import C from "../../Assets/TechIcons/C++.svg";
import Java from "../../Assets/TechIcons/Java.svg";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Java} alt="Java" />
        <div className="tech-icons-text">Java</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={C} alt="C" />
        <div className="tech-icons-text">C</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div style={{ fontSize: "4rem", color: "#e34c26" }}>HTML</div>
        <div className="tech-icons-text">HTML</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div style={{ fontSize: "4rem", color: "#264de4" }}>CSS</div>
        <div className="tech-icons-text">CSS</div>
      </Col>
    </Row>
  );
}

export default Techstack;
