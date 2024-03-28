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
import MapView, { PROVIDER_GOOGLE, Polyline, Circle } from "react-native-maps";
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
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [lastLocation, setLastLocation] = useState(null);


  // Handle background location updates
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
      console.error("Background location task error:", error);
      return;
    }

    if (data) {
      const { locations } = data;
      console.log("Received background location update:", locations);
      if (trackingStarted) {
        setPathCoordinates((prevCoordinates) => {
          if (prevCoordinates.length > 0) {
            // Calculate the midpoint between the last point and the newly generated circle
            const lastCoordinate = prevCoordinates[prevCoordinates.length - 1];
            const newCoordinate = {
              latitude: locations[0].coords.latitude,
              longitude: locations[0].coords.longitude,
            };

            const midpoint = {
              latitude: (lastCoordinate.latitude + newCoordinate.latitude) / 2,
              longitude:
                (lastCoordinate.longitude + newCoordinate.longitude) / 2,
            };

            // Update pathCoordinates to start from the midpoint
            return [...prevCoordinates, midpoint, newCoordinate];
          } else {
            return [
              {
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
              },
            ];
          }
        });
        focusOnCurrentLocation();
      }
    }
  });

  // useEffect(() => {
  //   if (trackingStarted) {
  //     startLocationUpdates();
  //     focusOnCurrentLocation(); // Add this line
  //   } else {
  //     stopLocationUpdates();
  //   }

  //   return () => {
  //     stopLocationUpdates();
  //   };
  // }, [trackingStarted]);

  useEffect(() => {
    const startTracking = async () => {
      try {
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
    if (pathCoordinates.length > 0) {
      const location = pathCoordinates[0];
      if (mapRef.current && location) {
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    }
  };

  // const toggleTracking = async () => {
  //   if (trackingStarted) {
  //     await stopLocationUpdates();
  //     setTrackingStarted(false);
  //   } else {
  //     setTrackingStarted(true);
  //   }
  // };
  const mapTypes = [
    { name: "Standard", value: "standard" },
    { name: "Satellite", value: "satellite" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

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
        {currentLocation && (
          <Circle
            center={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            radius={1} // Adjust radius as needed
            strokeColor="#000"
            fillColor="#007BFF" // Semi-transparent red
          />
        )}
        {trackingStarted && pathCoordinates.length > 0 && (
          <Circle
            center={{
              latitude: pathCoordinates[pathCoordinates.length - 1].latitude,
              longitude: pathCoordinates[pathCoordinates.length - 1].longitude,
            }}
            radius={2} // radius in meters
            strokeColor="rgba(0, 122, 255, 5)" // blue
            fillColor="rgba(0, 122, 255, 0.3)"
          />
        )}
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
           
            style={styles.button}
          >
            start
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            buttonColor="#007BFF"
            icon="content-save-all"
            mode="contained"
            onPress={() => console.log("Right Button Pressed")}
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
