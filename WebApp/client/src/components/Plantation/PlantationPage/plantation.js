// SideNavbar.js
import React, { useState, useRef } from "react";
import { MdArrowBack, MdFormatLineSpacing } from "react-icons/md";
import { RxRowSpacing } from "react-icons/rx";
import { PiTreeEvergreenFill } from "react-icons/pi";
import {  BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";

import { styles } from "./plantationStyles.js";
import Select from "react-select";
// import AxiosInstance from "../../../AxiosInstance";
import axios from "axios";
import PlantationDetails from "../PlantationDetails/plantationDetails";


export default function Plantation({ onBackToSidebar }) {
  const [perimeter, setPerimeter] = useState("1.5");
  const [area, setArea] = useState("100");
  const [PlantTypeselectedValue, setPlantTypeselectedValue] = useState(null);
  const [PlantSpaceUnitselectedValue, setPlantSpaceUnitselectedValue] =
    useState("");
    const [RowSpaceUnitselectedValue, setRowSpaceUnitselectedValue] =
    useState("");
  const [PlantSpaceUnitselectedValue1, setPlantSpaceUnitselectedValue1] =
    useState("");
const [RowSpaceUnitselectedValue1, setRowSpaceUnitselectedValue1] =
    useState("");
    
  const [inputValuePlantspace, setInputValuePlantspace] = useState("");
  const [inputValueRowspace, setInputValueRowspace] = useState("");

  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);


  const handleInput1Change = (event) => {
    setInputValuePlantspace(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInputValueRowspace(event.target.value);
  };

  const handleInputPlantType = (event) => {
    setPlantTypeselectedValue(event.target.value);
  };


  const handlePlantSpaceUnitChange = (selectedOption) => {
    setPlantSpaceUnitselectedValue1(selectedOption);
    setPlantSpaceUnitselectedValue(selectedOption.value);
  };
 
  const handleRowSpaceUnitChange = (selectedOption) => {
    setRowSpaceUnitselectedValue1(selectedOption);
    setRowSpaceUnitselectedValue(selectedOption.value);
  };
 
  const handlePlantationDetails = async (e) => {
    
    try {
      // Validate required fields
      if (
 
        !PlantSpaceUnitselectedValue ||
        !RowSpaceUnitselectedValue ||
        !PlantTypeselectedValue ||
        !inputValuePlantspace ||
        !inputValueRowspace
      ) {
        throw new Error("Please fill in all fields");
      }

      setCurrentPage("plantationDetails"); 
      setAnimatePage(true);
      e.preventDefault();

      // Prepare data for the request
      const requestData = {
        PlantTypeselectedValue,
        inputValuePlantspace,
        inputValueRowspace,
        PlantSpaceUnitselectedValue,
        RowSpaceUnitselectedValue
      };

      // Make POST request to the backend
      const response = await axios.post(
        "http://10.10.23.159:3000/api/plantation/plantation",
        requestData
      );

      // Handle successful response
      console.log("Response:", response.data);
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
            <p style={styles.titleText1}>Plantation</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Land Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
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

{/* box 2 */}
          <div style={styles.box2}>
            <div style={styles.box2Property}>
              <PiTreeEvergreenFill name="plant" size={35} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Plant</p>
              </div>
            </div>
            <div style={styles.box2Property}>
              <input
                  type="text"
                  style={styles.box2input}
                  placeholder="Tea"
                  value={PlantTypeselectedValue}
                  onChange={handleInputPlantType}
                />
              
            </div>
          </div>
{/* box 3 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <RxRowSpacing name="format-line-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Plant Spacing</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="00"
                  value={inputValuePlantspace}
                  onChange={handleInput1Change}
                />
                <Select
                  placeholder="m"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={PlantSpaceUnitselectedValue1}
                  onChange={handlePlantSpaceUnitChange}
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
{/* box 4 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <MdFormatLineSpacing name="format-row-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Row Spacing</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="00"
                  value={inputValueRowspace}
                  onChange={handleInput2Change}
                />
                <Select
                  placeholder="m"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={RowSpaceUnitselectedValue1}
                  onChange={handleRowSpaceUnitChange}
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


          
{/* calculate button */}
          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handlePlantationDetails}>
              <p style={styles.Box4ButtonText}>Calculate Plantation</p>
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
        {currentPage === "plantationDetails" && (
          <PlantationDetails
            onBackToSidebar={handleBackClick}
            inputValuePlantspace={inputValuePlantspace}
            inputValueRowspace={inputValueRowspace}            
            PlantSpaceUnitselectedValue={PlantSpaceUnitselectedValue}
            RowSpaceUnitselectedValue={RowSpaceUnitselectedValue}
            PlantSpaceUnitselectedValue1={PlantSpaceUnitselectedValue1}
            RowSpaceUnitselectedValue1={RowSpaceUnitselectedValue1}
            PlantTypeselectedValue={PlantTypeselectedValue}
          
          />
        )}
      </div>
    </div>
  );
}
