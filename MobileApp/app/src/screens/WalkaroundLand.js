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
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import area from "@turf/area";

const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [drawPolyline, setDrawPolyline] = useState(false);
  const [points, setPoints] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [polygonArea, setPolygonArea] = useState(0); // Renamed state variable

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
    } else {
      setTrackingStarted(false);
      if (currentLocation) {
        const lineCoordinates = [currentLocation, initialLocation];
        setPathCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          ...lineCoordinates,
        ]);
      }
      stopLocationUpdates();
    }
    if (trackingPaused) {
      setIsButtonDisabled(true);
    }
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

  const addPoint = () => {
    if (pathCoordinates.length > 0) {
      const latestLocation = pathCoordinates[pathCoordinates.length - 1];
      setPoints((prevPoints) => [...prevPoints, latestLocation]);
    }
  };

  const saveMapData = async () => {
    const polygon = {
      type: "Polygon",
      coordinates: [pathCoordinates.map((coord) => [coord.longitude, coord.latitude])],
    };
    const polygonArea = calculatePolygonArea(polygon);
    setPolygonArea(polygonArea);
    try {
      const response = await axios.post(
        "http://192.168.1.104:5000/api/polyline/save",
        { coordinates: pathCoordinates,
          area: polygonArea
        }
      );
      console.log(response.data);
      navigation.navigate("SaveScreen");
    } catch (error) {
      console.error("Error saving polyline data:", error);
    }
  };

  const calculatePolygonArea = (polygon) => {
    return area(polygon);
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
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapTypes[mapTypeIndex].value}
        showsUserLocation={trackingStarted}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.2427,
          longitude: 80.0607,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {drawPolyline && pathCoordinates.length > 0 && (
          <Polyline
            coordinates={pathCoordinates}
            strokeWidth={2}
            strokeColor="blue"
          />
        )}
        {points.map((point, index) => (
          <Marker key={index} coordinate={point} pinColor="red" />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.layerIconContainer}
        onPress={toggleMapType}
      >
        <FontAwesomeIcon icon={faLayerGroup} size={25} color="#fff" />
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
            buttonColor={isButtonDisabled ? "#007BFFA" : "#007BFF"}
            icon="play-outline"
            mode="contained"
            onPress={isButtonDisabled ? null : handleStartPress}
            style={styles.button}
          >
            {trackingPaused ? "Pause" : "Start"}
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            buttonColor="#007BFF"
            icon="content-save-all"
            mode="contained"
            onPress={addPoint}
            style={styles.button}
          >
            Add Points
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: 10,
    borderRadius: 5,
    right: 10,
    top: Platform.OS === "android" ? "15%" : "18%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    top: 0,
    right: 50,
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
  dropdownItem: {
    padding: 10,
    color: "#fff",
  },
  header: {
    height: 50,
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
    padding: 8,
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    bottom: 36,
    left: 16,
    right: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
  },
});
