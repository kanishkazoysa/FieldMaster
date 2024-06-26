import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, PolygonF, MarkerF } from '@react-google-maps/api';
import SideNavbar from '../components/SideNavbar/sideNavbar';
import axios from 'axios';

const ResizeMapScreen = () => {
  const [zoomMap, setZoomMap] = useState(20);
  // const [center, setCenter] = useState({ lat: 6.627, lng: 79.976 });
  const [appArray, setAppArray] = useState([]);
  const [newPoint, setNewPoint] = useState(null);
  const [initialPointsLength, setInitialPointsLength] = useState(0);

  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    // streetViewControl: false,
    rotateControl: true,
    fullscreenControl: true,
    scrollwheel: false,
    mapTypeId: "satellite",
  };

  const addPoint = (event) => {
    const latLng = event.latLng.toJSON();
    const nearestPoints = findNearestPoints(latLng);
  
    // Insert the new point between the nearest points
    const newPath = [...appArray[0].path];
    const insertIndex = newPath.indexOf(nearestPoints[1]);
    newPath.splice(insertIndex, 0, latLng);
  
    setAppArray([...appArray, { path: newPath, color: '#FF0000' }]);
  };
  
  // Function to find the two nearest points to the given point
  const findNearestPoints = (newPoint) => {
    const path = appArray[0].path;
    let nearestPoints = [path[0], path[1]];
    let minDistance = distance(newPoint, path[0]) + distance(newPoint, path[1]);
  
    for (let i = 1; i < path.length; i++) {
      for (let j = i + 1; j < path.length; j++) {
        const dist = distance(newPoint, path[i]) + distance(newPoint, path[j]);
        if (dist < minDistance) {
          minDistance = dist;
          nearestPoints = [path[i], path[j]];
        }
      }
    }
  
    return nearestPoints;
  };
  
  // Function to calculate the distance between two points
  const distance = (p1, p2) => {
    const dx = p1.lat - p2.lat;
    const dy = p1.lng - p2.lng;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const deleteLastPoint = () => {
    if (appArray.length > 0) {
      setAppArray(appArray.slice(0, -1));
    }
  };


  const saveMapPoints = () => {
    // Save appArray to your database or perform other actions
    console.log("Saved points:", appArray);
  };

  const coordinatesOfEachPolygon = [
    { lat: 6.6277535719406275, lng: 79.97647494077682 },
    { lat: 6.627819179923454, lng: 79.97656848281622 },
    { lat: 6.627985031536539, lng: 79.97644476592542 },
    { lat: 6.627936075343296, lng: 79.97633747756481 },
    { lat: 6.6278381629422425, lng: 79.9764109030366 },
  ];

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    appArray.forEach((data) => {
      data.path.forEach((coord) => {
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
      });
    });
    if (newPoint) {
      bounds.extend(new window.google.maps.LatLng(newPoint.lat, newPoint.lng));
    }
    map.fitBounds(bounds);
  };

  useEffect(() => {
    // Example: load appArray data
    setAppArray([{ path: coordinatesOfEachPolygon, color: '#FF0000' }]);
  }, []);

  useEffect(() => {
    if (newPoint) {
      setAppArray([...appArray, { path: [newPoint], color: '#00FF00' }]);
    }
  }, [newPoint]);

  return (
    <div style={styles.container}>
      <SideNavbar />
      <div style={styles.mapContainer}>
        <LoadScript googleMapsApiKey="AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U" libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            // center={center}
            // zoom={zoomMap} 
            options={MapOptions}
            onLoad={onLoad}
            onClick={addPoint}
          >
            {appArray && appArray.map((data, i) => (
              <React.Fragment key={i}>
              <PolygonF
                options={{
                  fillColor: data.color,
                  fillOpacity: 0.6,
                  strokeColor: "black",
                  strokeOpacity: 0.4,
                  strokeWeight: 0.5,
                  clickable: true,
                  draggable: true,
                  editable: true,
                  geodesic: false,
                  zIndex: 1,
                }}
                paths={data.path}
              />
              {data.path.map((coord, index) => (
                <MarkerF 
                  key={index} 
                  position={coord} 
                />
              ))}
            </React.Fragment>
          ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={styles.controls}>
        <button style={styles.controlBtn} onClick={deleteLastPoint}>Delete</button>
        <button style={styles.controlBtn} onClick={saveMapPoints}>Save</button>
      </div>
    </div>
  );
};

export default ResizeMapScreen;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  mapContainer: {
    flex: "1",
    position: "relative",
  },
  controls: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    display: "flex",
    gap: "10px",
  },
  controlBtn: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "40px",
  },
  controlBtnCancel: {
    backgroundColor: "#DC3545",
  },
  mapControls: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zindex: "5",
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
  }
};
