import React, { useState } from 'react';
import { MdArrowBack, MdFence } from "react-icons/md";
import { PiTreePalmFill, PiSquareDuotone } from "react-icons/pi";
import { BsBoundingBox } from "react-icons/bs";
import { TbBackhoe } from "react-icons/tb";
import { styles } from "./calculatorSelectStyles";
import PlantationManul from "../PlantationManual/PlantationPageManual/PlantationManul";
import FenceManual from '../Fence Manual/Fence/fenceManual';

const convertAreaToSqMeters = (area, unit) => {
    const conversionRates = {
        "Acres": 4046.86,  // 1 Acre = 4046.86 sq meters
        "Perch": 25.2929,  // 1 Perch = 25.2929 sq meters
        "m²": 1            // 1 sq meter = 1 sq meter
    };

    return area * (conversionRates[unit] || 1);
};

export default function CalculatorSelect({ onBackToSidebar, area, perimeter, PerimeterUnitselectedValue, AreaUnitselectedValue }) {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    // For plantation 
    const [currentPage, setCurrentPage] = useState(null);
    const [animatePage, setAnimatePage] = useState(false);
    const [Perimeter, setPerimeter] = useState(0);
    const [perimetersetValue, setperimetersetValue] = useState("");

    const handleBackClick = () => {
        setAnimatePage(false);
        setTimeout(() => {
            setCurrentPage(null);
        }, 300);
    };

    const handlePageChange = (page) => {
        let updatedPerimeter = perimeter;
        let unit = PerimeterUnitselectedValue;
        if (PerimeterUnitselectedValue === "m") {
            updatedPerimeter = perimeter / 1000;
            unit = "Km";
        }
        setperimetersetValue(unit)
        setPerimeter(updatedPerimeter);
        setCurrentPage(page);
        setAnimatePage(true);
    };

    // Convert area to square meters
    const areaInSqMeters = convertAreaToSqMeters(parseFloat(area), AreaUnitselectedValue);

    // UI
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
                            onClick={() => handlePageChange('FenceManual')}
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
                        area={areaInSqMeters}  // Use converted area in sq meters
                        perimeter={perimeter}
                        PerimeterUnitselectedValue={PerimeterUnitselectedValue}
                        AreaUnitselectedValue="m²"
                    />
                )}

                {currentPage === "FenceManual" && (
                    <FenceManual
                        onBackToSidebar={handleBackClick}
                        area={area}
                        Perimeter={Perimeter} 
                        PerimeterUnitselectedValue={perimetersetValue}
                        AreaUnitselectedValue={AreaUnitselectedValue}  
                    />
                )}
            </div>
        </div>
    );
}
