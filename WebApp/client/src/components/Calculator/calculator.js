// import React from 'react'
// import { MdArrowBack } from "react-icons/md";
// import { useState } from "react";
// import {styles} from "./calculatorStyles.js";
// import { SiZalando } from "react-icons/si";
// import { FaVectorSquare } from "react-icons/fa6";
// import Select from "react-select";

// export default function Calculator({onBackToSidebar})  {
//     const [perimeter, setPerimeter] = useState("1.5");
//     const [area, setArea] = useState("100");
//     const [AreaUnitselectedValue, setAreaUnitselectedValue] = useState(null);
//     const [AreaUnitselectedValue1, setAreaUnitselectedValue1] = useState(null);
//     const handleAreaChange = (event) => {
//         setArea(event.target.value);
//       };

//       const handleAreaUnitChange = (selectedOption) => {
//         setAreaUnitselectedValue1(selectedOption);
//         setAreaUnitselectedValue(selectedOption.value);
//       };
//     return (
//     //     <div style={styles.header}>
//     //     <MdArrowBack
//     //       onClick={onBackToSidebar}
//     //       style={styles.backButton}
//     //       fontSize={20}
//     //     />{" "}
//     //   </div>
//     <div style={styles.content}>
//         <div style={styles.header}>
//             <MdArrowBack
//               onClick={onBackToSidebar}
//               style={styles.backButton}
//               fontSize={20}
//             />
//             <p style={styles.titleText1}>Manual Calculator</p>
//           </div>

//           <div style={styles.box3}>
//             <div style={styles.box3Property}>
//               <div>
//                 <SiZalando name="format-line-spacing" size={25} color="gray" />
//               </div>
//               <div style={styles.box3PropertyDetails}>
//                 <p style={styles.Box3PropertyLabel}>Area</p>
//               </div>
//             </div>
//             <div style={styles.box3Property}>
//               <div style={styles.box3inputContainer}>
//                 <input
//                   type="text"
//                   style={styles.box3input}
//                   placeholder="25"
//                   value={area}
//                   onChange={handleAreaChange}
//                 />
//                 <Select
//                   placeholder="Acres"
//                   options={[
//                     { value: "m", label: "m" },
//                     { value: "Acres", label: "Acres" },
//                   ]}
//                   value={AreaUnitselectedValue1}
//                   onChange={handleAreaUnitChange}
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       textAlign: "center",
//                       fontSize: "14px",
//                       width: "120px",
                      
//                     }),
//                   }}
//                 />
//               </div>
//             </div>
//             <div style={styles.smallText}>
//                 <p>*Note that this area is approximately correct</p>
//             </div>
//           </div>
//     </div>

//     // area section

    
//   )
// }

import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { SiZalando } from "react-icons/si";
import { BsBoundingBox } from "react-icons/bs";
import Select from "react-select";
import { styles } from "./calculatorStyles.js";
import CalculatorSelect from "./calculatorSelect"; // Import CalculatorSelect component

export default function Calculator({ onBackToSidebar }) {
  // State hooks for managing input values and selected units
  const [perimeter, setPerimeter] = useState("");
  const [area, setArea] = useState("");
  const [AreaUnitselectedValue, setAreaUnitselectedValue] = useState(null);
  const [AreaUnitselectedValue1, setAreaUnitselectedValue1] = useState(null);
  const [PerimeterUnitselectedValue, setPerimeterUniteSelectedValue] =
    useState(null);
  const [PerimeterUnitselectedValue1, setPerimeterUniteSelectedValue1] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  // Handler to ensure only numeric input for area
  const handleAreaChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setArea(value);
  };

  // Handler to ensure only numeric input for perimeter
  const handlePerimeterChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPerimeter(value);
  };

  // Handlers for select dropdowns
  const handleAreaUnitChange = (selectedOption) => {
    setAreaUnitselectedValue1(selectedOption);
    setAreaUnitselectedValue(selectedOption.value);
  };

  const handlePerimeterUnitChange = (selectedOption) => {
    setPerimeterUniteSelectedValue1(selectedOption);
    setPerimeterUniteSelectedValue(selectedOption.value);
  };

  // Handler for calculate button click
  // Handler for calculate button click
  const handleCalculate = async (e) => {
    e.preventDefault();

    try {
      // Check for missing inputs
      if (
        !area.trim() ||
        !perimeter.trim() ||
        !AreaUnitselectedValue ||
        !PerimeterUnitselectedValue
      ) {
        throw new Error("Please fill in all fields");
      }

      // Check for non-numeric values in area and perimeter
      const areaNumeric = parseFloat(area);
      const perimeterNumeric = parseFloat(perimeter);

      if (isNaN(areaNumeric)) {
        throw new Error("Please enter a valid numeric value for area");
      }

      if (isNaN(perimeterNumeric)) {
        throw new Error("Please enter a valid numeric value for perimeter");
      }

      // Navigate to calculatorSelect page
      setCurrentPage("calculatorSelect");
      setAnimatePage(true);

      const requestData = { area: areaNumeric, perimeter: perimeterNumeric };
      console.log("Request Data:", requestData);

      // Here you can send the request to the backend if needed
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    }
  };

  // Handler for back button click to navigate back to the main page
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
            <p style={styles.titleText1}>Manual Calculator</p>
          </div>

          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div>
                <SiZalando name="format-line-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Area</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="number"
                  style={styles.box3input}
                  placeholder="25"
                  value={area}
                  onChange={handleAreaChange} // Validate numeric input for area
                  inputMode="numeric" // Mobile device numeric keypad
                  pattern="[0-9]*" // HTML5 pattern for numeric values
                />
                <Select
                  placeholder="Acres"
                  options={[
                    { value: "m²", label: "m²" },
                    { value: "Acres", label: "Acres" },
                  ]}
                  value={AreaUnitselectedValue1}
                  onChange={handleAreaUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "120px",
                    }),
                  }}
                />
              </div>
            </div>
            <div style={styles.smallText}>
              <p>*Note that this area is approximately correct</p>
            </div>
          </div>

          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div>
                <BsBoundingBox
                  name="format-line-spacing"
                  size={25}
                  color="gray"
                />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Perimeter</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="number"
                  style={styles.box3input}
                  placeholder="25"
                  value={perimeter}
                  onChange={handlePerimeterChange} // Validate numeric input for perimeter
                  inputMode="numeric" // Mobile device numeric keypad
                  pattern="[0-9]*" // HTML5 pattern for numeric values
                />
                <Select
                  placeholder="m"
                  options={[
                    { value: "m", label: "m" },
                    { value: "km", label: "km" },
                  ]}
                  value={PerimeterUnitselectedValue1}
                  onChange={handlePerimeterUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "120px",
                    }),
                  }}
                />
              </div>
            </div>
            <div style={styles.smallText}>
              <p>*Note that this Perimeter is approximately correct</p>
            </div>
          </div>

          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleCalculate}>
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
          overflow: "auto",
        }}
      >
        {currentPage === "calculatorSelect" && (
          <CalculatorSelect
            onBackToSidebar={handleBackClick}
            area={area}
            perimeter={perimeter}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}
            AreaUnitselectedValue={AreaUnitselectedValue}
          />
        )}
      </div>
    </div>
  );
}



