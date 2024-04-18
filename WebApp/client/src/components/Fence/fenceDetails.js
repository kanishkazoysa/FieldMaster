// SideNavbar.js
import React from "react";
import { useState } from "react";
import { FaSquare,FaRegSquare } from "react-icons/fa";
import { HiMiniBars4 } from "react-icons/hi2";
import { TbArrowBarBoth ,TbBarrierBlock,TbFence } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";




export default function FenceDetails({onBackToSidebar,inputValuePostspace,displayValues,PostSpaceUnitselectedValue,FenceTypeselectedValue}) {
  return (
    <div style={styles.content}>
      <div style={styles.header}>
      <MdArrowBack
          onClick={onBackToSidebar}
          style={styles.backButton}
          fontSize={20}
        />
        <p style={styles.titleText1}>Fence Details</p>
      </div>

      {/* first box */}

      <div style={styles.Box1}>
        <p style={styles.titleText}>Total Posts / Sticks</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
          <div style={{ transform: "rotate(90deg)" }}>
            <HiMiniBars4 color="gray" size={40} />
          </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Total Amount</p>
              <p style={styles.propertyValue}>100</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <TbArrowBarBoth color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>post Gap</p>
              <p style={styles.propertyValue}>{inputValuePostspace} {PostSpaceUnitselectedValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second box */}

      <div style={styles.Box2}>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <FaRegSquare color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Perimeter</p>
              <p style={styles.propertyValue}>1.5Km</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <FaSquare color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>100 acres</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third box */}

      <div style={styles.box3}>
        <p style={styles.innertopText}>Result based on</p>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <TbFence name="gate" size={40} color="gray" />
            <p style={styles.propertyLabel1}>Fence Type &nbsp;&nbsp;:</p>
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>{FenceTypeselectedValue}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <TbBarrierBlock  name="boom-gate" size={40} color="gray" />
            <p style={styles.propertyLabel1}>Gates  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</p>
          </div>
          <div style={styles.innersquareright1}>
  {displayValues.length === 0 ? (
    <div>No Gate</div>
  ) : (
    displayValues.map((value, index) => (
      <div key={index}>{value}</div>
    ))
  )}
</div>
        </div>
      </div>

      <div style={styles.bottom}>
        <button style={styles.Button1}>
          <p style={styles.Box4ButtonText}>Save Data</p>
        </button>
      </div>
    </div>
  );
}

const styles = {

  backButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "white",
  },

  content: {
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "100%",
    marginTop: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },

  header: {
    display: "flex",
    width: "105%",
    height: "40px",
    backgroundColor: "#007BFF",
    alignItems: "center",
    borderRadius: "5px",
  },

  titleText1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    color: "white",
    marginLeft: "105px",
  },

  /*first section*/

  Box1: {
    width: "90%",
    height: "101px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "30px",
    borderRadius: "11px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
  },

  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 0,
  },

  propertyBox: {
    display: "flex",
    flexDirection: "coloumn",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginTop: "8px",
  },

  property: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "left",
    backgroundColor: "white",
    width: "46%",
    //height: 50,
  },

  propertyDetails: {
    flexDirection: "column",
    marginLeft: 5,
    width: "60%",
    //height: 40,
    backgroundColor: "white",
  },

  propertyLabel: {
    fontSize: 14,
    marginBottom: 0,
  },

  propertyLabel1: {
    fontSize: 14,
    marginBottom: 0,
    marginLeft: 10,
  },

  propertyValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },

  Box4ButtonText: {
    color: "white",
    fontSize: 16,
    marginBottom: 0,
  },

  Box2: {
    width: "90%",
    height: "81px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "10px",
    borderRadius: "11px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
  },

  /*third box*/

  box3: {
    width: "90%",
    //height: "max-content",
    height: 200,
    backgroundColor: "white",
    marginTop: 15,
    borderRadius: 11,
    padding: 20,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  innertopText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },

  innercenter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 3,
  },

  innersquareleft: {
    display: "flex",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  innersquareright: {
    display: "flex",
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },

  innersquareright1: {
    display: "flex",
    width: "45%",
    height: 10,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "flex-start",
    backgroundColor: "white",
    flexDirection: "column",
  },

  bottom: {
    alignItems: "center",
    marginTop: 120,
    width: "92%",
    
  },

  Button1: {
    display: "flex",
    width: "100%",
    height: 38,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 0,
  },
};
