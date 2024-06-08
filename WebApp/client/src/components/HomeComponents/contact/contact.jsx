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

          <div className="contactForm">
            <div className="contactSupport" >Stay In Touch</div>
            <div className="inputName">
            <label htmlFor="contact_name">Name : </label> 
            </div>
            <div className='contactInput'>
            <input
              type="text"
              name="contact_name"
              id="contact_name"
              placeholder="John Doe"
            />
            </div>
            <div className="inputName">
            <label>Email : </label> 
            </div>
            <div className='contactInput'>
            <input
              type="email"
              name="contact_email"
              id="contact_email"
              placeholder="doe@gmail.com"
            />
            </div>
            <div className="inputName">
            <label>Message : </label> 
            </div>
            <div className='contactInput'>
            <textarea rows={3} cols={30}
              name="contact_message"
              id="contact_message"
              placeholder="Type your message here"
            >    
            </textarea>
            </div>

            <input type="submit" value="Submit" className="submit-button" />
          </div>

          
        </div>
        <div className="social-icon">
          <FontAwesomeIcon icon={faLinkedin} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faGithub} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faFacebook} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#007BFF" ,height : "2rem", width : "2rem"}}/>&nbsp;&nbsp;&nbsp;
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
