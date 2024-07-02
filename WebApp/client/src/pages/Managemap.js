import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Marker,
  Polygon
} from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";
import { styles, containerStyle } from "./ManagemapStyles";
import AxiosInstance from "../AxiosInstance";
import { useParams } from 'react-router-dom';

const Managemap = () => {
  const { templateId } = useParams();
  const apiKey = "AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U";
  const [points, setPoints] = useState([]);
  const [partitionPoints, setPartitionPoints] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const drawingManagerRef = useRef(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const handleGeofenceComplete = (polygon) => {
    polygon.setEditable(true);
    const newPoints = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({ latitude: latLng.lat(), longitude: latLng.lng() }));

    setPartitionPoints((prevPoints) => [...prevPoints, ...newPoints]);
    setDrawingEnabled(false);
  };

  const enableDrawingMode = () => {
    setDrawingEnabled(true);
  };

  const disableDrawingMode = () => {
    setDrawingEnabled(false);
    if (drawingManagerRef.current && drawingManagerRef.current.state.drawingControlPosition) {
      drawingManagerRef.current.state.setDrawingMode(null);
    }
  };

  const savePartitionPoints = async () => {
    try {
      await AxiosInstance.put(`/api/auth/mapTemplate/savePartitionPoints/${templateId}`, {
        partitionPoints,
      });
      alert("Partition points saved successfully!");
    } catch (error) {
      console.error("Error saving partition points:", error);
      alert("Failed to save partition points.");
    }
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`);
        const fetchedPoints = response.data.locationPoints;
        const fetchedPartitionPoints = response.data.partitionPoints || [];
        setPoints(fetchedPoints);
        setPartitionPoints(fetchedPartitionPoints);

        const avgLatitude = fetchedPoints.reduce((total, point) => total + point.latitude, 0) / fetchedPoints.length;
        const avgLongitude = fetchedPoints.reduce((total, point) => total + point.longitude, 0) / fetchedPoints.length;

        setCenter({ lat: avgLatitude, lng: avgLongitude });
      } catch (error) {
        console.error("An error occurred while fetching the template:", error);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>

      <LoadScript googleMapsApiKey={apiKey} libraries={["places", "drawing", "geometry"]}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {points.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.latitude, lng: point.longitude }}
              zIndex={10}
            />
          ))}

          {points.length > 1 && (
            <Polygon
              path={points.map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(199, 192, 192, 0.5)",
                fillOpacity: 0.4,
                zIndex: 1
              }}
            />
          )}

          {partitionPoints.length > 1 && (
            <Polygon
              path={partitionPoints.map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(0, 0, 255, 0.2)",
                fillOpacity: 0.4,
                zIndex: 2
              }}
            />
          )}

          {drawingEnabled && (
            <DrawingManager
              ref={drawingManagerRef}
              onPolygonComplete={handleGeofenceComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                },
                polygonOptions: {
                  fillColor: "#0000FF",
                  fillOpacity: 0.4,
                  strokeColor: "#0000FF",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  editable: true,
                  clickable: true,
                  zIndex: 2,
                },
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
              }}
            />
          )}

          {!drawingEnabled && (
            <button
              onClick={enableDrawingMode}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 1,
              }}
            >
              Enable Drawing Mode
            </button>
          )}

          {drawingEnabled && (
            <button
              onClick={disableDrawingMode}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 1,
              }}
            >
              Disable Drawing Mode
            </button>
          )}

          <button
            onClick={savePartitionPoints}
            style={{
              position: "absolute",
              top: "50px",
              left: "10px",
              zIndex: 1,
            }}
          >
            Save Partition Points
          </button>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;