import React from "react";
import "./Hero.css";
import { Button } from "@mui/material";


const Hero = () => {
  return (
    <section id="hero" className="hero-container">
      <div>
        
      </div>
      <div className="hero-content">
        <h2>Accurate measurements of your land</h2>
         <p>Trusted by beginners,marketers & 
        professionals ; Built with usability and performance in mind.
        <div className="hero-btn">
        <button className="contact-btn">
              Download Now
            </button>
        </div>
        </p>
      </div>

      <div className="hero-img">
        <div>
          
          <img src="https://img.freepik.com/premium-vector/folded-location-map-with-marker-city-map-with-pin-pointer_349999-746.jpg"/>
        </div>

      
      </div>
     
    </section>
    
  );
};


export default Hero;
