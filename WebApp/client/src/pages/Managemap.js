import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
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
  const [partitionPolygons, setPartitionPolygons] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [editingPolygonIndex, setEditingPolygonIndex] = useState(null);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const drawingManagerRef = useRef(null);
  const polygonRefs = useRef([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mapTypeId, setMapTypeId] = useState('roadmap');

  const handleGeofenceComplete = (polygon) => {
    const newPoints = polygon.getPath().getArray().map((latLng) => ({
      latitude: latLng.lat(),
      longitude: latLng.lng(),
    }));

    setPartitionPolygons((prevPolygons) => [...prevPolygons, newPoints]);
    setDrawingEnabled(false);
  };

  const toggleDrawingMode = () => {
    setDrawingEnabled((prevState) => !prevState);
    setEditingPolygonIndex(null);
    setSelectedPolygonIndex(null);
    if (!drawingEnabled) {
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
      }
    } else {
      if (drawingManagerRef.current && drawingManagerRef.current.state.drawingControlPosition) {
        drawingManagerRef.current.state.setDrawingMode(null);
      }
    }
  };

  const savePartitionPoints = async () => {
    try {
      const response = await AxiosInstance.put(`/api/auth/mapTemplate/savePartitionPoints/${templateId}`, {
        partitionPolygons,
      });
      console.log('Save response:', response.data);
      alert("Partition polygons saved successfully!");
    } catch (error) {
      console.error("Error saving partition polygons:", error);
      alert("Failed to save partition polygons.");
    }
  };

  const handlePolygonClick = (index) => {
    setSelectedPolygonIndex(index);
    setEditingPolygonIndex(null);
  };

  const deleteSelectedPolygon = async () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = partitionPolygons.filter((_, index) => index !== selectedPolygonIndex);
      setPartitionPolygons(updatedPolygons);
      setSelectedPolygonIndex(null);
      
      try {
        await AxiosInstance.put(`/api/auth/mapTemplate/savePartitionPoints/${templateId}`, {
          partitionPolygons: updatedPolygons,
        });
        alert("Partition polygon deleted successfully!");
      } catch (error) {
        console.error("Error deleting partition polygon:", error);
        alert("Failed to delete partition polygon.");
      }
    }
  };

  const editSelectedPolygon = () => {
    if (selectedPolygonIndex !== null) {
      setEditingPolygonIndex(selectedPolygonIndex);
      setUndoStack([partitionPolygons[selectedPolygonIndex]]); // Initialize undo stack with original polygon
      setSelectedPolygonIndex(null);
    }
  };

  const handlePolygonEdit = (index) => {
    if (editingPolygonIndex === index) {
      const polygon = polygonRefs.current[index];
      if (polygon) {
        const newPoints = polygon.getPath().getArray().map((latLng) => ({
          latitude: latLng.lat(),
          longitude: latLng.lng(),
        }));
        
        setUndoStack(prevStack => [...prevStack, newPoints]);
        
        const updatedPolygons = [...partitionPolygons];
        updatedPolygons[index] = newPoints;
        setPartitionPolygons(updatedPolygons);
      }
    }
  };

  const undoEdit = () => {
    if (undoStack.length > 1) {
      const previousState = undoStack[undoStack.length - 2]; // Get the previous state
      const updatedPolygons = [...partitionPolygons];
      updatedPolygons[editingPolygonIndex] = previousState;
      setPartitionPolygons(updatedPolygons);
      setUndoStack(prevStack => prevStack.slice(0, -1)); // Remove the last state
    }
  };

  const finishEditing = () => {
    setEditingPolygonIndex(null);
    setUndoStack([]);
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`);
        console.log('Fetched template data:', response.data);
        const fetchedPoints = response.data.locationPoints;
        const fetchedPartitionPolygons = response.data.partitionPolygons || [];
        setPoints(fetchedPoints);
        setPartitionPolygons(fetchedPartitionPolygons);

        const avgLatitude = fetchedPoints.reduce((total, point) => total + point.latitude, 0) / fetchedPoints.length;
        const avgLongitude = fetchedPoints.reduce((total, point) => total + point.longitude, 0) / fetchedPoints.length;

        setCenter({ lat: avgLatitude, lng: avgLongitude });
      } catch (error) {
        console.error("An error occurred while fetching the template:", error);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  const toggleMapType = () => {
    setMapTypeId(prevType => prevType === 'roadmap' ? 'satellite' : 'roadmap');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>

      <LoadScript googleMapsApiKey={apiKey} libraries={["places", "drawing", "geometry"]}>
        <GoogleMap 
          mapContainerStyle={containerStyle} 
          center={center} 
          zoom={17}
          mapTypeId={mapTypeId}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy'
          }}
        >
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

          {partitionPolygons.map((polygonPoints, index) => (
            <Polygon
              key={index}
              path={polygonPoints.map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(0, 0, 255, 0.2)",
                fillOpacity: 0.4,
                zIndex: 2,
                editable: editingPolygonIndex === index,
                clickable: true
              }}
              onClick={() => handlePolygonClick(index)}
              onMouseUp={() => handlePolygonEdit(index)}
              onLoad={(polygon) => {
                polygonRefs.current[index] = polygon;
              }}
            />
          ))}

          {drawingEnabled && (
            <DrawingManager
              ref={drawingManagerRef}
              onPolygonComplete={handleGeofenceComplete}
              options={{
                drawingControl: false,
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

          <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
            <button onClick={toggleDrawingMode}>
              {drawingEnabled ? "Disable Drawing Mode" : "Enable Drawing Mode"}
            </button>
            <button onClick={savePartitionPoints}>Save Partition Polygons</button>
            <button onClick={toggleMapType}>Toggle Map Type</button>
            {selectedPolygonIndex !== null && (
              <>
                <button onClick={deleteSelectedPolygon}>Delete Selected Partition</button>
                <button onClick={editSelectedPolygon}>Edit Selected Partition</button>
              </>
            )}
            {editingPolygonIndex !== null && (
              <>
                <button onClick={undoEdit} disabled={undoStack.length <= 1}>Undo</button>
                <button onClick={finishEditing}>Finish Editing</button>
              </>
            )}
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;