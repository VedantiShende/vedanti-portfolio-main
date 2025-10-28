import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

function ResumeNew() {
  const handleDownload = () => {
    const resumeContent = `
VEDANTI SHENDE
9145292931 | vedantishende963@gmail.com
Portfolio: [Your Portfolio URL] | GitHub: [Your GitHub URL] | LinkedIn: [Your LinkedIn URL]

CAREER OBJECTIVE
Passionate about leveraging technology to create innovative solutions, I seek to apply my skills in Web & App Development, to drive impactful digital experiences and continuous learning.

EDUCATION
• Degree in Information Technology | 2023-2026 | Govindrao Wanjari College Of Engineering & Technology | CGPA: 7.33/10
• Class 12 (HSC) | 2022 | Dr. B. R. Ambedkar College, Hinganghat | Percentage: 78.67%
• Class 10 (SSC) | 2020 | Dr. B. R. Ambedkar School, Hinganghat | Percentage: 86.60%

TECHNICAL SKILLS
• Programming Languages: Java, C, HTML, CSS

PROJECTS
MERN Expense Tracker | A Personal Finance Management App | GitHub Link
• Added user authentication (JWT) and complete CRUD operations for secure expense handling.
• Designed interactive dashboards with charts to track income and spending.
• Deployed the app with a responsive design and smooth frontend-backend integration.
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vedanti_Shende_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "30px" }}>
          <Button
            variant="primary"
            onClick={handleDownload}
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <Col md={12} className="resume-content">
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.05)", 
              padding: "40px", 
              borderRadius: "15px",
              color: "white",
              maxWidth: "900px",
              margin: "0 auto"
            }}>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1 style={{ fontSize: "2.5em", marginBottom: "15px" }}>
                  <span className="purple">VEDANTI SHENDE</span>
                </h1>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  flexWrap: "wrap",
                  gap: "15px",
                  fontSize: "1.1em"
                }}>
                  <span><AiOutlinePhone /> 9145292931</span>
                  <span><AiOutlineMail /> vedantishende963@gmail.com</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "20px",
                  marginTop: "10px",
                  fontSize: "1.1em"
                }}>
                  <a href="#" style={{ color: "white" }}><FaGlobe /> PORTFOLIO</a>
                  <a href="#" style={{ color: "white" }}><FaGithub /> GITHUB</a>
                  <a href="#" style={{ color: "white" }}><FaLinkedin /> LINKEDIN</a>
                </div>
              </div>

              {/* Career Objective */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  borderBottom: "2px solid #c770f0", 
                  paddingBottom: "10px",
                  fontSize: "1.8em"
                }}>
                  <span className="purple">CAREER OBJECTIVE</span>
                </h2>
                <p style={{ textAlign: "justify", fontSize: "1.1em", lineHeight: "1.8" }}>
                  Passionate about leveraging technology to create innovative solutions, I seek to apply my skills in Web & App Development, to drive impactful digital experiences and continuous learning.
                </p>
              </div>

              {/* Education */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  borderBottom: "2px solid #c770f0", 
                  paddingBottom: "10px",
                  fontSize: "1.8em"
                }}>
                  <span className="purple">EDUCATION</span>
                </h2>
                <ul style={{ fontSize: "1.1em", lineHeight: "2" }}>
                  <li>
                    <strong>Degree in Information Technology</strong> | 2023-2026<br />
                    Govindrao Wanjari College Of Engineering & Technology<br />
                    CGPA: 7.33/10
                  </li>
                  <li>
                    <strong>Class 12 (HSC)</strong> | 2022<br />
                    Dr. B. R. Ambedkar College, Hinganghat<br />
                    Percentage: 78.67%
                  </li>
                  <li>
                    <strong>Class 10 (SSC)</strong> | 2020<br />
                    Dr. B. R. Ambedkar School, Hinganghat<br />
                    Percentage: 86.60%
                  </li>
                </ul>
              </div>

              {/* Technical Skills */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  borderBottom: "2px solid #c770f0", 
                  paddingBottom: "10px",
                  fontSize: "1.8em"
                }}>
                  <span className="purple">TECHNICAL SKILLS</span>
                </h2>
                <ul style={{ fontSize: "1.1em", lineHeight: "2" }}>
                  <li>
                    <strong>Programming Languages:</strong> Java, C, HTML, CSS
                  </li>
                </ul>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ 
                  borderBottom: "2px solid #c770f0", 
                  paddingBottom: "10px",
                  fontSize: "1.8em"
                }}>
                  <span className="purple">PROJECTS</span>
                </h2>
                <div style={{ fontSize: "1.1em", lineHeight: "1.8" }}>
                  <h3 style={{ color: "#c770f0" }}>
                    MERN Expense Tracker | A Personal Finance Management App
                  </h3>
                  <p><strong>GitHub Link</strong></p>
                  <ul>
                    <li>Added user authentication (JWT) and complete CRUD operations for secure expense handling.</li>
                    <li>Designed interactive dashboards with charts to track income and spending.</li>
                    <li>Deployed the app with a responsive design and smooth frontend-backend integration.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "30px" }}>
          <Button
            variant="primary"
            onClick={handleDownload}
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
