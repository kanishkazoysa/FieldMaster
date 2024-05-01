import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";
import { FiMapPin, FiGrid, FiEdit, FiX } from "react-icons/fi";
import SideNavbar from "../components/SideNavbar/sideNavbar";

const Managemap = () => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [labels, setLabels] = useState([]);
  const [toolButtonHovered, setToolButtonHovered] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [textboxPosition, setTextboxPosition] = useState({ lat: 0, lng: 0 });
  const [textboxDraggable, setTextboxDraggable] = useState(false);
  const [showLabelPopup, setShowLabelPopup] = useState(false);
  const [labelInput, setLabelInput] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handlePlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;
    const location = places[0].geometry.location.toJSON();
    setSelectedLocation(location);
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    mapRef.current.state.map.fitBounds(bounds);
    mapRef.current.state.map.setZoom(15);
  }, []);

  const handleMarkerClick = () => {
    setSelectedLocation(null);
  };

  const handleToolButtonHover = (index) => {
    setToolButtonHovered(index);
  };

  const handleAddLabel = () => {
    setShowLabelPopup(true);
  };

  const handleLabelInputChange = (e) => {
    setLabelInput(e.target.value);
  };

  const handleLabelSubmit = () => {
    if (labelInput.trim() !== "") {
      setLabels([...labels, selectedLocation]);
      setLabelInput("");
      setShowLabelPopup(false);
    }
  };

  const handlePopupDragStart = (e) => {
    const startX = e.clientX - popupPosition.x;
    const startY = e.clientY - popupPosition.y;
    const handlePopupDrag = (e) => {
      const newPosX = e.clientX - startX;
      const newPosY = e.clientY - startY;
      setPopupPosition({ x: newPosX, y: newPosY });
    };
    const handlePopupDragEnd = () => {
      window.removeEventListener("mousemove", handlePopupDrag);
      window.removeEventListener("mouseup", handlePopupDragEnd);
    };
    window.addEventListener("mousemove", handlePopupDrag);
    window.addEventListener("mouseup", handlePopupDragEnd);
  };

  const handleClosePopup = () => {
    setShowLabelPopup(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ height: "100vh" }}>
        <SideNavbar />
      </div>
      <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={["places"]}>
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          center={{ lat: 6.2667, lng: 80.0333 }}
          zoom={2}
          options={{
            minZoom: 2,
            maxZoom: 40,
            restriction: {
              latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
              strictBounds: true,
            },
          }}
        >
          {labels.map((label, index) => (
            <Marker key={index} position={label} />
          ))}
          {selectedLocation && (
            <Marker position={selectedLocation} onClick={handleMarkerClick} />
          )}
          <MdLocationOn fontSize={27} style={{ marginLeft: "10px", marginTop: "10px" }} color="#fff" />

          <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={handlePlacesChanged}>
            <input
              type="text"
              placeholder="Search location"
              style={{ ...styles.searchBox, position: "absolute", right: "15%", top: "2%" }}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            />
          </StandaloneSearchBox>

          <div style={{ ...styles.toolbox, top: "140px", right: "0" }}>
            <p style={styles.toolTitle}>Tools</p>
            <hr style={styles.toolHr}></hr>
            {[
              { icon: <FiMapPin />, text: "Select Pointer" },
              { icon: <FiGrid />, text: "Land Partition" },
              { icon: <FiEdit />, text: "Land Label" },
            ].map((item, index) => (
              <button
                key={index}
                style={{
                  ...styles.toolButton,
                  ...(toolButtonHovered === index && styles.toolButtonHover),
                }}
                onMouseEnter={() => handleToolButtonHover(index)}
                onMouseLeave={() => handleToolButtonHover(null)}
                onClick={index === 2 ? handleAddLabel : null}
              >
                {item.icon} {item.text}
              </button>
            ))}
            <div style={styles.buttonContainer}>
              <button style={styles.saveButton}>Save</button>
              <button style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </GoogleMap>
      </LoadScript>
      {showLabelPopup && (
        <div
          style={{ ...styles.labelPopup, top: popupPosition.y, left: popupPosition.x }}
          onMouseDown={handlePopupDragStart}
        >
          <button style={styles.closeButton} onClick={handleClosePopup}>
            <FiX />
          </button>
          <input
            type="text"
            placeholder="Enter label"
            value={labelInput}
            onChange={handleLabelInputChange}
            style={styles.labelInput}
          />
          <button onClick={handleLabelSubmit} style={styles.labelButton}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  searchBox: {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "280px",
    height: "35px",
    padding: "0 12px",
    borderRadius: "11px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipsis",
  },
  toolbox: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "5px",
    height: "80vh",
  },
  toolTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "-5px",
    color: "#000",
  },
  toolHr: {
    width: "120%",
    marginLeft: "-15px",
  },
  toolButton: {
    display: "flex",
    alignItems: "center",
    margin: "5px",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "11px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    gap: "5px",
  },
  toolButtonHover: {
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
  },
  saveButton: {
    padding: "5px 10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  cancelButton: {
    marginTop: "6px",
    padding: "5px 10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#f44336",
    color: "#fff",
    cursor: "pointer",
  },
  labelPopup: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    zIndex: 2000,
    userSelect: "none",
    cursor: "move",
  },
  labelInput: {
    width: "100%",
    marginBottom: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  labelButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  closeButton: {
    position: "absolute",
    top: "-5px",
    right: "-2px",
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  },
};

export default Managemap;
