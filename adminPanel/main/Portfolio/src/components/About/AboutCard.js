import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm <span className="purple">Vedanti Shende</span>{" "}
            from <span className="purple">Hinganghat, India</span>.
            <br />
            I'm currently pursuing a{" "}
            <span className="purple">Degree in Information Technology</span> at{" "}
            <span className="purple">Govindrao Wanjari College Of Engineering & Technology</span>.
            <br />
            I'm passionate about leveraging technology to create innovative solutions and drive impactful digital experiences.
            <br />
            <br />
            Outside of coding, I love engaging in activities that keep me
            creative and inspired:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Learning New Technologies 💻
            </li>
            <li className="about-activity">
              <ImPointRight /> Building Web Applications 🌐
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring New Ideas 💡
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Vedanti</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
