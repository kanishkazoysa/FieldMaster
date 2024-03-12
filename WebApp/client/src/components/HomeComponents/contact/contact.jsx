import React from 'react';
import "./contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import video3 from "../../../assets/contact_video.mp4";

function ContactForm() {
  return (
    <div className="contact">
      <div style={{ textAlign: "center", color: "#007BFF", margin: "2rem" }}>
        <h2>Contact Us</h2>
      </div>

      <footer className='footer-container'>
        <div className="top">
          <div className="pages">
            <div className="contact-video-container">
              <div className="contact-video">
                <video  height="390rem" autoPlay loop muted>
                  <source src={video3} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="newsletter" style={{border : "1px solid #007BFF"}}>
           
            <form className="contact-form" style={{paddingLeft : "0rem"}}>
            <h2 style={{ textAlign: "left" }}>Stay in Touch</h2>
        <label htmlFor="contact_name">Enter your name here:</label>
        <input
          type="text"
          name="contact_name"
          id="contact_name"
          placeholder="John Doe"
        />

        <label htmlFor="newsletter_email">Example@gmail.com:</label>
        <input
          type="email"
          name="newsletter_email"
          id="newsletter_email"
          placeholder="example@gmail.com"
        />

        <label htmlFor="contact_message">Type your message here:</label>
        <textarea rows={3} cols={30}
           name="contact_message"
          id="contact_message"
          placeholder="Type your message here"
        ></textarea>

        <input type="submit" value="Submit" className="submit-button" />
      </form>
          </div>
        </div>
        <div className="social">
          <FontAwesomeIcon icon={faLinkedin} />&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faGithub} />&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faFacebook} />&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faInstagram} />&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faTwitter} />&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faYoutube} />&nbsp;&nbsp;&nbsp;
        </div>
        <div className="info">
          <div className="legal">
            <a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a>
          </div>
          <div className="copyright">2021 Copyright &copy; FIELDMASTER</div>
        </div>
      </footer>
    </div>
  );
}

export default ContactForm;
