import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2 className="footer-logo">VentureLink</h2>
          <p>
            Where startup founders meet skilled tech talent to build, launch,
            and scale innovative ideas.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="/projects">Browse Projects</a>
            <a href="/services">Explore Services</a>
            <a href="/post">Post a Project</a>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <a href="#">Web Development</a>
            <a href="#">AI Automation</a>
            <a href="#">App Development</a>
            <a href="#">DevOps & Cloud</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VentureLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;