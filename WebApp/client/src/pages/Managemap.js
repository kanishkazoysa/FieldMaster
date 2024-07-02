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

  const apiKey = "AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U"; // Replace with your Google Maps API key
  const [points, setPoints] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const drawingManagerRef = useRef(null); // Ref to DrawingManager instance
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const handleGeofenceComplete = (polygon) => {
    polygon.setEditable(true); // Make the drawn polygon editable
    const newPoints = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

    setPoints((prevPoints) => [...prevPoints, ...newPoints]);
    setDrawingEnabled(false); // Disable drawing mode after completing polygon
  };

  const enableDrawingMode = () => {
    setDrawingEnabled(true);
  };

  const disableDrawingMode = () => {
    setDrawingEnabled(false);
    // Manually remove any drawing mode by clearing the drawing manager's drawing mode
    if (
      drawingManagerRef.current &&
      drawingManagerRef.current.state.drawingControlPosition
    ) {
      drawingManagerRef.current.state.setDrawingMode(null);
    }
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      console.log("Template ID:", templateId);

      // Fetch template data using the templateId
      try {
        const response = await AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`);
        const points = response.data.locationPoints;
        setPoints(points);
        console.log(points);

        // Calculate the average latitude and longitude
        const avgLatitude =
          points.reduce((total, point) => total + point.latitude, 0) / points.length;
        const avgLongitude =
          points.reduce((total, point) => total + point.longitude, 0) / points.length;

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

      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={["places", "drawing", "geometry"]}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          {points.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.latitude, lng: point.longitude }}
              zIndex={10} // Ensure markers are on top
            />
          ))}

          {/* Polygon to connect the points */}
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

          {/* DrawingManager only when drawingEnabled is true */}
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
                  fillColor: "#FF0000",
                  fillOpacity: 0.4,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  editable: true, // Make the drawn polygon editable
                  clickable: true,
                  zIndex: 1,
                },
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
              }}
            />
          )}

          {/* Button to enable drawing mode */}
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

          {/* Button to disable drawing mode */}
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
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;
