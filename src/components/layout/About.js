import "./About.css";
import ownerImage from "../../images/ashish.png";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Footer from "./Footer/Footer";

const About = () => {
  return (
    <Fragment>
      <div className="about-container">
        <header className="about-header">
          <div className="header-content">
            <div className="profile-image">
              <Link to="/">
                <img src={logo} alt="Owner" />
              </Link>
            </div>
            <div className="header-text">
              <h1 className="about-heading">About Us</h1>
              <p className="about-subheading">Welcome to GloboMart</p>
            </div>
          </div>
        </header>

        <div className="content-container">
          <section className="left-section">
            <h2>Our Story</h2>
            <p>
              Our values at GloboMart revolve around integrity, customer
              satisfaction, and sustainability. We believe in building lasting
              relationships, providing top-notch service, and contributing
              positively to the environment.
            </p>
            <p>
              In the course of our project's development, we've achieved
              significant milestones and witnessed remarkable growth. Starting
              from a modest inception, our project has evolved into a dynamic
              and innovative venture. We've reached new heights through
              continuous improvements, dedicated efforts, and a commitment to
              excellence.
            </p>
          </section>

          <section className="right-section">
            <h2>Meet Our Team</h2>
            <div className="team-member">
              <div>
                <img src={ownerImage} alt="Team Member" />
                <p>
                  <strong>Ashish Kaushik</strong> - Founder
                </p>
              </div>
              <p>
                This project stands as a testament to our commitment to industry
                . Crafted with the purpose of gaining proficiency in MERN
                (MongoDB, Express.js, React, Node.js) stack technologies, it
                serves as a learning ground for honing our skills and
                contributing valuable insights to the industry landscape.
              </p>
            </div>
          </section>
        </div>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>Have questions or suggestions? Reach out to us:</p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="https://mailto:proakkaushik@gmail.com">
                proakkaushik@gmail.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> 7278302823
            </li>
          </ul>
          <div className="links-container">
            <a
              href="https://www.linkedin.com/in/ashish-kaushik-b76a22257/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
            <a
              href="https://github.com/aseeskaushik"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

export default About;
