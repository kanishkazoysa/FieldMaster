// SideNavbar.js
import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone, PiPlantFill, PiTreeFill } from "react-icons/pi";
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
      </div>
    </div>
  );
}
