import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import {styles} from "./calculatorStyles.js";
import { SiZalando } from "react-icons/si";
import { FaVectorSquare } from "react-icons/fa6";
import Select from "react-select";

export default function Calculator({onBackToSidebar})  {
    const [perimeter, setPerimeter] = useState("1.5");
    const [area, setArea] = useState("100");
    const [AreaUnitselectedValue, setAreaUnitselectedValue] = useState(null);
    const [AreaUnitselectedValue1, setAreaUnitselectedValue1] = useState(null);
    const handleAreaChange = (event) => {
        setArea(event.target.value);
      };

      const handleAreaUnitChange = (selectedOption) => {
        setAreaUnitselectedValue1(selectedOption);
        setAreaUnitselectedValue(selectedOption.value);
      };
    return (
    //     <div style={styles.header}>
    //     <MdArrowBack
    //       onClick={onBackToSidebar}
    //       style={styles.backButton}
    //       fontSize={20}
    //     />{" "}
    //   </div>
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
    </div>

    // area section

    
  )
}



