import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, PolygonF } from "@react-google-maps/api";
import { styles } from "./ResizeMapStyles";
import AxiosInstance from "../../AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const ResizeMapScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId, templateArea, templatePerimeter } = location.state;
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [appArray, setAppArray] = useState([]);
  const [area, setArea] = useState(parseFloat(templateArea) || 0);
  const [perimeter, setPerimeter] = useState(
    parseFloat(templatePerimeter) || 0
  );
  const [history, setHistory] = useState([]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    rotateControl: false,
    fullscreenControl: true,
    scrollwheel: true,
    mapTypeId: 'satellite',
    mapTypeControlOptions: {
      mapTypeIds: ['satellite', 'hybrid'],
      style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: window.google.maps.ControlPosition.TOP_LEFT,
    }
  };

  useEffect(() => {
    // Fetch template data using AxiosInstance
    AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`)
      .then((response) => {
        const { locationPoints } = response.data;
        console.log(response.data);

        // Calculate average latitude and longitude
        const totalPoints = locationPoints.length;
        const sumLat = locationPoints.reduce(
          (acc, point) => acc + parseFloat(point.latitude),
          0
        );
        const sumLng = locationPoints.reduce(
          (acc, point) => acc + parseFloat(point.longitude),
          0
        );
        const avgLat = sumLat / totalPoints;
        const avgLng = sumLng / totalPoints;

        setCenter({ lat: avgLat, lng: avgLng });

        const paths = locationPoints.map((point) => ({
          lat: point.latitude,
          lng: point.longitude,
        }));

        // setInitialArray(paths);
        setAppArray([{ path: paths, color: "#FF0000" }]);
        setHistory([{ path: paths, color: "#FF0000" }]); // Initialize history with the initial points
      })
      .catch((error) => {
        console.error("Error fetching template:", error);
      });
  }, [templateId]);

  const onLoad = useCallback(
    (map) => {
      if (appArray.length > 0 && appArray[0].path.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        appArray[0].path.forEach((coord) => {
          bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
        });
        map.fitBounds(bounds);

        // Optional: add a slight padding to the bounds
        const paddings = { top: 50, right: 50, bottom: 50, left: 50 };
        map.fitBounds(bounds, paddings);
      }
    },
    [appArray]
  );

  const saveMapPoints = async () => {
    try {
      const locationPoints = appArray[0].path.map((point) => ({
        latitude: point.lat,
        longitude: point.lng,
      }));

      const response = await AxiosInstance.put(
        `/api/auth/mapTemplate/updateTemplate/${templateId}`,
        {
          locationPoints,
          area,
          perimeter,
        }
      );

      if (response.status === 200) {
        console.log("Location updated successfully");
        // Navigate to the home page after successful save
        navigate("/Home");
      } else {
        console.log("Failed to update location");
      }
    } catch (error) {
      console.error("An error occurred while updating the location:", error);
    }
  };

  const handlePolygonEdit = (polygonPath) => {
    const newPath = polygonPath.getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));
    // Push the current state to history
    setHistory((prevHistory) => [
      ...prevHistory,
      { path: newPath, color: "#FF0000" },
    ]);

    setAppArray([{ path: newPath, color: "#FF0000" }]);

    // Calculate area and perimeter
    const area = window.google.maps.geometry.spherical.computeArea(polygonPath);
    const perimeter =
      window.google.maps.geometry.spherical.computeLength(polygonPath);

    // Convert area to perches
    const areaInPerches = (area * 0.0395369).toFixed(2);
    // Convert perimeter to kilometers
    const perimeterInKilometers = (perimeter * 0.001).toFixed(2);

    setArea(areaInPerches);
    setPerimeter(perimeterInKilometers);
  };
  const undoLastAction = () => {
    if (history.length > 1) {
      const previousState = history[history.length - 2];
      setAppArray([previousState]);
      setHistory(history.slice(0, history.length - 1));

      const polygonPath = new window.google.maps.MVCArray(
        previousState.path.map(
          (point) => new window.google.maps.LatLng(point.lat, point.lng)
        )
      );

      const area =
        window.google.maps.geometry.spherical.computeArea(polygonPath);
      const perimeter =
        window.google.maps.geometry.spherical.computeLength(polygonPath);

      const areaInPerches = (area * 0.0395369).toFixed(2);
      const perimeterInKilometers = (perimeter * 0.001).toFixed(2);

      setArea(areaInPerches);
      setPerimeter(perimeterInKilometers);
    }
  };
  const onPolygonLoad = (polygon) => {
    polygon.addListener("dragend", () => handlePolygonEdit(polygon.getPath()));
    polygon.addListener("mouseup", () => handlePolygonEdit(polygon.getPath()));
  };

  const handleCancel = () => {
    navigate("/Home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.mapContainer}>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={19}
            center={center}
            options={MapOptions}
            onLoad={onLoad}
          >
            {appArray &&
              appArray.map((data, i) => (
                <React.Fragment key={i}>
                  <PolygonF
                    options={{
                      fillColor: "#007BFF",
                      fillOpacity: 0.3,
                      strokeColor: "white",
                      strokeWeight: 2,
                      strokeOpacity: 0.7,
                      clickable: true,
                      draggable: false,
                      editable: true,
                      geodesic: false,
                      zIndex: 1,
                    }}
                    paths={data.path}
                    onLoad={onPolygonLoad}
                  />
                </React.Fragment>
              ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={styles.top}>
        <div style={styles.area}>Area: {area} perches </div>
        <div style={styles.perimeter}>Perimeter: {perimeter} kilometers</div>
      </div>
      <div style={styles.controls}>
        <Button
          type="primary"
          style={styles.controlBtn}
          onClick={handleCancel}
          danger
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={styles.controlBtn}
          onClick={saveMapPoints}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={styles.controlBtn}
          onClick={undoLastAction}
        >
          Undo
        </Button>
      </div>
    </div>
  );
};

export default ResizeMapScreen;
