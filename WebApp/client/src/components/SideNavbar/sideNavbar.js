// SideNavbar.js
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import { IoBookmarks } from "react-icons/io5";
import { RiWalkFill } from "react-icons/ri";
import StartMeasurePage from '../MeasureOption/measureOption.js'; 


export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [showStartMeasurePage, setShowStartMeasurePage] = useState(false);
  const [animateStartMeasure, setAnimateStartMeasure] = useState(false);


  const handleMouseEnter = (item) => {
    setHoveredMenuItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredMenuItem(null);
  };

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleStartMeasureClick = () => {
    setShowStartMeasurePage(true); 
    setAnimateStartMeasure(true);
  };

  return (
    <Sidebar collapsed={collapsed}  
    style={{ height: "100vh", width: collapsed ? '50px' : '300px' }}>
      <div style={styles.head}>
        <div onClick={handleToggleSidebar}>
          <FaBars color="#65676b" />
        </div>
        <div style={styles.logoContainer}>
          {!collapsed && <img src={logo} alt="Logo" style={styles.logo} />}
        </div>
      </div>

      

      <div style={styles.content}>
      {!showStartMeasurePage && ( // Render the menu if Start Measure page is not shown
      <Menu>
        <MenuItem
          onClick={handleStartMeasureClick}
          onMouseEnter={() => handleMouseEnter('startmeasure')}
          onMouseLeave={handleMouseLeave}
          style={{
            ...styles.menuItem,
            ...(hoveredMenuItem === 'startmeasure' ? styles.hoveredMenuItem : {}),
          }}
        >
          <RiWalkFill fontSize={25} style={{ marginRight: '10px' }} />
          {!collapsed && 'Start measure'}
        </MenuItem>

          <MenuItem
            onMouseEnter={() => handleMouseEnter("Templates")}
            onMouseLeave={handleMouseLeave}
            style={{
              ...styles.menuItem,
              ...(hoveredMenuItem === "Templates"
                ? styles.hoveredMenuItem
                : {}),
            }}
          >
            <IoBookmarks fontSize={18} style={{ marginRight: "15px" }} />
            {!collapsed && "Templates"}
          </MenuItem>
          </Menu>
          )}
          <div
            style={{
              ...styles.startMeasureContainer,
              transform: animateStartMeasure ? 'translateX(0)' : 'translateX(-100%)', // Apply the animation
              transition: 'transform 0.3s ease-in-out', // Add a transition effect
            }}
          >
            {showStartMeasurePage && <StartMeasurePage />}
          </div>
        </div>
    </Sidebar>
  );
}

const styles = {
  startMeasureContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: "100vh",
    overflowY: 'auto',
    backgroundColor: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  head: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    height: "60px",
    borderBottom: "1px solid #CED0D4",
    alignItems: "center",
    padding: "0 20px",
  },
  logo: {
    height: "40px",
    width: "100px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  hoveredMenuItem: {
    backgroundColor: "#0866FF",
    color: "white",
  },
  content: {
    marginTop: "5px",
  },
  menuItem: {
    marginTop: "5px",
    borderBottom: "1px solid #CED0D4",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};
