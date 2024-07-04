import React from 'react';
import { Button } from "antd";

const MapDetailsPanel = ({ mapDetails, onClose }) => {
  if (!mapDetails) return null;

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
        width: "160px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
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
        <h5>{mapDetails.templateName}</h5>
      </div>
      <p>Area: {parseFloat(mapDetails.area).toFixed(2)}</p>
      <p>Perimeter: {parseFloat(mapDetails.perimeter).toFixed(2)}</p>
      <p>Land Type: {mapDetails.landType}</p>
      <p>Location: {mapDetails.location}</p>
      <p>Description: {mapDetails.description}</p>
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
      style={
        {
       fontSize: "11px",
        }
      }
      danger
      >
      Close
      </Button>
      </div>
    </div>
  );
};

export default MapDetailsPanel;