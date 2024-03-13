import React, { useState } from "react";
import "./Navbar.css";
import MobileNav from "../MobileNav/MobileNav";
import { Link } from "react-scroll";
import logo from "../../../images/logo.png"
import GetStarted from "../../GetStarted"; 



function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
      <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');
     `}
      </style>
      <nav className="nav-wrapper">
        <div className="nav-content">
          <div className="logo"><img className="image" src={logo} alt="FIELDMASTER" />
        </div>
          
          <div className="nav-links" >
          <ul>
            <li>
              <Link activeClass="active" to="hero" smooth spy offset={-20} className="menu-item">Home</Link>
            </li>

            <li>
              <Link activeClass="active" to="about"  className="menu-item">About</Link>
            </li>
            <li>
              <Link activeClass="active" to="setsetup-card" className="menu-item">Setup</Link>
            </li>

            <li>
              <Link activeClass="active" to="pricing"  className="menu-item">Pricing</Link>
            </li>

            <li>
              <Link activeClass="active" to="contact"  className="menu-item">Contact </Link>
            </li>

            <button className="contact-btn" onClick={toggleModal}>
              Get Started
            </button>
          </ul>
          </div>
          {isModalOpen && <GetStarted toggleModal={toggleModal}/>}

          <button class="menu-btn" onClick={toggleMenu}>
            <span
              class={"material-icons-outlined"}
              style={{ fontSize: "1.8rem" }}
            >
              {openMenu ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;


