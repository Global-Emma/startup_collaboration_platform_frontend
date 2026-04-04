import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  const navigate = useNavigate();

  const header = {
    text: "About Us",
    subText:
      "We are building a platform where ambitious tech talents and startup founders meet, collaborate, and turn ideas into real products",
  };

  return (
    <section className="about">
      <Navbar />
      {/* HERO */}
      <Header header={header} />
      {/* STORY */}
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          VentureLink started with a simple idea — talented developers,
          designers, and engineers shouldn’t struggle to find meaningful
          projects, and founders shouldn’t struggle to find the right people. We
          noticed a gap where skills existed, ideas existed, but connection was
          missing.
        </p>
        <p>
          So we built a platform that removes that barrier. A place where people
          don’t just apply for jobs, but join missions. Whether it’s building
          the next SaaS product, launching a startup, or experimenting with new
          technologies, this is where it begins.
        </p>
      </div>

      {/* MISSION */}
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower creators and innovators by giving them
          access to real opportunities. We want to make collaboration
          effortless, transparent, and impactful. Instead of endless job
          applications, we believe in direct collaboration and building
          together.
        </p>
      </div>

      {/* WHAT WE OFFER */}
      <div className="about-section">
        <h2>What We Offer</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>Real Projects</h3>
            <p>
              Work on actual startup ideas and gain real-world experience that
              matters beyond portfolios.
            </p>
          </div>

          <div className="about-card">
            <h3>Collaboration</h3>
            <p>
              Connect with founders, developers, and creatives who are serious
              about building impactful products.
            </p>
          </div>

          <div className="about-card">
            <h3>Growth</h3>
            <p>
              Learn by doing. Improve your skills while working on meaningful
              and challenging projects.
            </p>
          </div>

          <div className="about-card">
            <h3>Opportunities</h3>
            <p>
              Discover paid and unpaid opportunities that can lead to long-term
              partnerships or even co-founding roles.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2>Start Building Today</h2>
        <p>
          Whether you're a developer looking for your next challenge or a
          founder searching for the right team, this is your place to start.
        </p>

        <div className="about-actions">
          <button onClick={() => navigate("/projects")} className="primary-btn">
            Explore Projects
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="secondary-btn"
          >
            Join as Talent
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
