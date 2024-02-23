import React, { useState } from "react";
import "./Navbar.css";
import MobileNav from "./MobileNav/MobileNav";
import { Link } from "react-scroll";


function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
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
          <h1 className="styled">FIELDMASTER</h1>

          

          <ul>
            <li>
              <Link activeClass="active" to="hero" smooth spy offset={-80} className="menu-item">Home</Link>
            </li>

            <li>
              <Link activeClass="active" to="About" smooth spy offset={-120} className="menu-item">About</Link>
            </li>
            <li>
              <Link activeClass="active" to="setup" smooth spy offset={-120} className="menu-item">Setup</Link>
            </li>

            <li>
              <Link activeClass="active" to="pricing" smooth spy offset={-100} className="menu-item">Pricing</Link>
            </li>

            <li>
              <Link activeClass="active" to="contact" smooth spy offset={-100} className="menu-item">Contact </Link>
            </li>

            <button className="contact-btn" onClick={() => {}}>
              Get Started
            </button>
          </ul>

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

// const styles = StyleSheet.create({
  
// });
