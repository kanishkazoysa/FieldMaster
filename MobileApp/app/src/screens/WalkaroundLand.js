import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform, StatusBar, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Circle } from "react-native-maps";
import * as Location from "expo-location";

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
          setPathCoordinates(prevCoordinates => [
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

  const focusOnCurrentLocation = () => {
    setTrackingStarted(!trackingStarted); // Toggle tracking started state

    if (!trackingStarted) {
      Location.getCurrentPositionAsync({}).then((location) => {
        setCurrentLocation(location);
        setPathCoordinates([{ latitude: location.coords.latitude, longitude: location.coords.longitude }]);
        if (mapRef.current && location) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      <MapView
        ref={mapRef}
        style={styles.map}
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

      <TouchableOpacity style={styles.startButton} onPress={focusOnCurrentLocation}>
        <Text style={styles.buttonText}>{trackingStarted ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
