// SideNavbar.js
import React, { useState} from "react";
import { MdArrowBack } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";
import {
  PiSquareDuotone,
  PiPlantFill,
  PiTreeFill,
  PiClock,
} from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GiStonePile } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import axios from "axios";
import { styles } from "./clearLandStyles";
import { FiSearch } from "react-icons/fi";
import { Input, Space, List, AutoComplete } from "antd";
import { CloseSquareFilled } from "@ant-design/icons";
export default function ClearLand({ onBackToSidebar }) {
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [perimeter, setPerimeter] = useState("1.5");
  const [area, setArea] = useState("100");
  const [plantTypeSelectedValue, setPlantTypeSelectedValue] = useState(null);
  const [plantTypeSelectedValue1, setPlantTypeSelectedValue1] = useState(null);
  const [stoneTypeSelectedValue, setStoneTypeSelectedValue] = useState(null);
  const [stoneTypeSelectedValue1, setStoneTypeSelectedValue1] = useState(null);
  const [pressed, setPressed] = useState(null);
  const [plantCount, setPlantCount] = useState("");
  const [stonesCount, setStonesCount] = useState("");
  const [laborCount, setLaborCount] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [machineCount, setMachineCount] = useState("");

  // const { Search } = Input;

  const machineryList = [
    "Bulldozers",
    "Excavators",
    "Backhoes",
    "Skid-steer loaders",
    "Chainsaws",
    "Brush cutters",
    "Tractors",
    "Land clearing rakes",
  ];

  const prefix = <FiSearch style={{ fontSize: 16, color: "#d3d3d3" }} />;

  const handlePlantTypeChange = (event) => {
    setPlantTypeSelectedValue(event.target.value);
  };

  const handlePlantCountChange = (event) => {
    setPlantCount(event.target.value);
  };

  const handleStoneTypeChange = (event) => {
    setStoneTypeSelectedValue(event.target.value);
  };

  const handleStoneCountChange = (event) => {
    setStonesCount(event.target.value);
  };

  const handleLaborCountChange = (event) => {
    setLaborCount(event.target.value);
  };

  const handleWorkHourChange = (event) => {
    setWorkHours(event.target.value);
  };

  const handleMachineCountChange = (event) => {
    setMachineCount(event.target.value);
  };

  const [displayValues, setDisplayValues] = useState([]);
  const handleAdd = () => {
    //validation part Add button
    const combinedValue = plantCount + " x " + plantTypeSelectedValue;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setPlantTypeSelectedValue("");
    setPlantCount("");
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const [displayValues1, setDisplayValues1] = useState([]);

  const handleAdd1 = () => {
    //validation part Add button
    const combinedValue1 = stonesCount + " x " + stoneTypeSelectedValue;
    const newDisplayValues1 = [...displayValues1, combinedValue1].filter(
      Boolean
    );
    setDisplayValues1(newDisplayValues1);
    setStoneTypeSelectedValue("");
    setStonesCount("");
  };

  const handleRemoveValue1 = (index) => {
    const newDisplayValues1 = [...displayValues1];
    newDisplayValues1.splice(index, 1);
    setDisplayValues1(newDisplayValues1);
  };

  const [displayValues2, setDisplayValues2] = useState([]);
  const handleAdd2 = () => {
    //validation part Add button
    const combinedValue2 = machineCount + " x " + searchValue;
    const newDisplayValues2 = [...displayValues2, combinedValue2].filter(
      Boolean
    );
    setDisplayValues2(newDisplayValues2);
    setSearchValue("");
    setMachineCount("");
  };

  const handleRemoveValue2 = (index) => {
    const newDisplayValues2 = [...displayValues2];
    newDisplayValues2.splice(index, 1);
    setDisplayValues2(newDisplayValues2);
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredMachinery, setFilteredMachinery] = useState([]);

  const handleSearchChange = (value) => {
    setSearchValue(value);

    if (value) {
      const filtered = machineryList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMachinery(filtered);
    } else {
      setFilteredMachinery([]);
    }
  };

  const handleItemClick = (item) => {
    setSearchValue(item);
    setFilteredMachinery([]); // Clear the list after selecting an item
  };

  const handleClearlandDetails = async (e) => {
    try {
      // Validate required fields
      if (
        !pressed ||
        !(displayValues.length > 0) ||
        !(displayValues1.length > 0) ||
        !laborCount ||
        !workHours
      ) {
        throw new Error("Please fill in all fields");
      }

      setCurrentPage("EffortOutput"); // Update this line
      setAnimatePage(true);
      e.preventDefault();

      // Prepare data for the request
      const requestData = {
        displayValues,
        displayValues1,
        displayValues2,
        pressed,
        plantTypeSelectedValue,
        plantCount,
        stoneTypeSelectedValue,
        stonesCount,
        laborCount,
        workHours,
        machineCount,
      };

      // Make POST request to the backend
      const response = await axios.post(
        "http://192.168.8.173:3000/api/clearLand/clearLand",
        requestData
      );

      // Handle successful response
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
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
                <button
                  style={
                    pressed === "Low" ? styles.pressedButton : styles.box2Button
                  }
                  onClick={() => setPressed("Low")}
                >
                  <p
                    style={
                      pressed === "Low"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    Low
                  </p>
                </button>
                <button
                  style={
                    pressed === "Medium"
                      ? styles.pressedButton
                      : styles.box2Button
                  }
                  onClick={() => setPressed("Medium")}
                >
                  <p
                    style={
                      pressed === "Medium"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    Medium
                  </p>
                </button>
                <button
                  style={
                    pressed === "High"
                      ? styles.pressedButton
                      : styles.box2Button
                  }
                  onClick={() => setPressed("High")}
                >
                  <p
                    style={
                      pressed === "High"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    High
                  </p>
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
                <select
                  style={styles.dropdown}
                  value={plantTypeSelectedValue}
                  onChange={handlePlantTypeChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    value={plantCount}
                    onChange={handlePlantCountChange}
                    onSubmitEditing={handleAdd}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={handleAdd}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
            <div style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <IoIosCloseCircleOutline
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </button>
                </div>
              ))}
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
                <select
                  style={styles.dropdown}
                  value={stoneTypeSelectedValue}
                  onChange={handleStoneTypeChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    value={stonesCount}
                    onChange={handleStoneCountChange}
                    onSubmitEditing={handleAdd1}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={handleAdd1}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
            <div style={styles.displayValuesContainer}>
              {displayValues1.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue1(index)}
                    style={styles.closeButton}
                  >
                    <IoIosCloseCircleOutline
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </button>
                </div>
              ))}
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
                style={{ ...styles.box3input, width: "70%" }}
                placeholder="Enter labor count"
                value={laborCount}
                onChange={handleLaborCountChange}
              />
            </div>
          </div>

          {/* sixth box */}
          <div style={styles.box5}>
            <div style={{ ...styles.box5leftcontainer, width: "65%" }}>
              <PiClock color="gray" size={20} />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Work hours : </p>
              </div>
            </div>
            <div style={styles.box5inputContainer}>
              <input
                type="text"
                style={{
                  ...styles.box3input,
                  width: "100%",
                  marginLeft: "-30px",
                }}
                placeholder="Enter no of hours"
                value={workHours}
                onChange={handleWorkHourChange}
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

            <Space direction="vertical" style={{ width: "100%"}}>
              <AutoComplete
                option={filteredMachinery.map((item) => ({ value: item }))}
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearchChange}
              >
                <Input
                  size="small"
                  placeholder="Search for machines"
                  prefix={prefix}
                  style={styles.searchbar}
                  allowClear={{
                    clearIcon: <CloseSquareFilled />,
                  }}
                />
              </AutoComplete>
              {filteredMachinery.length > 0 && (
                <List
                  bordered
                  dataSource={filteredMachinery}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => handleItemClick(item)}
                      style={styles.searchbarListItems}
                      size="small"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f0f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                      }}
                    >
                      {item}
                    </List.Item>
                  )}
                  style={styles.searchbarList}
                />
              )}
            </Space>

            <div style={styles.box7InputContainer}>
              <p style={styles.box7inputLabel}>Count : </p>
              <input
                type="text"
                style={styles.box7input}
                placeholder="Enter machine count"
                value={machineCount}
                onChange={handleMachineCountChange}
                onSubmitEditing={handleAdd2}
              />
            </div>
            <div style={styles.box7addButtonContainer}>
                <button style={{...styles.addButton,width:"100%"}} onClick={handleAdd2}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>

              <div style={styles.displayValuesContainer}>
              {displayValues2.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue2(index)}
                    style={styles.closeButton}
                  >
                    <IoIosCloseCircleOutline
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleClearlandDetails}>
              <p style={styles.addButtonText}>Calculate</p>
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
        {/* {currentPage === "FenceDetails" && (
          <FenceDetails
            onBackToSidebar={handleBackClick}
            inputValuePostspace={inputValuePostspace}
            displayValues={displayValues}
            PostSpaceUnitselectedValue={PostSpaceUnitselectedValue}
            FenceTypeselectedValue={FenceTypeselectedValue}
          />
        )} */}
      </div>
    </div>
  );
}
