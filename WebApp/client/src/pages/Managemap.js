import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
  OverlayView,
} from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";
import { styles, containerStyle } from "./ManagemapStyles";
import AxiosInstance from "../AxiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin, FiGrid, FiEdit, FiX, FiSave, FiTag } from "react-icons/fi";
import { PiPlantLight } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { message, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TbTopologyComplex } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import PlantationSetupModal from "./PlantationSetupModal";
import { TbFence } from "react-icons/tb";
import FenceSetupModal from "./FenceSetupModal";

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
  const [labelText, setLabelText] = useState("");
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [currentLabel, setCurrentLabel] = useState("");
  const [PlantationSetupModalVisible, setPlantationSetupModalVisible] =
    useState(false);
  const navigate = useNavigate();
  const [selectedPolygonData, setSelectedPolygonData] = useState(null);
  const [fenceSetupData, setFenceSetupData] = useState({});
  const [plantationSetupData, setPlantationSetupData] = useState({});
  const [isEditingPlantation, setIsEditingPlantation] = useState(false);
  const [fenceSetupModalVisible, setFenceSetupModalVisible] = useState(false);

  const handleFenceSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
      setFenceSetupModalVisible(true);
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleFenceSetupSave = (data) => {
    setFenceSetupData((prevData) => ({
      ...prevData,
      [selectedPolygonIndex]: data,
    }));

    // Update the partitionPolygons state
    setPartitionPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons];
      updatedPolygons[selectedPolygonIndex] = {
        ...updatedPolygons[selectedPolygonIndex],
        fenceSetup: data,
      };
      return updatedPolygons;
    });

    // Save the updated data to the backend
    savePartitionPoints();

    message.success("Fence setup data saved successfully!");
    setFenceSetupModalVisible(false);
  };

  const handleEditPlantation = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setIsEditingPlantation(true);
      setPlantationSetupModalVisible(true);
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
    }
  };

  const handlePlantationSetupSave = (data) => {
    setPlantationSetupData((prevData) => ({
      ...prevData,
      [selectedPolygonIndex]: data,
    }));

    // Update the partitionPolygons state
    setPartitionPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons];
      updatedPolygons[selectedPolygonIndex] = {
        ...updatedPolygons[selectedPolygonIndex],
        plantationSetup: data,
      };
      return updatedPolygons;
    });

    // Save the updated data to the backend
    savePartitionPoints();

    message.success("Plantation setup data saved successfully!");
    setPlantationSetupModalVisible(false);
  };

  const handlePlantationSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setPlantationSetupModalVisible(true);
      // Pass only the area and perimeter to the modal
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleAddLabel = () => {
    if (selectedPolygonIndex !== null) {
      const currentPolygon = partitionPolygons[selectedPolygonIndex];
      if (currentPolygon.label) {
        setLabelText(currentPolygon.label);
      } else {
        setLabelText("");
      }
      setShowLabelInput(true);
    }
  };

  const handleLabelSubmit = () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = [...partitionPolygons];
      updatedPolygons[selectedPolygonIndex].label = labelText;
      setPartitionPolygons(updatedPolygons);
      setShowLabelInput(false);
      setLabelText("");
    }
  };

  const calculatePolygonCenter = (points) => {
    let lat = 0,
      lng = 0;
    for (let point of points) {
      lat += point.latitude;
      lng += point.longitude;
    }
    return {
      lat: lat / points.length,
      lng: lng / points.length,
    };
  };

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
      perimeter: stats.perimeter,
    };

    setPartitionPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setDrawingEnabled(false);

    // Show popup with area and perimeter
    Modal.info({
      title: "Polygon Statistics",
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
      perimeter: perimeter.toFixed(2),
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
      const updatedPartitionPolygons = partitionPolygons.map(
        (polygon, index) => ({
          ...polygon,
          plantationSetup: plantationSetupData[index] || {},
        })
      );

      const response = await AxiosInstance.put(
        `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
        {
          partitionPolygons: updatedPartitionPolygons,
        }
      );
      console.log("Save response:", response.data);
      message.success("Partition polygons saved successfully!");
    } catch (error) {
      console.error("Error saving partition polygons:", error);
      message.error("Failed to save partition polygons.");
    }
  };

  const save = async () => {
    try {
      confirm({
        title: "Are you sure?",
        content: "Do you want to Save the partition?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
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
          console.log("Cancelled");
        },
      });
    } catch (error) {
      console.error("Error showing confirmation dialog:", error);
    }
  };

  const handlePolygonClick = (index) => {
    setSelectedPolygonIndex(index);
    setEditingPolygonIndex(null);
    setShowLabelInput(false);

    const selectedPolygon = partitionPolygons[index];
    const PlantationData = plantationSetupData[index];
    const fenceData = fenceSetupData[index];

    let modalContent = (
      <div>
        <p>Area: {selectedPolygon.area} sq meters</p>
        <p>Perimeter: {selectedPolygon.perimeter} meters</p>
        <p>Label: {selectedPolygon.label || "No label"}</p>
      </div>
    );

    if (PlantationData) {
      modalContent = (
        <div>
          {modalContent}
          <h4>Plantation Data:</h4>
          <p>Plant Type: {PlantationData.plantType || "N/A"}</p>
          <p>
            Plant Spacing:{" "}
            {PlantationData.plantSpacing
              ? PlantationData.plantSpacing.toFixed(2)
              : "N/A"}{" "}
            meters
          </p>
          <p>
            Row Spacing:{" "}
            {PlantationData.rowSpacing
              ? PlantationData.rowSpacing.toFixed(2)
              : "N/A"}{" "}
            meters
          </p>
          <p>Number of Plants: {PlantationData.numberOfPlants || "N/A"}</p>
          <p>
            Plantation Density:{" "}
            {PlantationData.plantationDensity
              ? PlantationData.plantationDensity.toFixed(2)
              : "N/A"}{" "}
            plants/sq m
          </p>
          {PlantationData.fertilizerData && (
            <>
              <h4>Fertilizer Data:</h4>
              <p>
                Fertilizer Type:{" "}
                {PlantationData.fertilizerData.fertilizerType || "N/A"}
              </p>
              <p>
                Frequency:{" "}
                {PlantationData.fertilizerData.fertilizerFrequency || "N/A"}
              </p>
              <p>
                Times: {PlantationData.fertilizerData.fertilizerTimes || "N/A"}
              </p>
              <p>
                Amount:{" "}
                {PlantationData.fertilizerData.fertilizerAmount || "N/A"}{" "}
                {PlantationData.fertilizerData.fertilizerUnit || ""}
              </p>
              <p>
                Total Fertilizer per Year:{" "}
                {PlantationData.fertilizerData.totalFertilizerPerYear
                  ? PlantationData.fertilizerData.totalFertilizerPerYear.toFixed(
                      2
                    )
                  : "N/A"}{" "}
                kg
              </p>
              <p>
                Fertilizer per Plant:{" "}
                {PlantationData.fertilizerData.fertilizerPerPlant
                  ? PlantationData.fertilizerData.fertilizerPerPlant.toFixed(2)
                  : "N/A"}{" "}
                kg
              </p>
            </>
          )}
        </div>
      );
    }

    if (fenceData) {
      modalContent = (
        <div>
          {modalContent}
          <h4>Fence Data:</h4>
          <p>Fence Type: {fenceData.fenceType}</p>
          <p>
            Post Spacing: {fenceData.postSpacing} {fenceData.postSpacingUnit}
          </p>
          <p>Number of Sticks: {fenceData.numberOfSticks}</p>
          <h5>Gates:</h5>
          {fenceData.gates.map((gate, idx) => (
            <p key={idx}>
              Gate {idx + 1}: {gate.length}m x {gate.count}
            </p>
          ))}
        </div>
      );
    }

    Modal.info({
      title: "Partition Statistics",
      content: modalContent,
      width: 500,
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
        title: "Are you sure?",
        content: "Do you want to Delete partition?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
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
          console.log("Cancelled");
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
          perimeter: stats.perimeter,
          label: partitionPolygons[index].label, // Preserve the label
        };

        setUndoStack((prevStack) => [...prevStack, updatedPolygon]);

        setPartitionPolygons((prevPolygons) => {
          const updatedPolygons = [...prevPolygons];
          updatedPolygons[index] = updatedPolygon;
          return updatedPolygons;
        });

        // Update the polygon on the map
        polygon.setPath(
          newPoints.map(
            (point) =>
              new window.google.maps.LatLng(point.latitude, point.longitude)
          )
        );
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
    savePartitionPoints();
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

        // Set plantation setup data
        const fetchedPlantationSetupData = {};
        fetchedPartitionPolygons.forEach((polygon, index) => {
          if (polygon.plantationSetup) {
            fetchedPlantationSetupData[index] = polygon.plantationSetup;
          }
        });
        setPlantationSetupData(fetchedPlantationSetupData);

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

  const handleCancel = () => {
    navigate("/home");
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
            <React.Fragment key={index}>
              <Polygon
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
              {polygon.label && (
                <OverlayView
                  position={calculatePolygonCenter(polygon.points)}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.9)", // Slight transparency for a modern look
                      padding: "10px 15px", // More padding for better spacing
                      border: "1px solid #ddd", // Light gray border for a softer appearance
                      borderRadius: "8px", // Slightly more rounded corners
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {polygon.label}
                  </div>
                </OverlayView>
              )}
            </React.Fragment>
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
              icon={<FiGrid />}
              style={styles.toolButton}
            >
              {drawingEnabled ? "Draw Polygon" : "Draw Polygon"}
            </Button>
            <Button
              onClick={savePartitionPoints}
              icon={<FiSave />}
              style={styles.toolButton}
            >
              Save Partition
            </Button>
            {selectedPolygonIndex !== null && (
              <>
                <Button
                  onClick={deleteSelectedPolygon}
                  icon={<MdDeleteForever />}
                  style={styles.toolButton}
                >
                  Delete Partition
                </Button>
                <Button
                  onClick={editSelectedPolygon}
                  icon={<FiEdit />}
                  style={styles.toolButton}
                >
                  Edit Partition
                </Button>
                {partitionPolygons[selectedPolygonIndex].label ? (
                  <Button
                    onClick={handleAddLabel}
                    icon={<FiTag />}
                    style={styles.toolButton}
                  >
                    Edit Label
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddLabel}
                    icon={<FiTag />}
                    style={styles.toolButton}
                  >
                    Add Label
                  </Button>
                )}
                {plantationSetupData[selectedPolygonIndex] ? (
                  <Button
                    onClick={handleEditPlantation}
                    icon={<PiPlantLight />}
                    style={styles.toolButton}
                  >
                    Edit Plantation
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlantationSetup}
                    icon={<PiPlantLight />}
                    style={styles.toolButton}
                  >
                    Plantation
                  </Button>
                )}
              </>
            )}
            {fenceSetupData[selectedPolygonIndex] ? (
              <Button
                onClick={handleFenceSetup}
                icon={<TbFence />}
                style={styles.toolButton}
              >
                Edit Fence
              </Button>
            ) : (
              <Button
                onClick={handleFenceSetup}
                icon={<TbFence />}
                style={styles.toolButton}
              >
                Fence Setup
              </Button>
            )}

            {showLabelInput && (
              <div>
                <Input
                  value={labelText}
                  onChange={(e) => setLabelText(e.target.value)}
                  placeholder="Enter label"
                  style={{
                    ...styles.toolButton,
                    borderColor: "#4CAF50",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                <Button
                  onClick={handleLabelSubmit}
                  style={{
                    ...styles.toolButton,
                    backgroundColor: "#4CAF50",
                    borderColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  {partitionPolygons[selectedPolygonIndex].label
                    ? "Update Label"
                    : "Submit Label"}
                </Button>
              </div>
            )}

            {editingPolygonIndex !== null && (
              <>
                <Button
                  onClick={undoEdit}
                  disabled={undoStack.length <= 1}
                  icon={<GrUndo />}
                  style={styles.toolButton}
                >
                  Undo
                </Button>
                <Button
                  onClick={finishEditing}
                  icon={<GrCompliance />}
                  style={styles.toolButton}
                >
                  Finish Editing
                </Button>
              </>
            )}
            <div style={styles.buttonContainer}>
              <Button style={styles.saveButton} onClick={save}>
                Save
              </Button>
              <Button style={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>

          <PlantationSetupModal
            visible={PlantationSetupModalVisible}
            onClose={() => {
              setPlantationSetupModalVisible(false);
              setIsEditingPlantation(false);
            }}
            area={selectedPolygonData?.area}
            perimeter={selectedPolygonData?.perimeter}
            onSave={handlePlantationSetupSave}
            existingData={
              isEditingPlantation
                ? plantationSetupData[selectedPolygonIndex]
                : null
            }
          />

          <FenceSetupModal
            visible={fenceSetupModalVisible}
            onClose={() => setFenceSetupModalVisible(false)}
            area={selectedPolygonData?.area}
            perimeter={selectedPolygonData?.perimeter}
            onSave={handleFenceSetupSave}
            existingData={fenceSetupData[selectedPolygonIndex]}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;
