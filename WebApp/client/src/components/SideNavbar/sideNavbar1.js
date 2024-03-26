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

export default function SideNavbar1() {
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
     
      <div style={styles.header}>
          <p style={styles.titleText1}>Fence Details</p>
      </div>

        {/* first box */}

        <div style={styles.Box1}>
          <p style={styles.titleText}>Total Posts / Sticks</p>
          <div style={styles.propertyBox}>
            <div style={styles.property}>
              <FaBorderAll color="#65676b" size={40} />
              <div style={styles.propertyDetails}>
                <p style={styles.propertyLabel}>Total Amount</p>
                <p style={styles.propertyValue}>100</p>
              </div>
            </div>
            <div className="property" style={styles.property}>
              <FaSquare color="#65676b" size={40} />
              <div style={styles.propertyDetails}>
                <p style={styles.propertyLabel}>post Gap</p>
                <p style={styles.propertyValue}>30 cm</p>
              </div>
            </div>
          </div>
        </div>

         {/* Second box */}

         <div style={styles.Box2}>
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


       {/* Third box */}


       
       <div style={styles.box3}>
          
          <p style={styles.innertopText}>Result based on</p>

          <div style={styles.innercenter}>
            <div style={styles.innersquareleft}>
              <FaSquare name="gate" size={36} color="#65676B" />
              <p style={styles.propertyLabel1}>Fence Type :</p>
            </div>
            <div style={styles.innersquareright}>
              <p style={styles.propertyLabel}>wood</p>
            </div>
          </div>

          <div style={styles.innercenter}>
            <div style={styles.innersquareleft}>
              <FaSquare
                name="boom-gate"
                size={36}
                color="#65676B"
              />
              <p style={styles.propertyLabel1}>Gates      :</p>
            </div>
            <div style={styles.innersquareright1}>
            {/*{data.map((value, index) => (
              <p key={index}>{value}</p>
                 ))}*/}
            </div>
          </div>
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

  /*first section*/

  Box1: {
    width: "90%",
    height: "101px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "30px", 
    borderRadius: "11px", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
    padding: "10px", 
  },

  titleText: {
    fontSize: 15,
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
    marginTop: "8px",
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
    marginLeft: 10,
    width: "60%",
    //height: 40,
    backgroundColor: "white",
  },

  propertyLabel: {
    fontSize: 14,
    marginBottom: 0,
  },

  propertyLabel1: {
    fontSize: 14,
    marginBottom: 0,
    marginLeft: 10,
  },

  propertyValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },

  Box4ButtonText: {
    color: "white",
    fontSize: 16,
    marginBottom: 0,
  },

  bottom: {
    alignItems: "center",
    marginTop: 120,
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

  Box2: {
    width: "90%",
    height: "81px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "10px", 
    borderRadius: "11px", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
    padding: "10px", 
  },

   /*third box*/

   box3: {

    width: "90%",
   // height: "max-content",
    height:180,
    backgroundColor: "white",
    marginTop: 15,
    borderRadius: 11,
    padding: 20,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 

  },

  innertopText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },

  innercenter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 2,
  },

  innersquareleft: {
    display: "flex",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    backgroundColor: "white",
  },

  innersquareright: {
    display: "flex",
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },

  innersquareright1: {
    display: "flex",
    width: "45%",
    height: 20,
    marginTop: 10,
    justifyContent: "flex-start",
    backgroundColor: "white",
    flexDirection: "column",
  },
};
