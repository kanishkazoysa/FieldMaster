import React from "react";
import "./MobileNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-gvf7LaAPdVMTIn4IuZbRirUFLBAmT/7/3gHvZuOWv7dM0HZ5zmZbZIbyibGLazmu+q3UqGzKqz8n0dFwXOoY7w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
              <a onClick={() => handleScroll("about")} className="menu-item">
                About
              </a>
            </li>
            <li>
              <a onClick={() => handleScroll("Setup")} className="menu-item">
                SetUp
              </a>
            </li>
            <li>
              <a onClick={() => handleScroll("pricing")} className="menu-item">
                Pricing
              </a>
            </li>

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
