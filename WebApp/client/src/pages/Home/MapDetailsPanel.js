import React from 'react';
import { Button } from "antd";

const MapDetailsPanel = ({ mapDetails, onClose }) => {
  if (!mapDetails) return null;

  const { mapDetails: map, fenceDetails, plantationDetails } = mapDetails;

  return (
    <div
      style={{
        position: "absolute",
        right: "20%",
        top: "260px",
        background: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        width: "200px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderBottom: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        <h5>{map.templateName}</h5>
      </div>
      <p>Area: {parseFloat(map.Area).toFixed(2)}</p>
      <p>Perimeter: {parseFloat(map.Perimeter).toFixed(2)}</p>
      <p>Land Type: {map.landType}</p>
      <p>Location: {map.location}</p>
      <p>Description: {map.description}</p>

      {fenceDetails && (
        <>
          <h6>Fence Details</h6>
          <p>Post Space: {fenceDetails.postSpace} {fenceDetails.postSpaceUnit}</p>
          <p>Number of Sticks: {fenceDetails.numberOfSticks}</p>
          <p>Fence Type: {fenceDetails.fenceType}</p>
          <p>Number of Gates: {fenceDetails.fenceAmount.join(', ')}</p>
          <p>Gate Lengths: {fenceDetails.fenceLength.join(', ')}</p>
        </>
      )}

      {plantationDetails && (
        <>
          <h6>Plantation Details</h6>
          <p>Number of Plants: {plantationDetails.numberOfPlants}</p>
          <p>Plant Type: {plantationDetails.plantType}</p>
          <p>Plant Space: {plantationDetails.plantSpace} {plantationDetails.unit}</p>
          <p>Row Space: {plantationDetails.rowSpace} {plantationDetails.unit}</p>
          <p>Plant Density: {plantationDetails.plantDensity}</p>
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "10px",
        }}
      >
        <Button 
          type='primary' 
          onClick={onClose}
          style={{
            fontSize: "11px",
          }}
          danger
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default MapDetailsPanel;