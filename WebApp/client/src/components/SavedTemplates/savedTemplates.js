import React from "react";
import { MdArrowBack } from "react-icons/md";

const StartMeasurePage = ({ onBackToSidebar }) => {
  return (
    <div>
      <div style={styles.header}>
        <MdArrowBack
          onClick={onBackToSidebar}
          style={styles.backButton}
          fontSize={20}
        />{" "}
      </div>
      
    </div>
  );
};

const styles = {

  header: {
    backgroundColor: "#fff",
    display: "flex",
    marginTop: "-5%",
    marginLeft: "-5%",
  },
  backButton: {
    marginRight: "10px",
    cursor: "pointer",
  },
  
};

export default StartMeasurePage;
