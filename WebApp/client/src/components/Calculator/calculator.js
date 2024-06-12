import React, { useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import { SiZalando } from "react-icons/si";
import { BsBoundingBox } from "react-icons/bs";
import Select from "react-select";
import { styles } from "./calculatorStyles.js";
import CalculatorSelect from "./calculatorSelect"; // Import CalculatorSelect component

export default function Calculator({ onBackToSidebar }) {
    const [perimeter, setPerimeter] = useState("");
    const [area, setArea] = useState("");
    const [AreaUnitselectedValue, setAreaUnitselectedValue] = useState(null);
    const [AreaUnitselectedValue1, setAreaUnitselectedValue1] = useState(null);
    const [PerimeterUnitselectedValue, setPerimeterUniteSelectedValue] = useState(null);
    const [PerimeterUnitselectedValue1, setPerimeterUniteSelectedValue1] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [animatePage, setAnimatePage] = useState(false);

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const handleAreaUnitChange = (selectedOption) => {
        setAreaUnitselectedValue1(selectedOption);
        setAreaUnitselectedValue(selectedOption.value);
    };

    const handlePerimeterChange = (event) => {
        setPerimeter(event.target.value);
    };

    const handlePerimeterUnitChange = (selectedOption) => {
        setPerimeterUniteSelectedValue1(selectedOption);
        setPerimeterUniteSelectedValue(selectedOption.value);
    };

    const handleCalculate = async (e) => {
        e.preventDefault();

        try {
            if (!area || !perimeter || !AreaUnitselectedValue || !PerimeterUnitselectedValue) {
                throw new Error("Please fill in all fields");
            }

            setCurrentPage("calculatorSelect");
            setAnimatePage(true);

            const requestData = { area, perimeter };
            console.log("Request Data:", requestData);

            // Here you can send the request to the backend if needed
        } catch (error) {
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
                                    type="text"
                                    style={styles.box3input}
                                    placeholder="25"
                                    value={area}
                                    onChange={handleAreaChange}
                                />
                                <Select
                                    placeholder="Acres"
                                    options={[
                                        { value: "m", label: "m" },
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
                                <BsBoundingBox name="format-line-spacing" size={25} color="gray" />
                            </div>
                            <div style={styles.box3PropertyDetails}>
                                <p style={styles.Box3PropertyLabel}>Perimeter</p>
                            </div>
                        </div>
                        <div style={styles.box3Property}>
                            <div style={styles.box3inputContainer}>
                                <input
                                    type="text"
                                    style={styles.box3input}
                                    placeholder="25"
                                    value={perimeter}
                                    onChange={handlePerimeterChange}
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
                    />
                )}
            </div>
        </div>
    );
}
