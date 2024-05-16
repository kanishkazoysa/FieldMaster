// SideNavbar.js
import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone, PiPlantFill, PiTreeFill,PiClock } from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GiStonePile } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import Select from "react-select";
import axios from "axios";
import { styles } from "./clearLandStyles";

export default function ClearLand({ onBackToSidebar }) {
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [perimeter, setPerimeter] = useState("1.5");
  const [area, setArea] = useState("100");
  const [plantTypeSelectedValue, setPlantTypeSelectedValue] = useState(null);
  const [plantTypeSelectedValue1, setPlantTypeSelectedValue1] = useState(null);
  const handlePlantTypeChange = (selectedOption) => {
    setPlantTypeSelectedValue1(selectedOption);
    setPlantTypeSelectedValue(selectedOption.value);
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
            <p style={styles.titleText1}>ClearLand</p>
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

          {/* second box */}
          <div style={styles.box2}>
            <div>
              <div style={styles.box2InnerTop}>
                <PiPlantFill color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Weeds</p>
                </div>
              </div>
              <div style={styles.box2InnerBottom}>
                <button style={styles.box2Button}>
                  <p style={styles.box2ButtonText}>Low</p>
                </button>
                <button style={styles.box2Button}>
                  <p style={styles.box2ButtonText}>Medium</p>
                </button>
                <button style={styles.box2Button}>
                  <p style={styles.box2ButtonText}>High</p>
                </button>
              </div>
            </div>
          </div>

          {/* third box */}
          <div style={styles.box3}>
            <div>
              <div style={styles.box2InnerTop}>
                <PiTreeFill color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Plants</p>
                </div>
              </div>
            </div>
            <div style={styles.box3InnerBottom}>
              <div style={styles.dropDownContainer}>
                <select style={styles.dropdown}>
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="option1">Low</option>
                  <option value="option2">Medium</option>
                  <option value="option3">High</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    // value={con}
                    // onChange={}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={console}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
          </div>

          {/* fourth box */}
           <div style={styles.box3}>
            <div>
              <div style={styles.box2InnerTop}>
                <GiStonePile color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Stones</p>
                </div>
              </div>
            </div>
            <div style={styles.box3InnerBottom}>
              <div style={styles.dropDownContainer}>
                <select style={styles.dropdown}>
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="option1">Low</option>
                  <option value="option2">Medium</option>
                  <option value="option3">High</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    // value={con}
                    // onChange={}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={console}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
          </div>

          {/* fifth box */}
          <div style={styles.box5}>
          <div style={styles.box5leftcontainer}>
                <GrUserWorker color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Labors : </p>
                </div>
              </div>
              <div style={styles.box5inputContainer}>
              <input
                    type="text"
                    style={{...styles.box3input,width:"70%"}}
                    placeholder="Enter labor count"
                    // value={con}
                    // onChange={}
                  />
                </div>
          </div>

           {/* sixth box */}
           <div style={styles.box5}>
          <div style={{...styles.box5leftcontainer,width:"65%"}}>
                <PiClock color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Work hours : </p>
                </div>
              </div>
              <div style={styles.box5inputContainer}>
              <input
                    type="text"
                    style={{...styles.box3input,width:"100%",marginLeft:"-30px"}}
                    placeholder="Enter no of hours"
                    // value={con}
                    // onChange={}
                  />
                </div>
          </div>

          {/* seventh box */}
          <div style={styles.box7}>
          <div>
              <div style={styles.box2InnerTop}>
                <HiTruck color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Machinery</p>
                </div>
              </div>
            </div>
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
      ></div>
    </div>
  );
}
