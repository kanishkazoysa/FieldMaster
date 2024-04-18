// SideNavbar.js
import React, { useState, useRef } from "react";
import { FaBars, FaSquare, FaRegSquare } from "react-icons/fa";
import { MdArrowBack, MdFence } from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBoxCircles,BsBoundingBox  } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";


import Select from "react-select";
import AxiosInstance from "../../AxiosInstance";
import axios from "axios";
import FenceDetails from "./fenceDetails";

export default function Fence({ onBackToSidebar }) {
  const [perimeter, setPerimeter] = useState("1.5");
  const [area, setArea] = useState("100");
  const [FenceTypeselectedValue, setFenceTypeselectedValue] = useState(null);
  const [FenceTypeselectedValue1, setFenceTypeselectedValue1] = useState(null);
  const [PostSpaceUnitselectedValue, setPostSpaceUnitselectedValue] = useState("");
  const [PostSpaceUnitselectedValue1, setPostSpaceUnitselectedValue1] = useState("");
  const [inputValuePostspace, setInputValuePostspace] = useState("");
  const [inputValueFenceLength, setInputValueFenceLength] = useState("");
  const [inputValueFenceAmount, setInputValueFenceAmount] = useState("");
  const [fenceLengthsArray, setFenceLengthsArray] = useState([]);
  const [fenceAmountsArray, setFenceAmountsArray] = useState([]);
  const [displayValues, setDisplayValues] = useState([]);
  const inputValueFenceAmountRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  const handleFenceLengthChange = (event) => {
    setInputValueFenceLength(event.target.value);
  };

  const handleFenceAmountChange = (event) => {
    setInputValueFenceAmount(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValuePostspace(event.target.value);
  };

  const handleFenceTypeChange = (selectedOption) => {
    setFenceTypeselectedValue1(selectedOption);
    setFenceTypeselectedValue(selectedOption.value);
  };

  const handlePostSpaceUnitChange = (selectedOption) => {
    setPostSpaceUnitselectedValue1(selectedOption);
    setPostSpaceUnitselectedValue(selectedOption.value);
  };

  const handleAdd = () => {
    if (!inputValueFenceLength.trim() || !inputValueFenceAmount.trim()) {
      alert("Please fill both input fields");
      return;
    }
    const length = parseFloat(inputValueFenceLength);
    const amount = parseInt(inputValueFenceAmount);
    setFenceLengthsArray([...fenceLengthsArray, length]);
    setFenceAmountsArray([...fenceAmountsArray, amount]);
    const combinedValue = `${length}m x ${amount}`;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setInputValueFenceLength("");
    setInputValueFenceAmount("");
    inputValueFenceAmountRef.current.focus();
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);

    const newFenceLengthsArray = [...fenceLengthsArray];
    newFenceLengthsArray.splice(index, 1);
    setFenceLengthsArray(newFenceLengthsArray);

    const newFenceAmountsArray = [...fenceAmountsArray];
    newFenceAmountsArray.splice(index, 1);
    setFenceAmountsArray(newFenceAmountsArray);
  };

  const handleFenceDetails = async () => {
    setCurrentPage("FenceDetails"); // Update this line
    setAnimatePage(true);
    try {
      // Validate required fields
      if (
        !PostSpaceUnitselectedValue ||
        !FenceTypeselectedValue ||
        !inputValuePostspace
      ) {
        throw new Error("Please fill in all fields");
      }

      // Prepare data for the request
      const requestData = {
        FenceTypeselectedValue,
        inputValuePostspace,
        PostSpaceUnitselectedValue,
        displayValues,
        fenceAmountsArray,
        fenceLengthsArray,
      };

      // Make POST request to the backend
      const response = await axios.post(
        "http://192.168.8.130:5000/api/fence/fence",
        requestData
      );

      // Handle successful response
      console.log("Response:", response.data);

      // Optionally, you can navigate to another page or perform other actions based on the response
      // setCurrentPage('SomeOtherPage');
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  return (
    <div>
      {!currentPage && (
        <div style={styles.content}>
          <div style={styles.header}>
            <MdArrowBack
              onClick={onBackToSidebar}
              style={styles.backButton}
              fontSize={20}
            />
            <p style={styles.titleText1}>Fence</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Land Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox  color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}>{perimeter}Km</p>
                </div>
              </div>
              <div style={styles.property}>
                <PiSquareDuotone color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>
                    {area} m<sup>2</sup>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.box2}>
            <div style={styles.box2Property}>
              <MdFence name="gate" size={35} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Fence Type</p>
              </div>
            </div>
            <div style={styles.box2Property}>
              <div style={styles.Box2DropdownContainer}>
                <Select
                  placeholder="Select Type"
                  options={[
                    { value: "Wood", label: "Wood" },
                    { value: "Metal", label: "Metal" },
                    { value: "Fiber", label: "Fiber" },
                  ]}
                  value={FenceTypeselectedValue1}
                  onChange={handleFenceTypeChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: 'center',
                      fontSize: '10px',
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <FaBars name="format-line-spacing" size={25} color="gray" />
              </div>
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
                  value={inputValuePostspace}
                  onChange={handleInputChange}
                />
                <Select
                  placeholder="m"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={PostSpaceUnitselectedValue1}
                  onChange={handlePostSpaceUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "78px",
                      
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.box4}>
            <div style={styles.box4innertop}>
              <GiGate name="boom-gate" size={26} color="gray" />
              <p style={styles.Box4TopText}>Gates</p>
            </div>
            <div style={styles.box4InnerCenter}>
              <div style={styles.line}>
                <p style={styles.linetext}>Length :</p>
                <input
                  type="text"
                  style={styles.linetextinput}
                  placeholder="Length of Gate"
                  value={inputValueFenceLength}
                  onChange={handleFenceLengthChange}
                />
              </div>
              <div style={styles.line}>
                <p style={styles.linetext}>Count :</p>
                <input
                  type="text"
                  style={styles.linetextinput}
                  placeholder="Number of Gate"
                  value={inputValueFenceAmount}
                  onChange={handleFenceAmountChange}
                  ref={inputValueFenceAmountRef}
                  onSubmitEditing={handleAdd}
                />
              </div>
            </div>
            <div style={styles.Box4InnerBottom}>
              <button style={styles.Box4Button} onClick={handleAdd}>
                <p style={styles.Box4ButtonText}>Add</p>
              </button>
            </div>

            <div style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <IoIosCloseCircleOutline
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleFenceDetails}>
              <p style={styles.Box4ButtonText}>Calculate</p>
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "FenceDetails" && (
          <FenceDetails
            onBackToSidebar={handleBackClick}
            inputValuePostspace={inputValuePostspace}
            displayValues={displayValues}
            PostSpaceUnitselectedValue={PostSpaceUnitselectedValue}
            FenceTypeselectedValue={FenceTypeselectedValue}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  backButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "white",
  },

  content: {
    paddingLeft: "1px",
    paddingRight: "1px",
    width: "100%",
    marginTop: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  header: {
    display: "flex",
    width: "100%",
    height: "45px",
    backgroundColor: "#007BFF",
    alignItems: "center",
    
  },

  titleText1: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 0,
    color: "white",
    marginLeft: "95px",
  },

  Box1: {
    width: "90%",
    height: "81px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "15px",
    borderRadius: "11px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "8px",
  },

  titleText: {
    fontSize: 13,
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
    marginLeft: 10,
    width: "50%",
    //height: 40,
    backgroundColor: "white",
  },

  propertyLabel: {
    fontSize: 12,
    marginBottom: 0,
  },

  propertyValue: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 0,
  },

  box2: {
    display: "flex",
    width: "92%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 20,
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
    fontSize: 13,
    marginLeft: 4,
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
    height: 65,
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
    width: "100%",
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
    fontSize: 13,
    marginLeft: 7,
    marginBottom: 0,
  },
  box3input: {
    display: "flex",
    backgroundColor: "white",
    width: "30%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid gray",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    outline: "none",
  },

  dropdownContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    borderColor: "black",
    width: "65%",
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
    height: 200,
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
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 0,
    marginTop: 5,
  },

  box4InnerCenter: {
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  line: {
    display: "flex",
    width: "60%",
    height: 30,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  linetext: {
    fontSize: 12,
    textAlign: "right",
    width: 80,
    marginBottom: 0,
  },

  linetextinput: {
    width: 100,
    marginLeft: "10px",
    borderBottomWidth: "1px",
    borderBottomColor: "lightgray",
    borderBottom: "1px solid gray",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    outline: "none",
    fontSize: 12,
    height: 20,
  },

  Box4InnerBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  Box4Button: {
    display: "flex",
    width: 80,
    height: 25,
    backgroundColor: "#0866FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 0,
  },

  Box4ButtonText: {
    color: "white",
    fontSize: 13,
    marginBottom: 0,
  },

  displayValuesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "white",
    height: "max-content",
    borderRadius: 11,
    width: "100%",
  },
  displayValueContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 8,
    padding: 2,
    width: "25%",
    height: 30,
    border: "1px solid lightblue",
  },
  displayValueText: {
    fontSize: 10,
    marginRight: 5,
    color: "#007BFF",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
  },

  bottom: {
    width: "92%",
    alignItems: "center",
    marginTop: 20,
  },

  Button1: {
    display: "flex",
    width: "100%",
    height: 35,
    backgroundColor: "#0866FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 11,
    borderWidth: 0,
  },
};
