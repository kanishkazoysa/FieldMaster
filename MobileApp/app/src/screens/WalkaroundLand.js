import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import area from "@turf/area";
import { convertArea } from "@turf/helpers";
import AxiosInstance from "../AxiosInstance";
import { distance } from "@turf/turf";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function Home() {
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

  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
      console.error("Background location task error:", error);
      return;
    }

    if (data) {
      const { locations } = data;
      console.log("Received background location update:", locations);
      if (trackingStarted) {
        const newCoordinates = locations.map((location) => ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        }));
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
    setTrackingPaused(!trackingPaused);
    if (!trackingPaused) {
      setDrawPolyline(true);
      setPathCoordinates([initialLocation]);
      setIsSaveButtonDisabled(true);
    } else {
      setTrackingStarted(false);
      setIsResizeButtonDisabled(false);
      setIsStartPauseButtonDisabled(true);
      setIsSaveButtonDisabled(false);
      if (currentLocation) {
        const lineCoordinates = [currentLocation, initialLocation];
        setPathCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          ...lineCoordinates,
        ]);
      }
      stopLocationUpdates();
      calculateAreaAndPerimeter(); // Call calculateAreaAndPerimeter when tracking is paused
    }
  };
  const handleResizeEnd = () => {
    calculateAreaAndPerimeter();
  };

  useEffect(() => {
    const startTracking = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Foreground location permission not granted");
          return;
        }

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

  const stopLocationUpdates = async () => {
    try {
      const isTaskRunning = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_LOCATION_TASK
      );
      if (isTaskRunning) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
        console.log("Background location updates stopped");
      }
    } catch (error) {
      console.error("Error stopping background location updates:", error);
    }
  };

  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
  };

  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };

  const focusOnCurrentLocation = () => {
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

  const calculateAreaAndPerimeter = () => {
    const polygon = {
      type: "Polygon",
      coordinates: [
        pathCoordinates.map((coord) => [coord.longitude, coord.latitude]),
      ],
    };
    const polygonArea = area(polygon);
    setCalculatedArea(polygonArea * 0.03954);

    let perimeter = 0;
    for (let i = 0; i < pathCoordinates.length; i++) {
      const start = [pathCoordinates[i].longitude, pathCoordinates[i].latitude];
      const end =
        i === pathCoordinates.length - 1
          ? [pathCoordinates[0].longitude, pathCoordinates[0].latitude]
          : [pathCoordinates[i + 1].longitude, pathCoordinates[i + 1].latitude];
      perimeter += distance(start, end, { units: "kilometers" });
    }

    setPolygonPerimeter(perimeter);
  };

  const saveMapData = async () => {
    navigation.navigate("SaveScreen", {
      locationPoints: pathCoordinates,
      area: calculatedArea,
      perimeter: polygonPerimeter,
    });
  };

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

  const handleDragEnd = (event, index) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const updatedCoordinates = [...pathCoordinates];
    updatedCoordinates[index] = { latitude, longitude };
    if (index === 0) {
      updatedCoordinates[updatedCoordinates.length - 1] = { latitude, longitude };
    } else if (index === updatedCoordinates.length - 1) {
      updatedCoordinates[0] = { latitude, longitude };
    }
    setUndoStack((prevStack) => [...prevStack, [...pathCoordinates]]);
    setPathCoordinates(updatedCoordinates);
    setShowUndoButton(true);
    handleResizeEnd();
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const previousState = newUndoStack.pop();
      setUndoStack(newUndoStack);
      setPathCoordinates(previousState);
      calculateAreaAndPerimeter();
      
      // Hide undo icon if stack is empty
      if (newUndoStack.length === 0) {
        setShowUndoButton(false);
      }
    }
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
        <Text style={styles.overlayText}>Area: {calculatedArea.toFixed(2)} perches</Text>
        <Text style={styles.overlayText}>Perimeter: {polygonPerimeter.toFixed(3)} km</Text>
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
          latitudeDelta: 0.0922 / Math.pow(2, 20), // Adjust the zoom level here
          longitudeDelta: 0.0421 / Math.pow(2, 20), // Adjust the zoom level here
        }}
      >
        {drawPolyline && pathCoordinates.length > 0 && (
          <Polyline coordinates={pathCoordinates} strokeWidth={2.3} strokeColor="white" />
        )}
        {resizingMode &&
          pathCoordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              pinColor="red"
              draggable
              onDragEnd={(event) => handleDragEnd(event, index)}
            />
          ))}
      </MapView>

      <TouchableOpacity style={styles.layerIconContainer} onPress={toggleMapType}>
        <FontAwesomeIcon icon={faLayerGroup} size={responsiveFontSize(2.8)} color="#fff" />
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
            style={[styles.button, isStartPauseButtonDisabled && { backgroundColor: "rgba(131, 180, 255, 0.8)" }]}
            labelStyle={isStartPauseButtonDisabled && { color: "rgba(255, 255, 255, 0.7)" }}
          >
            {trackingPaused ? "Pause" : "Start"}
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            icon="resize"
            mode="contained"
            disabled={isResizeButtonDisabled}
            style={[styles.button, isResizeButtonDisabled && { backgroundColor: "rgba(131, 180, 255, 0.8)" }]}
            labelStyle={isResizeButtonDisabled && { color: "rgba(255, 255, 255, 0.7)" }}
            onPress={handleResize}
          >
            {resizingMode ? "Done" : "Resize"}
          </Button>
        </View>
        {undoStack.length > 0 && showUndoButton && resizingMode && (
          <TouchableOpacity style={styles.undoIcon} onPress={handleUndo}>
        <FontAwesomeIcon icon={faUndo} size={responsiveFontSize(2.5)} color="#fff" />
      </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1),
    borderRadius: 5,
    right: responsiveWidth(4),
    top: responsiveHeight(78),
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    top: responsiveHeight(-16.5),
    right: responsiveWidth(12),
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    marginHorizontal: 20,
  },
  dropdownItem: {
    padding: 10,
    color: "#fff",
  },
  header: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  appbarButton: {
    padding: responsiveWidth(3.5),
  },
  buttonText: {
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: responsiveHeight(3),
    left: responsiveWidth(3),
    right: responsiveWidth(3),
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    flex: 1,
  },
  undoIcon: {
    position: 'absolute',
    top: -responsiveHeight(17),
    right: responsiveWidth(1),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: responsiveWidth(1),
    padding: responsiveWidth(2.1),
  },
});
