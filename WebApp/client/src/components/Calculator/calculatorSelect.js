import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdFence } from "react-icons/md";
import { PiTreePalmFill, PiSquareDuotone } from "react-icons/pi";
import { BsBoundingBox } from "react-icons/bs";
import { TbBackhoe } from "react-icons/tb";
import { styles } from "./calculatorSelectStyles";
import PlantationManul from "../PlantationManual/PlantationPageManual/PlantationManul";

export default function CalculatorSelect({ onBackToSidebar, area, perimeter, PerimeterUnitselectedValue, AreaUnitselectedValue }) {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const [currentPage, setCurrentPage] = useState(null);
    const [animatePage, setAnimatePage] = useState(false);
    
    const handleBackClick = () => {
        setAnimatePage(false);
        setTimeout(() => {
            setCurrentPage(null);
        }, 300);
    };

    const handlePageChange = (page) => {
        setAnimatePage(true);
        setTimeout(() => {
            setCurrentPage(page);
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
        
                    <div style={styles.Box2}>
                        <div style={styles.propertyBox}>
                            <div style={styles.property}>
                                <BsBoundingBox color="gray" size={28} />
                                <div style={styles.propertyDetails}>
                                    <p style={styles.propertyLabel}>Perimeter</p>
                                    <p style={styles.propertyValue}>{perimeter} {PerimeterUnitselectedValue}</p>
                                </div>
                            </div>
                            <div className="property" style={styles.property}>
                                <PiSquareDuotone color="gray" size={40} />
                                <div style={styles.propertyDetails}>
                                    <p style={styles.propertyLabel}>Area</p>
                                    <p style={styles.propertyValue}>{area} {AreaUnitselectedValue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.BoxPara}>
                        <p style={styles.para}>Based on the area and perimeter values you have given now you can calculate the following</p>
                    </div>
                    <div style={styles.bottom}>
                        <button
                            style={{
                                ...styles.Button1,
                                ...(isHovered1 && styles.Button1Hover),
                            }}
                            onMouseEnter={() => setIsHovered1(true)}
                            onMouseLeave={() => setIsHovered1(false)}
                            onClick={() => handlePageChange('PlantationManul')}
                        >
                            <PiTreePalmFill
                                name="plant"
                                size={25}
                                color='green'
                                style={{
                                    ...styles.icon,
                                    ...(isHovered1 && styles.iconHover),
                                }}
                            />
                            <p
                                style={{
                                    ...styles.Box4ButtonText,
                                    ...(isHovered1 && styles.Box4ButtonTextHover),
                                }}
                            >
                                Plantation
                            </p>
                        </button>
                    </div>
        
                    <div style={styles.bottom}>
                        <button
                            style={{
                                ...styles.Button1,
                                ...(isHovered2 && styles.Button1Hover),
                            }}
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                            onClick={() => handlePageChange('ClearLand')}
                        >
                            <TbBackhoe
                                name="clear"
                                size={25}
                                color='brown'
                                style={{
                                    ...styles.icon,
                                    ...(isHovered2 && styles.iconHover),
                                }}
                            />
                            <p
                                style={{
                                    ...styles.Box4ButtonText,
                                    ...(isHovered2 && styles.Box4ButtonTextHover),
                                }}
                            >
                                Clear Land
                            </p>
                        </button>
                    </div>
        
                    <div style={styles.bottom}>
                        <button
                            style={{
                                ...styles.Button1,
                                ...(isHovered3 && styles.Button1Hover),
                            }}
                            onMouseEnter={() => setIsHovered3(true)}
                            onMouseLeave={() => setIsHovered3(false)}
                            onClick={() => handlePageChange('FenceSetup')}
                        >
                            <MdFence
                                name="fence"
                                size={25}
                                color='black'
                                style={{
                                    ...styles.icon,
                                    ...(isHovered3 && styles.iconHover),
                                }}
                            />
                            <p
                                style={{
                                    ...styles.Box4ButtonText,
                                    ...(isHovered3 && styles.Box4ButtonTextHover),
                                }}
                            >
                                Fence Setup
                            </p>
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
                {currentPage === "PlantationManul" && (
                    <PlantationManul
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
