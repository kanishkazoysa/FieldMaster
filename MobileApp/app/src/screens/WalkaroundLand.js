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
import MapView, { PROVIDER_GOOGLE, Circle ,Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager"; // Import TaskManager
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

// Define the name of your background task
const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [drawPolyline, setDrawPolyline] = useState(false); // State variable for drawing polyline
  const [points, setPoints] = useState([]); // State variable to store points

  const navigation = useNavigation();
  const mapRef = useRef(null);

  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
      console.error("Background location task error:", error);
      return;
    }

    if (data) {
      const { locations } = data;
      console.log("Received background location update:", locations);
      if (trackingStarted) {
        const newCoordinates = locations.map(location => ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
        setPathCoordinates(prevCoordinates => [...prevCoordinates, ...newCoordinates]);
        if (!trackingPaused) {
          setCurrentLocation({
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
          });
          focusOnCurrentLocation();
        }
      }
      setInitialLocation({
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude,
      });
    }
  });

  const handleStartPress = () => {
    setTrackingPaused(!trackingPaused);
    if (!trackingPaused) {
      setDrawPolyline(true); // Start drawing polyline
      setPathCoordinates([initialLocation]); // Initialize pathCoordinates with the initial location
    } else {
      stopLocationUpdates(); // Stop location updates only
    }
  };
  
  useEffect(() => {
    const startTracking = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});

        // Request foreground and background location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Foreground location permission not granted");
          return;
        }

        // Start the background location task
        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 0.5, // Update every 1 meter
          foregroundService: {
            notificationTitle: "Tracking location",
            notificationBody: "Your location is being tracked in the background",
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
      // Check if the task is running before trying to stop it
      const isTaskRunning = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_LOCATION_TASK
      );
      if (isTaskRunning) {
        // Stop the background location task
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
        longitudeDelta: 0.001,
      });
    }
  };

  const mapTypes = [
    { name: "Standard", value: "standard" },
    { name: "Satellite", value: "satellite" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  const addPoint = () => {
    if (pathCoordinates.length > 0) {
      const latestLocation = pathCoordinates[pathCoordinates.length - 1];
      setPoints(prevPoints => [...prevPoints, latestLocation]);
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
          onPress={() => navigation.navigate("SaveScreen")}
          style={[styles.appbarButton, { marginLeft: "auto" }]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapTypes[mapTypeIndex].value}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.2427,
          longitude: 80.0607,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {initialLocation && (
          <Circle
            center={initialLocation}
            radius={2}
            strokeColor="rgba(0, 122, 255, 5)"
            fillColor="rgba(0, 122, 255, 0.3)"
          />
        )}
        {trackingStarted && currentLocation && (
          <Circle
            center={currentLocation}
            radius={2}
            strokeColor="rgba(0, 122, 255, 5)"
            fillColor="rgba(0, 122, 255, 0.3)"
          />
        )}

        {/* Render polyline if drawPolyline is true */}
        {drawPolyline && pathCoordinates.length > 0 && (
          <Polyline
            coordinates={pathCoordinates} // Polyline with all collected path coordinates
            strokeWidth={2}
            strokeColor="red"
          />
        )}

        {/* Render markers for each point */}
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={`Point ${index + 1}`}
            pinColor="blue"
          />
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
            buttonColor="#007BFF"
            icon="play-outline"
            mode="contained"
            onPress={handleStartPress}
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
    transform: [{ translateY: -12 }], // Adjust translateY to vertically center the icon
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
