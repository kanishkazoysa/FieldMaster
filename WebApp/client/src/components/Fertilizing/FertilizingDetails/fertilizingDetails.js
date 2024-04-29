// SideNavbar.js
import React from "react";
import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./fertilizingDetailsStyles";

import { SlChemistry } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";

import { IoTimeSharp } from "react-icons/io5";
import { GiWeight } from "react-icons/gi";
import { GiChemicalDrop } from "react-icons/gi";
import { Tb24Hours } from "react-icons/tb";
import Fertilizing from "../../Fertilizing/Fertilizing/fertilizing";

export default function FertilizingDetails({
  onBackToSidebar,
  textPlant,
}) {

  const [numberOfPlants, setnumberOfPlants] = useState(null);
  const [PlantDensity, setPlantDensity] = useState(null);

  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

//   const handleFertilization = () => {
//       setCurrentPage("Fertilizing");
//       setAnimatePage(true);
//   };

// const { FertilizerType, NumberOfTime, FertilizerAmount, FertilizerAmountUnit, SelectedButton,count,plantcount} = params;
//   const [factorValue, setFactor] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [Total,setTotal] = useState(0);

//   useEffect(() => {
//     console.log("in Fertilization details screen", FertilizerType, NumberOfTime, FertilizerAmount, FertilizerAmountUnit, SelectedButton,plantcount);
//     let factorValue = 1;
//     switch (SelectedButton) {
//       case "Daily":
//         factorValue = 365;
//         break;
//       case "Weekly":
//         factorValue = 4; 
//         break;
//       case "Monthly":
//         factorValue = 12;
//         break;
//       case "Quarter":
//         factorValue = 4;
//         break;
//       case "Yearly":
//         factorValue = 1;
//         break;
//       default:
//         factorValue = 1;
//     }
//     setFactor(factorValue);
//     setTotalAmount(NumberOfTime * FertilizerAmount * factorValue);

    
//   }, []);

//   useEffect(() =>{
//     setTotal((plantcount*totalAmount/1000));
//   })

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://10.10.23.159:3000/api/fertilizers/FertilizerAmountNeeded');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setnumberOfPlants(data.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []);





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
        <p style={styles.titleText1}>Fertilizing Details</p>
      </div>

      {/* first box  */}
      {/* to rotate - style={{ transform: "rotate(90deg)" }} */}

      <div style={styles.Box1}>
        <p style={styles.titleText}>Total Amount of Fertilizer</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <div >
              <SlChemistry color="gray" size={30} />
            </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Total Amount</p>
              <p style={styles.propertyValue}>{numberOfPlants} Plants</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <FaClockRotateLeft color="gray" size={25} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Monthly</p>
              <p style={styles.propertyValue}>
                100g
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second box */}

      <div style={styles.Box2}>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <BsBoundingBox color="gray" size={28} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Perimeter</p>
              <p style={styles.propertyValue}>1.5Km</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>100 acres</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third box */}

      <div style={styles.box3}>
        <p style={styles.innertopText}>Results based on</p>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <GiChemicalDrop name="tree" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>Fertilizer Type</p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textPlant}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <GiWeight  name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Amount 
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {}{}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <IoTimeSharp name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              No of Times
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {}{}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <Tb24Hours name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Frequency
            </p>
            </div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {}{}</p>
          </div>
        </div>

      </div>
      

      {/* <div style={styles.bottom}>
        <button style={styles.Button1}>
          <p style={styles.Box4ButtonText}>Fertilization</p>
        </button>
      </div> */}

      <div style={styles.bottom2}>
        <button style={styles.Button2}>
          <p style={styles.Box4ButtonText}>Save as PDF</p>
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
        {/* {currentPage === "Fertilizing" && (
          <Fertilizing
            onBackToSidebar={handleBackClick}
            textPlant={textPlant}
            PlantDensity={PlantDensity}
            numberOfPlants={numberOfPlants}



          />
        )} */}
      </div>
    </div>
  );
}
