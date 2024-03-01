import React from "react";
import "./MobileNav.css";

const MobileNav = ({ isOpen, toggleMenu }) => {
  
  const handleScroll = (sectionId) => {
    if(isOpen) toggleMenu();
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="mobile-menu-container">
        <h1 className="styled">FIELDMASTER</h1>

          <ul>
            <li>
              <a onClick={() => handleScroll("hero")} className="menu-item">
                Home
              </a>
            </li>

            <li>
              <a onClick={() => handleScroll("skills")} className="menu-item">
                About
              </a>
            </li>

            {/* <li>
              <a onClick={() => handleScroll("work-exp")} className="menu-item">
                Projects
              </a>
            </li> */}

            <li>
              <a onClick={() => handleScroll("contact")} className="menu-item">
                Contact
              </a>
            </li>

            <button className="contact-btn" onClick={() => {}}>
              Get Started
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
