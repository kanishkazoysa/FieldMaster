import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";
import { styles, containerStyle } from "./ManagemapStyles";
import AxiosInstance from "../AxiosInstance";
import { useParams } from "react-router-dom";
import { FiMapPin, FiGrid, FiEdit, FiX,FiSave } from "react-icons/fi";
import { message, Button,Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


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
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const [toolButtonHovered, setToolButtonHovered] = useState(null);

  const handleGeofenceComplete = (polygon) => {
    polygon.setEditable(true);
    const newPoints = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({
        latitude: latLng.lat(),
        longitude: latLng.lng(),
      }));
  
    // Calculate area and perimeter
    const stats = calculatePolygonStats(polygon);
  
    const newPolygon = {
      points: newPoints,
      area: stats.area,
      perimeter: stats.perimeter
    };
  
    setPartitionPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setDrawingEnabled(false);
  
    // Show popup with area and perimeter
    Modal.info({
      title: 'Polygon Statistics',
      content: (
        <div>
          <p>Area: {stats.area} sq meters</p>
          <p>Perimeter: {stats.perimeter} meters</p>
        </div>
      ),
      onOk() {},
    });
  };


  const calculatePolygonStats = (polygon) => {
    const path = polygon.getPath();
    const area = window.google.maps.geometry.spherical.computeArea(path);
    const perimeter = window.google.maps.geometry.spherical.computeLength(path);
    return {
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2)
    };
  };

  const handleToolButtonHover = (index) => {
    setToolButtonHovered(index);
  };

  const toggleDrawingMode = () => {
    setDrawingEnabled((prevState) => !prevState);
    setEditingPolygonIndex(null);
    setSelectedPolygonIndex(null);
    if (!drawingEnabled) {
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setDrawingMode(
          window.google.maps.drawing.OverlayType.POLYGON
        );
      }
    } else {
      if (
        drawingManagerRef.current &&
        drawingManagerRef.current.state.drawingControlPosition
      ) {
        drawingManagerRef.current.state.setDrawingMode(null);
      }
    }
  };

  const savePartitionPoints = async () => {
  try {
    confirm({
      title: 'Are you sure?',
      content: 'Do you want to Save the partition?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      async onOk() {
        try {
          const response = await AxiosInstance.put(
            `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
            {
              partitionPolygons,
            }
          );
          console.log("Save response:", response.data);
          message.success("Partition polygons saved successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error saving partition polygons:", error);
          message.error("Failed to save partition polygons.");
        }
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  } catch (error) {
    console.error("Error showing confirmation dialog:", error);
  }
};
  

const handlePolygonClick = (index) => {
  setSelectedPolygonIndex(index);
  setEditingPolygonIndex(null);

  const selectedPolygon = partitionPolygons[index];
  Modal.info({
    title: 'Selected Partition Statistics',
    content: (
      <div>
        <p>Area: {selectedPolygon.area} sq meters</p>
        <p>Perimeter: {selectedPolygon.perimeter} meters</p>
      </div>
    ),
    onOk() {},
  });
};

  const deleteSelectedPolygon = async () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = partitionPolygons.filter(
        (_, index) => index !== selectedPolygonIndex
      );
  
      // Confirm before deleting
      confirm({
        title: 'Are you sure?',
        content: 'Do you want to update Fence?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'primary',
        cancelText: 'No',
        async onOk() {
          try {
            await AxiosInstance.put(
              `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
              {
                partitionPolygons: updatedPolygons,
              }
            );
            setPartitionPolygons(updatedPolygons); // Update state after successful save
            setSelectedPolygonIndex(null);
            message.success("Partition polygon deleted successfully!"); // Use message.success for success
            window.location.reload(); // Refresh the page
          } catch (error) {
            console.error("Error deleting partition polygon:", error);
            message.error("Failed to delete partition polygon."); // Use message.error for error
          }
        },
        onCancel() {
          console.log('Cancelled');
        },
      });
    } else {
      message.warning("No polygon selected for deletion."); // Inform user if no polygon is selected
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
      const newPoints = polygon
        .getPath()
        .getArray()
        .map((latLng) => ({
          latitude: latLng.lat(),
          longitude: latLng.lng(),
        }));

      const stats = calculatePolygonStats(polygon);

      const updatedPolygon = {
        points: newPoints,
        area: stats.area,
        perimeter: stats.perimeter
      };

      setUndoStack((prevStack) => [...prevStack, updatedPolygon]);

      setPartitionPolygons((prevPolygons) => {
        const updatedPolygons = [...prevPolygons];
        updatedPolygons[index] = updatedPolygon;
        return updatedPolygons;
      });
    }
  }
};

  const undoEdit = () => {
    if (undoStack.length > 1 && editingPolygonIndex !== null) {
      const previousState = undoStack[undoStack.length - 2]; // Get the previous state
      const updatedPolygons = [...partitionPolygons];
      updatedPolygons[editingPolygonIndex] = previousState;
      setPartitionPolygons(updatedPolygons);
      setUndoStack((prevStack) => prevStack.slice(0, -1)); // Remove the last state
  
      // Update the polygon on the map
      const polygon = polygonRefs.current[editingPolygonIndex];
      if (polygon) {
        polygon.setPath(
          previousState.points.map(
            (point) =>
              new window.google.maps.LatLng(point.latitude, point.longitude)
          )
        );
      }
    }
  };

  const finishEditing = () => {
    setEditingPolygonIndex(null);
    setUndoStack([]);
    window.location.reload();
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/auth/mapTemplate/getOneTemplate/${templateId}`
        );
        console.log("Fetched template data:", response.data);
        const fetchedPoints = response.data.locationPoints;
        const fetchedPartitionPolygons = response.data.partitionPolygons || [];
        setPoints(fetchedPoints);
        setPartitionPolygons(fetchedPartitionPolygons);
  
        const avgLatitude =
          fetchedPoints.reduce((total, point) => total + point.latitude, 0) /
          fetchedPoints.length;
        const avgLongitude =
          fetchedPoints.reduce((total, point) => total + point.longitude, 0) /
          fetchedPoints.length;
  
        setCenter({ lat: avgLatitude, lng: avgLongitude });
      } catch (error) {
        console.error("An error occurred while fetching the template:", error);
      }
    };
  
    fetchTemplateData();
  }, [templateId]);

  const toggleMapType = () => {
    setMapTypeId((prevType) =>
      prevType === "roadmap" ? "satellite" : "roadmap"
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>

      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={["places", "drawing", "geometry"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={20}
          mapTypeId={mapTypeId}
          options={{
            //mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
          }}
        >
          {points.length > 1 && (
            <Polygon
              path={points.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
              }))}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(199, 192, 192, 0.5)",
                fillOpacity: 0.4,
                zIndex: 1,
              }}
            />
          )}

          {partitionPolygons.map((polygon, index) => (
            <Polygon
              key={index}
              path={polygon.points.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
              }))}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(0, 0, 255, 0.2)",
                fillOpacity: 0.4,
                zIndex: 2,
                editable: editingPolygonIndex === index,
                clickable: true,
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

{/* //toolbox */}


          <div style={{ ...styles.toolbox, top: "140px", right: "0" }}>
            <p style={styles.toolTitle}>Tools</p>
            <hr style={styles.toolHr}></hr>
            <Button
              onClick={toggleDrawingMode}
              icon={<FiMapPin />}
              style={styles.toolButton}
            >
              {drawingEnabled ? "Disable Drawing Mode" : "Enable Drawing Mode"}
            </Button>
            <Button 
               onClick={savePartitionPoints}
               icon={<FiSave />}
               style={styles.toolButton}>

              Save Partition
            </Button>
            {selectedPolygonIndex !== null && (
              <>
                <Button onClick={deleteSelectedPolygon}
                icon={<FiSave />}
                style={styles.toolButton}>
                  Delete Selected Partition
                </Button>
                <Button onClick={editSelectedPolygon}
                icon={<FiSave />}
                style={styles.toolButton}>
                  Edit Selected Partition
                </Button>
              </>
            )}
            {editingPolygonIndex !== null && (
              <>
                <Button onClick={undoEdit} disabled={undoStack.length <= 1}
                icon={<FiSave />}
                style={styles.toolButton}>
                  Undo
                </Button>
                <Button onClick={finishEditing}
                icon={<FiSave />}
                style={styles.toolButton}>Finish Editing</Button>
              </>
            )}
            <div style={styles.buttonContainer}>
              <Button style={styles.saveButton}>Save</Button>
              <Button style={styles.cancelButton}>Cancel</Button>
            </div>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;
