import React from 'react';
import { MdArrowBack } from "react-icons/md";
import { styles } from "./calculatorStyles.js"; // Import styles if necessary

export default function CalculatorSelect({ onBackToSidebar, area, perimeter }) {
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

            <div style={styles.resultBox}>
                <p>Area: {area}</p>
                <p>Perimeter: {perimeter}</p>
            </div>

            <div style={styles.bottom}>
                <button style={styles.Button1}>
                    <p style={styles.Box4ButtonText}>Calculate</p>
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
