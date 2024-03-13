// SideNavbar.js
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import { IoBookmarks } from "react-icons/io5";
import { RiWalkFill } from "react-icons/ri";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredMenuItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredMenuItem(null);
  };

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar collapsed={collapsed} style={{ height: "100vh" }}>
      <div style={styles.head}>
        <div onClick={handleToggleSidebar}>
          <FaBars color="#65676b" />
        </div>
        <div style={styles.logoContainer}>
          {!collapsed && <img src={logo} alt="Logo" style={styles.logo} />}
        </div>
      </div>

      <div style={styles.content}>
        <Menu>
          <MenuItem
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
            <IoBookmarks fontSize={20} style={{ marginRight: "10px" }} />
            {!collapsed && "Templates"}
          </MenuItem>
        </Menu>
        <div>{/* You can put anything you want here */}</div>
      </div>
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
