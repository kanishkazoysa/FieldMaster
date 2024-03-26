// SideNavbar.js
import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo.png";
import Select from "react-select";import { FaSquare } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { FaMapSigns } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";

export default function SideNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [selectedFenceType, setSelectedFenceType] = useState(null);
  const [inputValue1, setInputValue1] = useState("");
  const [selectedPostSpaceUnit, setSelectedPostSpaceUnit] = useState("");
  const [inputValueFenceLength, setInputValueFenceLength] = useState("");
  //const inputValueFenceAmountRef = useRef(null);

  const handleFenceLengthChange = (event) => {
    setInputValueFenceLength(event.target.value);
  };

  const fenceTypeOptions = [
    { value: "option1", label: "wood" },
    { value: "option2", label: "Metal" },
    { value: "option3", label: "fiber" },
  ];

  const lengthUnitOptions = [
    { value: "option1", label: "m" },
    { value: "option2", label: "cm" },
    { value: "option3", label: "foot" },
    // Add more options as needed
  ];

  const [inputValue, setInputValue] = useState("");

  const handleFenceTypeChange = (selectedOption) => {
    setSelectedFenceType(selectedOption);
  };

  const handlePostSpaceUnitChange = (selectedOption) => {
    setSelectedPostSpaceUnit(selectedOption);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

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
    <Sidebar
      collapsed={collapsed}
      style={{ height: "100vh", width: collapsed ? "80px" : "400px" }}
    >
      <div style={styles.head}>
        <div onClick={handleToggleSidebar}>
          <FaBars color="#65676b" />
        </div>
        <div style={styles.logoContainer}>
          {!collapsed && <img src={logo} alt="Logo" style={styles.logo} />}
        </div>
      </div>

      <div style={styles.content}>
        {/* <Menu>
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

          <MenuItem
            onMouseEnter={() => handleMouseEnter("Settings")}
            onMouseLeave={handleMouseLeave}
            style={{
              ...styles.menuItem,
              ...(hoveredMenuItem === "Settings"
                ? styles.hoveredMenuItem
                : {}),
            }}
          >
            <FaCog fontSize={20} style={{ marginRight: "10px" }} />
            {!collapsed && "Settings"}
          </MenuItem>
        </Menu> */}

        {/* first box */}

        <div style={styles.header}>
          <p style={styles.titleText1}>Fence</p>
        </div>
        <div style={styles.Box1}>
          <p style={styles.titleText}>Land Info</p>

          <div style={styles.propertyBox}>
            <div style={styles.property}>
              <FaBorderAll color="#65676b" size={40} />
              <div style={styles.propertyDetails}>
                <p style={styles.propertyLabel}>Perimeter</p>
                <p style={styles.propertyValue}>1.5Km</p>
              </div>
            </div>
            <div className="property" style={styles.property}>
              <FaSquare color="#65676b" size={40} />
              <div style={styles.propertyDetails}>
                <p style={styles.propertyLabel}>Area</p>
                <p style={styles.propertyValue}>100 acres</p>
              </div>
            </div>
          </div>
        </div>

        {/* second box */}

        <div style={styles.box2}>
          <div style={styles.box2Property}>
            <FaMapSigns
              name="gate"
              size={40}
              color="gray"
              rotation={270}
              style={styles.squareIcon}
            />
            <div style={styles.box2PropertyDetails}>
              <p style={styles.Box2PropertyLabel}>Fence Type</p>
            </div>
          </div>
          <div style={styles.box2Property}>
            <div style={styles.Box2DropdownContainer}>

              <Select
                placeholder="Select Type"
                options={fenceTypeOptions}
                value={selectedFenceType}
                onChange={handleFenceTypeChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    textAlign: "center",
                  }),
                }}
              />
            </div>
          </div>
        </div>

        {/* third box */}

        <div style={styles.box3}>
          <div style={styles.box3Property}>
            <FaBars
              name="format-line-spacing"
              size={40}
              color="gray"
              rotation={270}
            />
            <div style={styles.box3PropertyDetails}>
              <p style={styles.Box3PropertyLabel}>Post Space</p>
            </div>
          </div>
          <div style={styles.box3Property}>
            <div style={styles.box3inputContainer}>
          
              <input
                type="text"
                style={styles.box3input}
                placeholder="00"
                value={inputValue}
                onChange={handleInputChange}
              />

              <Select
                placeholder="m"
                options={lengthUnitOptions}
                value={selectedPostSpaceUnit}
                onChange={handlePostSpaceUnitChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    textAlign: "center",
                  }),
                }}
              />

            </div>
          </div>
        </div>

        {/* Forth section */}

        <div style={styles.box4}>
          <div style={styles.box4innertop}>
            <FaDoorOpen name="boom-gate" size={40} color="gray" />
            <p style={styles.Box4TopText}>Gates</p>
          </div>
          <div style={styles.box4InnerCenter}>
            <div style={styles.line}>
              <p style={styles.linetext}>Length :</p>
             
              <input
                type="text"
                style={{
                  ...styles.linetextinput,
                  marginLeft: "10px",
                  borderBottomWidth: "1px",
                  borderBottomColor: "lightgray",
                  borderBottom: "1px solid gray", 
                  borderLeft: "none", 
                  borderRight: "none", 
                  borderTop: "none",
                }}
                placeholder="Length of Gate"
                value={inputValueFenceLength}
                onChange={handleFenceLengthChange}
                onKeyDown={(e) => {
                  
                }}
              />
            </div>
            <div style={styles.line}>
              <p style={styles.linetext}>Count :</p>
            
              <input
                type="text"
                style={{
                  ...styles.linetextinput,
                  marginLeft: "10px",
                  borderBottomWidth: "1px",
                  borderBottomColor: "lightgray",
                  borderBottom: "1px solid gray", 
                  borderLeft: "none", 
                  borderRight: "none", 
                  borderTop: "none",
                }}
                placeholder="Number of Gate"
                value={inputValueFenceLength}
                onChange={handleFenceLengthChange}
                onKeyDown={(e) => {
                  
                }}
              />
            </div>
          </div>
          <div style={styles.Box4InnerBottom}>
            <button style={styles.Box4Button}>
              <p style={styles.Box4ButtonText}>Add</p>
            </button>
          </div>

          {/* <div style={styles.displayValuesContainer}>
            {displayValues.map((value, index) => (
              <div key={index} style={styles.displayValueContainer}>
                <Text style={styles.displayValueText}>{value}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveValue(index)}
                  style={styles.closeButton}
                >
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={20}
                    color="#007BFF"
                  />
                </TouchableOpacity>
              </div>
            ))}
          </div> */}
        </div>

        <div style={styles.bottom}>
          <button style={styles.Button1}>
            <p style={styles.Box4ButtonText}>Calculate</p>
          </button>
        </div>
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
    justifyContent: "center",
    padding: "0 20px",
  },
  logo: {
    height: "40px",
    width: "100px",
    marginBottom: "5px",
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
    marginTop: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  menuItem: {
    marginTop: "0px",
    borderBottom: "1px solid #CED0D4",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },

  header: {
    display: "flex",
    width: "100%",
    height: "40px",
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },

  titleText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    color: "white",
  },

  Box1: {
    width: "90%",
    height: "101px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "10px", 
    borderRadius: "11px", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
    padding: "10px", 
  },

  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },

  propertyBox: {
    display: "flex",
    flexDirection: "coloumn",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: "white",
  },

  property: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "left",
    backgroundColor: "white",
    width: "46%",
    //height: 50,
  },

  propertyDetails: {
    flexDirection: "column",
    marginLeft: 15,
    width: "50%",
    //height: 40,
    backgroundColor: "white",
  },

  propertyLabel: {
    fontSize: 14,
    marginBottom: 0,
  },

  propertyValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },

  box2: {
    display: "flex",
    width: "92%",
    height: 71,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 25,
    borderRadius: 11,
    padding: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  box2Property: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "46%",
    padding: 7,
  },

  box2PropertyDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 5,
    width: "70%",
    backgroundColor: "white",
  },

  Box2PropertyLabel: {
    fontSize: 16,
    marginLeft: 7,
    marginBottom: 0,
  },

  Box2DropdownContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 11,
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },

  /* Third section */

  box3: {
    display: "flex",
    width: "92%",
    height: 71,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 11,
    padding: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  box3Property: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "46%",
    padding: 7,
  },

  box3inputContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: "100%",
  },

  box3PropertyDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 5,
    width: "70%",
    backgroundColor: "white",
  },

  Box3PropertyLabel: {
    fontSize: 16,
    marginLeft: 7,
    marginBottom: 0,
  },
  box3input: {
    display: "flex",
    backgroundColor: "white",
    width: "35%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid gray", 
    borderLeft: "none",
    borderRight: "none", 
    borderTop: "none",
  },

  dropdownContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    borderColor: "black",
    width: "70%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },

  /* Forth section */

  box4: {
    display: "flex",
    flexDirection: "column",
    width: "92%",
    height: 225,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },

  box4innertop: {
    display: "flex",
    width: "40%",
    height: "17%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 1,
  },

  Box4TopText: {
    fontSize: 16,
    marginLeft: 7,
    marginBottom: 0,
  },

  box4InnerCenter: {
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  line: {
    display: "flex",
    width: "80%",
    height: 30,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  linetext: {
    fontSize: 14,
    textAlign: "right",
    width: 80,
    marginBottom: 0,
  },

  linetextinput: {
    width: 140,
  },

  Box4InnerBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  Box4Button: {
    display: "flex",
    width: 119,
    height: 33,
    backgroundColor: "#0866FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 0,
  },

  Box4ButtonText: {
    color: "white",
    fontSize: 16,
    marginBottom: 0,
  },

  bottom: {
    alignItems: "center",
    marginTop: 20,
  },

  Button1: {
    display: "flex",
    width: 350,
    height: 38,
    backgroundColor: "#0866FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 0,
  },
};
