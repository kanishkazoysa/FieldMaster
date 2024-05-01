import React from "react";
import { MdArrowBack } from "react-icons/md";
import { RiWalkFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { FaCalculator } from "react-icons/fa6";
import { useState } from "react";


const StartMeasurePage = ({ onBackToSidebar }) => {

  const [hoveredOption, setHoveredOption] = useState(null);

  const handleOptionHover = (option) => {
    setHoveredOption(option);
  };

  const handleOptionLeave = () => {
    setHoveredOption(null);
  };
  
  return (
    <div>
      <div style={styles.header}>
        <MdArrowBack
          onClick={onBackToSidebar}
          style={styles.backButton}
          fontSize={20}
        />{" "}
      </div>

      <div style={styles.selectionModel}>

      <div
      style={{
        ...styles.options,
        ...(hoveredOption === 'walkAround' && styles.hoverEffect),
      }}
      onMouseEnter={() => handleOptionHover('walkAround')}
      onMouseLeave={handleOptionLeave}
    >
      <div style={styles.iconContainer}>
        <RiWalkFill fontSize={32} style={{ marginLeft: '10px', marginTop: '10px' }} color="#fff" />
      </div>
      <div style={styles.textContainer}>
        <div>
          <h7 style={styles.text}>Walk around the land</h7>
        </div>
        <div style={{ marginTop: '5px', width: '85%' }}>
          <p style={styles.innerText}>Click on Start button and it will track your phone's live position.</p>
        </div>
      </div>
    </div>
    
    <div
      style={{
        ...styles.options,
        ...(hoveredOption === 'pointEdges' && styles.hoverEffect),
      }}
      onMouseEnter={() => handleOptionHover('pointEdges')}
      onMouseLeave={handleOptionLeave}
    >
      <div style={styles.iconContainer}>
        <MdLocationOn fontSize={27} style={{ marginLeft: '10px', marginTop: '10px' }} color="#fff" />
      </div>
      <div style={styles.textContainer}>
        <div>
          <h7 style={styles.text}>Point edges on map</h7>
        </div>
        <div style={{ marginTop: '5px', width: '88%' }}>
          <p style={styles.innerText}>Add points to map manually, drag and drop to specific place.</p>
        </div>
      </div>
    </div>
    
    <div
      style={{
        ...styles.options,
        ...(hoveredOption === 'manualCalculator' && styles.hoverEffect),
      }}
      onMouseEnter={() => handleOptionHover('manualCalculator')}
      onMouseLeave={handleOptionLeave}
    >
      <div style={styles.iconContainer}>
        <FaCalculator fontSize={22} style={{ marginLeft: '10px', marginTop: '12px' }} color="#fff" />
      </div>
      <div style={styles.textContainer}>
        <div>
          <h7 style={styles.text}>Manual Calculator</h7>
        </div>
        <div style={{ marginTop: '5px', width: '85%' }}>
          <p style={styles.innerText}>Manually add area and perimeter for the calculation.</p>
        </div>
      </div>
    </div>
       

       
      </div>
    </div>
  );
};

const styles = {
  hoverEffect: {
    transform: 'scale(1.11)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
    cursor: 'pointer',
  },
  header: {
    display: "flex",
    marginTop: "-5%",
    marginLeft: "-5%",
    padding: "18px",

  },
  backButton: {
    marginRight: "10px",
    cursor: "pointer",
  },
  selectionModel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",

  },
  options:{
    display: "flex",
    flexDirection: "row",
    width:"90%",
    height:'90px',
    marginBottom:'20px',
    backgroundColor: "#1640D6",
    borderRadius: "11px",
    
  },

textContainer :{
    display: "flex",
    flexDirection: "column",
    marginTop:"8px",
    marginLeft:"10px",
    flex: 1,
  },
  text: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  },
  innerText: {
    color: "#fff",
    fontSize: "11px",
  },
};

export default StartMeasurePage;
