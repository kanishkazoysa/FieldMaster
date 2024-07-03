import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  PolygonF,
  MarkerF,
} from "@react-google-maps/api";
import SideNavbar from "../SideNavbar/sideNavbar";
import { styles } from "./ResizeMapStyles";
import AxiosInstance from "../../AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const ResizeMapScreen = () => {
  const [zoomMap, setZoomMap] = useState(20);
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId, templateArea, templatePerimeter } = location.state;
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [appArray, setAppArray] = useState([]);
  const [newPoint, setNewPoint] = useState(null);
  const [initialArray, setInitialArray] = useState([]);
  const [area, setArea] = useState(parseFloat(templateArea) || 0);
  const [perimeter, setPerimeter] = useState(
    parseFloat(templatePerimeter) || 0
  );
  const [initialPointsLength, setInitialPointsLength] = useState(0);
  const [history, setHistory] = useState([]); // State to keep track of the history

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const MapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    // streetViewControl: false,
    rotateControl: true,
    fullscreenControl: true,
    scrollwheel: true,
    mapTypeId: "satellite",
  };

  useEffect(() => {
    // Fetch template data using AxiosInstance
    AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`)
      .then((response) => {
        const { locationPoints } = response.data;
        console.log(response.data);

          // Calculate average latitude and longitude
        const totalPoints = locationPoints.length;
        const sumLat = locationPoints.reduce((acc, point) => acc + parseFloat(point.latitude), 0);
        const sumLng = locationPoints.reduce((acc, point) => acc + parseFloat(point.longitude), 0);
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
    //     let latArr = [];
    // let lngArr = [];
    // paths.forEach((data) => {
    //   latArr.push(data.lat);
    //   lngArr.push(data.lng);
    // });

    // const getCenterLat = latArr.sort((a, b) => b - a);
    // const calCenterlat =
    //   (getCenterLat[0] + getCenterLat[getCenterLat.length - 1]) / 2;

    // const getCenterLng = lngArr.sort((a, b) => b - a);
    // const calCenterlng =
    //   (getCenterLng[0] + getCenterLng[getCenterLng.length - 1]) / 2;
    // const centerDict = { lat: calCenterlat, lng: calCenterlng };

    // setCenter(centerDict);

      })
      .catch((error) => {
        console.error("Error fetching template:", error);
      });
  }, [templateId]);

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    appArray.forEach((data) => {
      data.path.forEach((coord) => {
        bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
      });
    });
    map.fitBounds(bounds);

    
  };

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
      <SideNavbar />
      <div style={styles.mapContainer}>
        <div style={styles.top}>
          <div style={styles.area}>Area: {area} perches </div>
          <div style={styles.perimeter}>Perimeter: {perimeter} kilometers</div>
        </div>
        <LoadScript
          googleMapsApiKey="AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={15}
            center={center}
            options={MapOptions}
            onLoad={onLoad}
            // onClick={addPoint}
          >
            {appArray &&
              appArray.map((data, i) => (
                <React.Fragment key={i}>
                  <PolygonF
                    options={{
                      fillColor: data.color,
                      fillOpacity: 0.6,
                      strokeColor: "black",
                      strokeOpacity: 0.4,
                      strokeWeight: 0.5,
                      clickable: true,
                      draggable: false,
                      editable: true,
                      geodesic: false,
                      zIndex: 1,
                    }}
                    paths={data.path}
                    onLoad={onPolygonLoad}
                  />
                  {data.path.map((coord, index) => (
                    <MarkerF key={index} position={coord} />
                  ))}
                </React.Fragment>
              ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={styles.controls}>
        <button style={styles.controlBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button style={styles.controlBtn} onClick={saveMapPoints}>
          Save
        </button>
        <button style={styles.controlBtn} onClick={undoLastAction}>
          Undo
        </button>
      </div>
    </div>
  );
};

export default ResizeMapScreen;
