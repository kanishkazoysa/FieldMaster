// SideNavbar.js
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import { IoBookmarks } from "react-icons/io5";
import { RiWalkFill } from "react-icons/ri";
import StartMeasurePage from '../MeasureOption/measureOption.js';
import SavedTemplates from '../SavedTemplates/savedTemplates.js';

import Plantation from "../Plantation/PlantationPage/plantation";
import PlantationDetails from "../Plantation/PlantationDetails/plantationDetails.js";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(null); 
  const [animatePage, setAnimatePage] = useState(false); 


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
    setCurrentPage('StartMeasure'); 
    setAnimatePage(true);
  };

  const handleSavedTemplatesClick = () => {
    setCurrentPage('PlantationDetails'); 
    setAnimatePage(true);
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  return (
    <Sidebar collapsed={collapsed} style={{ height: "100vh", width: collapsed ? '50px' : '300px' }}>
      <div style={styles.head}>
        <div style={{cursor:"pointer"}} onClick={handleToggleSidebar}>
          <FaBars color="#65676b"/>
        </div>
        <div style={styles.logoContainer}>
          {!collapsed && <img src={logo} alt="Logo" style={styles.logo} />}
        </div>
      </div>
      <div style={styles.content}>
        { !currentPage     && (
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
              onClick={handleSavedTemplatesClick}
              onMouseEnter={() => handleMouseEnter("Templates")}
              onMouseLeave={handleMouseLeave}
              style={{
                ...styles.menuItem,
                ...(hoveredMenuItem === "Templates" ? styles.hoveredMenuItem : {}),
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
          transform: animatePage ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: 'whitesmoke',
          height: currentPage ? 'calc(100vh - 60px)' : '0', // Update this line
          overflow: 'auto', // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === 'StartMeasure' && <StartMeasurePage onBackToSidebar={handleBackClick} />}
        {currentPage === 'PlantationDetails' && <PlantationDetails onBackToSidebar={handleBackClick} />}
      </div>
      </div>
    </Sidebar>
  );
}

const styles = {
  startMeasureContainer: {
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: '0px',
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
    backgroundColor: "#1640D6",
    color: "white",
  },
  content: {
    marginTop: "5px",
    height: 'calc(100vh - 65px)', // Set height to remaining height after header and marginTop
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    marginTop: "5px",
    marginRight:"8px",
    marginLeft:"8px",
    borderRadius:"5px",
    borderBottom: "1px solid #CED0D4",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};