// SideNavbar.js
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import { IoBookmarks } from "react-icons/io5";
import { RiWalkFill } from "react-icons/ri";
import YourNewComponent from "../MeasureOption/measureOption";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [isStartMeasureClicked, setIsStartMeasureClicked] = useState(false);

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
    setIsStartMeasureClicked(true);
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

      {isStartMeasureClicked ? (
        <YourNewComponent onBackClick={() => setIsStartMeasureClicked(false)} />
      ) : (

      <div style={styles.content}>
        <Menu>
          <MenuItem
          onClick={handleStartMeasureClick}
            onMouseEnter={() => handleMouseEnter("startmeasure")}
            onMouseLeave={handleMouseLeave}
            style={{
              ...styles.menuItem,
              ...(hoveredMenuItem === "startmeasure"
                ? styles.hoveredMenuItem
                : {}),
            }}
          >
            <RiWalkFill fontSize={25} style={{ marginRight: "10px" }} />
            {!collapsed && "Start measure"}
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
        <div>{/* You can put anything you want here */}</div>
      </div>
   )}
    </Sidebar>
  );
}

const styles = {
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
