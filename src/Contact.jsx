import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/Home");
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p>
          Email: <a href="mailto:info@example.com">info@example.com</a>
        </p>
        <p>
          Phone: <a href="tel:+1234567890">+1 (361) 424-7xxx</a>
        </p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="social-links">
        {/* Font Awesome icons for social links */}
        <a
          href="https://facebook.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://linkedin.com/company/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://instagram.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
          <button className="CHome" onClick={handleHome}>
            Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
