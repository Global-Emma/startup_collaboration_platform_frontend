import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const header = {
    text: "Contact Us",
    subText:
      "Have a question, idea, or partnership in mind? Reach out and we’ll get back to you.",
  };

  return (
    <section className="contact">
      <Navbar />

      {/* HEADER */}
      <Header header={header} />

      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Whether you're a developer looking for opportunities or a founder
            building something exciting, we’d love to hear from you.
          </p>

          <div className="info-item">
            <span>Email</span>
            <p>support@venturelink.com</p>
          </div>

          <div className="info-item">
            <span>Location</span>
            <p>Lagos, Nigeria</p>
          </div>

          <div className="info-item">
            <span>Response Time</span>
            <p>Usually within 24 hours</p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message..."
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
