import React from 'react';
import { MdArrowBack } from "react-icons/md";
import { PiTreeEvergreenFill } from "react-icons/pi";
import { PiTreePalmFill } from "react-icons/pi";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { TbBackhoe } from "react-icons/tb";
import { styles } from "./calculatorSelectStyles";
import { MdFence } from "react-icons/md";
export default function calculatorSelect({ onBackToSidebar, area, perimeter }) {
    return (
        <div style={styles.content}>
            <div style={styles.header}>
                <MdArrowBack
                    onClick={onBackToSidebar}
                    style={styles.backButton}
                    fontSize={20}
                />
                <p style={styles.titleText1}>Manual Calculator</p>
            </div>


            <div style={styles.Box2}>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <BsBoundingBox color="gray" size={28} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Perimeter</p>
              <p style={styles.propertyValue}>{perimeter}m</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>{area} acres</p>
            </div>
          </div>
        </div>
        </div>
           

            <div style={styles.bottom}>
                <button style={styles.Button1}>
                <PiTreePalmFill name="plant" size={25} color="green" />
                    <p style={styles.Box4ButtonText}>Plantation</p>
                </button>
            </div>

            <div style={styles.bottom}>
                <button style={styles.Button1}>
                <TbBackhoe name="clear" size={25} color="brown" />
                    <p style={styles.Box4ButtonText}>Clear Land</p>
                </button>
            </div>

            <div style={styles.bottom}>
                <button style={styles.Button1}>
                <MdFence name="fence" size={25} color="black" />
                    <p style={styles.Box4ButtonText}>Fence Setup</p>
                </button>
            </div>


            <div
                style={{
                    transform: "translateX(0)",
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "whitesmoke",
                    overflow: "auto",
                }}
            ></div>
        </div>

        
    );
}
