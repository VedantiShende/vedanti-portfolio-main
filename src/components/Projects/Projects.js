import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="MERN Expense Tracker"
              description="A Personal Finance Management App built with the MERN stack. Features user authentication (JWT) and complete CRUD operations for secure expense handling. Designed interactive dashboards with charts to track income and spending. Deployed with a responsive design and smooth frontend-backend integration."
              ghLink="#"
              demoLink="#"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
