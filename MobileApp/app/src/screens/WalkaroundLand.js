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
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

// function kalmanFilter(currentMeasurement, lastEstimation) {
//   // Define constants for the Kalman filter
//   const measurementNoise = 0.0001;
//   const processNoise = 0.01;

//   // Kalman gain calculation
//   const kalmanGain = lastEstimation.errorEstimate / (lastEstimation.errorEstimate + measurementNoise);

//   // State update estimation
//   const updatedEstimation = {
//     value: lastEstimation.value + kalmanGain * (currentMeasurement - lastEstimation.value),
//     errorEstimate: (1 - kalmanGain) * lastEstimation.errorEstimate + processNoise
//   };

//   return updatedEstimation.value;
// }
// export default function Home() {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [pathCoordinates, setPathCoordinates] = useState([]);
//   const [trackingStarted, setTrackingStarted] = useState(false);
//   const mapRef = useRef(null);
//   const lastLocation = useRef(null); // Store last location for filtering

//   useEffect(() => {
//     let watchLocation;
//     if (trackingStarted) {
//       watchLocation = Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.BestForNavigation,
//           timeInterval: 1000, // Update every 1 second
//           distanceInterval: 1, // Update every 1 meter
//         },
//         (location) => {
//           // Apply Kalman filter to smooth location data
//           const smoothedLatitude = lastLocation.current ?
//             kalmanFilter(location.coords.latitude, lastLocation.current.coords.latitude) :
//             location.coords.latitude;
//           const smoothedLongitude = lastLocation.current ?
//             kalmanFilter(location.coords.longitude, lastLocation.current.coords.longitude) :
//             location.coords.longitude;

//           setCurrentLocation({
//             coords: {
//               latitude: smoothedLatitude,
//               longitude: smoothedLongitude,
//             }
//           });

//           setPathCoordinates(prevCoordinates => [
//             ...prevCoordinates,
//             {
//               latitude: smoothedLatitude,
//               longitude: smoothedLongitude,
//             },
//           ]);

//           lastLocation.current = location;
//         }
//       );
//     } else {
//       // Clear path coordinates if tracking is stopped
//       setPathCoordinates([]);
//     }

//     return () => {
//       if (watchLocation && watchLocation.remove) {
//         watchLocation.remove();
//       }
//     };
//   }, [trackingStarted]);

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
    const navigation = useNavigation(); 
  const mapRef = useRef(null);

  useEffect(() => {
    let watchLocation;
    if (trackingStarted) {
      watchLocation = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Update every 1 meter
        },
        (location) => {
          setCurrentLocation(location);
          setPathCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]);
        }
      );
    } else {
      // Clear path coordinates if tracking is stopped
      setPathCoordinates([]);
    }

    return () => {
      if (watchLocation && watchLocation.remove) {
        watchLocation.remove();
      }
    };
  }, [trackingStarted]);

  const mapTypes = [
    { name: "Standard", value: "standard" },
    { name: "Satellite", value: "satellite" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
  };

  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };

  const focusOnCurrentLocation = () => {
    setTrackingStarted(!trackingStarted); // Toggle tracking started state

    if (!trackingStarted) {
      Location.getCurrentPositionAsync({}).then((location) => {
        setCurrentLocation(location);
        setPathCoordinates([
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        ]);
        if (mapRef.current && location) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        }
      });
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
          onPress={() => console.log("Save pressed")}
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
        {trackingStarted && currentLocation && (
          <Circle
            center={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            radius={5} // Adjust radius as needed
            strokeColor="#000"
            fillColor="rgba(255, 0, 0, 0.5)" // Semi-transparent red
          />
        )}
        {trackingStarted && pathCoordinates.length > 1 && (
          <Polyline
            coordinates={pathCoordinates}
            strokeColor="#0000FF" // Blue color
            strokeWidth={5}
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
            onPress={focusOnCurrentLocation}
            style={styles.button}
          >
            {trackingStarted ? "Stop" : "Start"}
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
  startButton: {
    position: "absolute",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    bottom: 16,
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
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
