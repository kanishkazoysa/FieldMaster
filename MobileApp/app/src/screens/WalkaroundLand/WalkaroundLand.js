import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
  Polygon,
} from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import area from "@turf/area";
import { distance } from "@turf/turf";
import styles from "./WalkaroundLandStyles";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function WalkaroundLand() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [drawPolyline, setDrawPolyline] = useState(false);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [calculatedArea, setCalculatedArea] = useState(0);
  const [polygonPerimeter, setPolygonPerimeter] = useState(0);
  const [isResizeButtonDisabled, setIsResizeButtonDisabled] = useState(true);
  const [isStartPauseButtonDisabled, setIsStartPauseButtonDisabled] =
    useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [resizingMode, setResizingMode] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(true);
  const [showFillColor, setShowFillColor] = useState(false);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);

  //define taskmanager to request location permission
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => { 
    if (error) {
      console.error("Background location task error:", error);
      return;
    } //get location data

    if (data) {
      const { locations } = data;
      console.log("Received background location update:", locations);
      if (trackingStarted) {
        const newCoordinates = locations.map((location) => ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        }));
        //set pathcoordinates array to store location data
        setPathCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          ...newCoordinates,
        ]);
        if (!trackingPaused) {
          setCurrentLocation({
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
            accuracy: locations[0].coords.accuracy,
          });
          focusOnCurrentLocation();
        }
      }
      setInitialLocation({
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude,
        accuracy: locations[0].coords.accuracy,
      });
    }
  });

  const handleStartPress = () => {
    //start tracking location
    setTrackingPaused(!trackingPaused);
    if (!trackingPaused) {
      setDrawPolyline(true);
      setPathCoordinates([initialLocation]); //set initial location
      setIsSaveButtonDisabled(true);//disable save button
      setShowFillColor(false);//hide fill color
      setIsPolygonClosed(false);//  set polygon closed to false
    } else {
      setTrackingStarted(false);
      setIsResizeButtonDisabled(false);
      setIsStartPauseButtonDisabled(true); //disable start button
      setIsSaveButtonDisabled(false); // enable save button
      setShowFillColor(true);
      setIsPolygonClosed(true);
      stopLocationUpdates();
      calculateAreaAndPerimeter(); //calculate area and perimeter
    }
  };

  const handleResizeEnd = () => {
    //if point is drag calculate area and perimeter
    calculateAreaAndPerimeter();
  };

  useEffect(() => {
    //start tracking location
    const startTracking = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({}); // get current location data 

        const { status } = await Location.requestForegroundPermissionsAsync(); // request location permission
        if (status !== "granted") {
          console.error("Foreground location permission not granted");
          return;
        }
        //start location updates  and set location data to initial location and current location
        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 0,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Tracking location",
            notificationBody:
              "Your location is being tracked in the background",
          },
        });

        setInitialLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        console.log("Background location updates started");
        setTrackingStarted(true);
      } catch (error) {
        console.error("Error starting background location updates:", error);
      }
    };

    startTracking();

    return () => {
      stopLocationUpdates();
    };
  }, []);

  //stop location updates
  const stopLocationUpdates = async () => {
    try {
      // Check if the task is already running and stop it if it is running
      const isTaskRunning = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_LOCATION_TASK
      );
      if (isTaskRunning) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK); //stop location updates
        console.log("Background location updates stopped");
      }
    } catch (error) {
      console.error("Error stopping background location updates:", error);
    }
  };

  const toggleMapType = () => {
    //toggle map type dropdown menu
    setShowDropdown(!showDropdown);
  };

  const selectMapType = (index) => {
    setMapTypeIndex(index); //set map type index
    setShowDropdown(false);
  };

  const focusOnCurrentLocation = () => {
    //focus on current location
    if (mapRef.current && currentLocation) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.00009,
      });
    }
  };

  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  //calculate area and perimeter of polygon
  const calculateAreaAndPerimeter = () => {
    const polygon = {
      type: "Polygon",
      coordinates: [
        pathCoordinates.map((coord) => [coord.longitude, coord.latitude]), //get coordinates
      ],
    };
    const polygonArea = area(polygon); //calculate area by using turf library
    setCalculatedArea(polygonArea * 0.03954);

    // Calculate perimeter
    let perimeter = 0;
    for (let i = 0; i < pathCoordinates.length; i++) {
      const start = [pathCoordinates[i].longitude, pathCoordinates[i].latitude];
      const end =
        i === pathCoordinates.length - 1
          ? [pathCoordinates[0].longitude, pathCoordinates[0].latitude]
          : [pathCoordinates[i + 1].longitude, pathCoordinates[i + 1].latitude];
      perimeter += distance(start, end, { units: "kilometers" });
    }

    setPolygonPerimeter(perimeter); //  set polygon perimeter
  };

  // save map data
  const saveMapData = async () => {
    navigation.navigate("SaveScreen", {
      locationPoints: pathCoordinates,
      area: calculatedArea,
      perimeter: polygonPerimeter,
    });
  };

  //  handle drag end
  const handleResize = () => {
    const newResizingMode = !resizingMode;
    setResizingMode(newResizingMode);
    if (newResizingMode) {
      // Entering resize mode
      setShowUndoButton(true);
    } else {
      // Exiting resize mode (pressing Done)
      setShowUndoButton(false);
    }
  };

  //handle drag points
  const handleDragEnd = (event, index) => {
    const { latitude, longitude } = event.nativeEvent.coordinate; // Dragged point
    const updatedCoordinates = [...pathCoordinates]; //update path coordinates
    const draggedPoint = { latitude, longitude }; //
    updatedCoordinates[index] = draggedPoint;

    const prevIndex =
      (index - 1 + updatedCoordinates.length) % updatedCoordinates.length;
    const nextIndex = (index + 1) % updatedCoordinates.length;

    const intermediatePrev = insertIntermediatePoints(
      updatedCoordinates[prevIndex],
      draggedPoint
    ); //insert intermediate points
    const intermediateNext = insertIntermediatePoints(
      draggedPoint,
      updatedCoordinates[nextIndex]
    );

    updatedCoordinates.splice(index, 0, ...intermediatePrev);
    updatedCoordinates.splice(
      index + intermediatePrev.length + 1,
      0,
      ...intermediateNext
    );

    setUndoStack((prevStack) => [...prevStack, [...pathCoordinates]]); // Save previous state to undo stack
    setPathCoordinates(updatedCoordinates);
    setShowUndoButton(true);
    handleResizeEnd();
    setShowFillColor(true);

    // If the polygon is closed, ensure it stays closed
    if (isPolygonClosed) {
      updatedCoordinates[updatedCoordinates.length - 1] = {
        ...updatedCoordinates[0],
      };
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack]; // Copy the stack
      const previousState = newUndoStack.pop(); // Get the previous state
      setUndoStack(newUndoStack);
      setPathCoordinates(previousState);
      calculateAreaAndPerimeter();

      // Hide undo icon if stack is empty
      if (newUndoStack.length === 0) {
        setShowUndoButton(false);
      }
    }
  };

  // insert intermediate points
  const insertIntermediatePoints = (startPoint, endPoint, numPoints = 1) => {
    const points = [];
    for (let i = 1; i <= numPoints; i++) {
      const ratio = i / (numPoints + 1);
      const lat =
        startPoint.latitude + (endPoint.latitude - startPoint.latitude) * ratio; // Calculate the intermediate point
      const lng =
        startPoint.longitude +
        (endPoint.longitude - startPoint.longitude) * ratio; // Calculate the intermediate point
      points.push({ latitude: lat, longitude: lng });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Appbar.Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.appbarButton}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveMapData}
          style={[styles.appbarButton, { marginLeft: "auto" }]}
          disabled={isSaveButtonDisabled}
        >
          <Text
            style={[
              styles.buttonText,
              isSaveButtonDisabled && { color: "rgba(255, 255, 255, 0.5)" },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </Appbar.Header>

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Area: {calculatedArea.toFixed(2)} perches
        </Text>
        <Text style={styles.overlayText}>
          Perimeter: {polygonPerimeter.toFixed(3)} km
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapTypes[mapTypeIndex].value}
        showsUserLocation={trackingStarted}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.2427,
          longitude: 80.0607,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }} //initial region
      >
      {/** Draw polyline */}
        {drawPolyline && pathCoordinates.length > 0 && (
          <>
            <Polyline
              coordinates={
                isPolygonClosed
                  ? [...pathCoordinates, pathCoordinates[0]]
                  : pathCoordinates
              }
              strokeWidth={2.3}
              strokeColor="white"
            />
            {showFillColor && (
              <Polygon
                coordinates={pathCoordinates}
                fillColor="rgba(0, 123, 255, 0.3)"
                strokeColor="white"
                strokeWidth={2.3}
              />
            )}
          </>
        )}
          {/** Draw markers */}
        {resizingMode &&
          pathCoordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              draggable
              onDragEnd={(event) => handleDragEnd(event, index)}
              tracksViewChanges={false}
              stopPropagation={true}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={styles.markerTouchArea}>
                <View style={styles.marker} />
              </View>
            </Marker>
          ))}
      </MapView>

      <TouchableOpacity
        style={styles.layerIconContainer}
        onPress={toggleMapType}
      >
        <FontAwesomeIcon
          icon={faLayerGroup}
          size={responsiveFontSize(2.8)}
          color="#fff"
        />
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={mapTypes}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectMapType(index)}
                >
                  <Text style={{ color: "#fff" }}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            icon={trackingPaused ? "pause" : "play-outline"}
            mode="contained"
            onPress={handleStartPress}
            disabled={isStartPauseButtonDisabled}
            style={[
              styles.button,
              isStartPauseButtonDisabled && {
                backgroundColor: "rgba(131, 180, 255, 0.8)",
              },
            ]}
            labelStyle={
              isStartPauseButtonDisabled && {
                color: "rgba(255, 255, 255, 0.7)",
              }
            }
          >
            {trackingPaused ? "Finish" : "Start"}
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            icon="resize"
            mode="contained"
            disabled={isResizeButtonDisabled}
            style={[
              styles.button,
              isResizeButtonDisabled && {
                backgroundColor: "rgba(131, 180, 255, 0.8)",
              },
            ]}
            labelStyle={
              isResizeButtonDisabled && { color: "rgba(255, 255, 255, 0.7)" }
            }
            onPress={handleResize}
          >
            {resizingMode ? "Done" : "Resize"}
          </Button>
        </View>
        {undoStack.length > 0 && showUndoButton && resizingMode && (
          <TouchableOpacity style={styles.undoIcon} onPress={handleUndo}>
            <FontAwesomeIcon
              icon={faUndo}
              size={responsiveFontSize(2.5)}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
