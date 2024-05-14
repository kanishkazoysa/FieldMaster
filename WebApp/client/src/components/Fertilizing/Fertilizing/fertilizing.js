// SideNavbar.js
import React, { useState, useRef } from "react";
import { MdArrowBack } from "react-icons/md";
import { GiWeight } from "react-icons/gi";

import { PiSquareDuotone } from "react-icons/pi";
import { MdGrass } from "react-icons/md";
import { GiGrassMushroom } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";

import { styles } from "./fertilizingStyles.js";
import Select from "react-select";
// import AxiosInstance from "../../../AxiosInstance";
import axios from "axios";
import { FaTree } from "react-icons/fa";
import FertilizingDetails from "../FertilizingDetails/fertilizingDetails";
import { GiHourglass } from "react-icons/gi";
import { FaHourglass } from 'react-icons/fa'; // Importing Hourglass icon from react-icons/fa


export default function Fertilizing(
  {
    onBackToSidebar,
    textPlant,
    PlantDensity,
    numberOfPlants
  }) {
  const [perimeter, setPerimeter] = useState("1.5");
  const [area, setArea] = useState("100");

  const [textFertilizationType, setTextFertilizationType] =
    useState("");
  const [textFertilizationNUmberoftime, setTextFertilizationNUmberoftime] =
    useState("");
  const [textFertilizationAmount, setTextFertilizationAmount] =
    useState("");
  const [FertilizerAmountUnitselectedValue, setFertilizerAmountUnitselectedValue] = useState(null);
  const [FertilizerAmountUnitselectedValue1, setFertilizerAmountUnitselectedValue1] = useState(null);

  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);


  const handleInputTypeChange = (event) => {
    setTextFertilizationType(event.target.value);
  };

  const handleInputNoOfTimesChange = (event) => {
    setTextFertilizationNUmberoftime(event.target.value);
  };
  const handleInputAmount = (event) => {
    setTextFertilizationAmount(event.target.value);
  };



  const handleAmountUnitChange = (selectedOption) => {
    setFertilizerAmountUnitselectedValue1(selectedOption);
    setFertilizerAmountUnitselectedValue(selectedOption.value);
  };



  const handleFertilizingDetails = async (e) => {

    try {
      // Validate required fields
      if (

        !textFertilizationNUmberoftime ||
        !textFertilizationAmount ||
        !textFertilizationType ||
        !FertilizerAmountUnitselectedValue

      ) {
        throw new Error("Please fill in all fields");
      }

      setCurrentPage("fertilizingDetails");
      setAnimatePage(true);
      e.preventDefault();

      // Prepare data for the request
      const requestData = {
        textPlant,


      };

      // Make POST request to the backend
      const response = await axios.post(
        "http://10.10.23.159:3000/api/fertilizers/fertilizers",
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
            <p style={styles.titleText1}>Fertilizing</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Plantation Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <FaTree color="gray" size={28}/>
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Type</p>
                  <p style={styles.propertyValue}>{textPlant}</p>
                </div>
              </div>
              <div style={styles.property}>
                <PiSquareDuotone color="gray" size={35}/>
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>
                    {area} m<sup>2</sup>
                  </p>
                </div>
              </div>
            </div>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <GiGrassMushroom color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Density</p>
                  <p style={styles.propertyValue}>{PlantDensity}/m<sup>2</sup></p>
                </div>
              </div>
              <div style={styles.property}>
                <MdGrass color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Total Plants</p>
                  <p style={styles.propertyValue}>
                    {numberOfPlants} plants
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* box 2 */}
          <div style={styles.box2}>
            <div style={styles.box2Property}>
              <SlChemistry name="plant" size={35} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Fertilizer Type</p>
              </div>
            </div>
            <div style={styles.box2Property}>
              <input
                type="text"
                style={styles.box2input}
                placeholder="Compost"
                value={textFertilizationType}
                onChange={handleInputTypeChange}
              />

            </div>
          </div>
          {/* box 3 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div >
                <FaClockRotateLeft name="format-line-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>No Of Times</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="00"
                  value={textFertilizationNUmberoftime}
                  onChange={handleInputNoOfTimesChange}
                />
              </div>
            </div>
          </div>
          {/* box 4 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div>
                <GiWeight name="format-row-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Amount</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="100"
                  value={textFertilizationAmount}
                  onChange={handleInputAmount}
                />
                <Select
                  placeholder="mg"
                  options={[
                    { value: "mg", label: "mg" },
                    { value: "g", label: "g" },
                    { value: "kg", label: "kg" },
                  ]}
                  value={FertilizerAmountUnitselectedValue1}
                  onChange={handleAmountUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "13px",
                      width: "78px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>



          {/* calculate button */}
          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleFertilizingDetails}>
              <p style={styles.Box4ButtonText}>Calculate Fertilizing</p>
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
        {currentPage === "fertilizingDetails" && (<FertilizingDetails onBackToSidebar={handleBackClick}/>)}
      </div>
    </div>
  );
}
