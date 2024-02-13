import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Searchbar, Button, Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const mapRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const mapTypes = [
    "standard",
    "satellite",
    "hybrid",
    "terrain",
    "none", // Add more map types as needed
  ];

  const toggleMapType = () => {
    const nextIndex = (mapTypeIndex + 1) % mapTypes.length;
    setMapTypeIndex(nextIndex);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const focusOnCurrentLocation = () => {
    setShowCurrentLocation(!showCurrentLocation);
    setSearchedLocation(null); // Clear searched location
    if (!showCurrentLocation && currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const searchLocation = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchQuery
          )}&key=AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setShowCurrentLocation(false); // Hide current location
          setSearchedLocation({ latitude: lat, longitude: lng });
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        } else {
          console.error("Location not found");
        }
      } catch (error) {
        console.error("Error searching for location:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapTypes[mapTypeIndex]}
        initialRegion={{
          latitude: 6.2427,
          longitude: 80.0607,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {showCurrentLocation && currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Current Location"
          />
        )}
        {searchedLocation && (
          <Marker coordinate={searchedLocation} title="Searched Location" />
        )}
      </MapView>

      <View style={styles.searchbar}>
        <Searchbar
          icon={() => (
            <MaterialIcons name="location-on" size={25} color="#007BFF" />
          )}
          theme={{ colors: { primary: "white" } }}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.searchbarInput,
            isFocused ? styles.searchbarInputFocused : null,
          ]}
          placeholder="Search Location"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchLocation} // Call searchLocation on submit
        />
        <View style={styles.profileIconContainer}>
          <Avatar.Image size={44} source={require("../images/zoysa.png")} />
        </View>
      </View>
      
      <TouchableOpacity style={styles.button1} onPress={toggleMapType}>
        <Text style={styles.buttonText}>
       
          {mapTypes[mapTypeIndex].charAt(0).toUpperCase() +
            mapTypes[mapTypeIndex].slice(1)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={focusOnCurrentLocation}>
        <FontAwesomeIcon icon={faLocationCrosshairs} size={25} color="#fff" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            buttonColor="#007BFF"
            icon="walk"
            mode="contained"
            onPress={() => console.log("Left Button Pressed")}
            style={styles.button}
          >
            Start Measure
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
            Templates
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button1: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: 10,
    borderRadius: 5,
    bottom: 100,
    left: 20,
  },
  button2: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: 10,
    borderRadius: 5,
    top: 150,
    right: 10,
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
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  container: {
    flex: 1,
  },
  searchbar: {
    left: 10,
    position: "absolute",
    top: "8%",
    width: "83%",
    zIndex: 1,
  },
  searchbarInput: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },
  searchbarInputFocused: {
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  profileIconContainer: {
    position: "absolute",
    top: 1,
    right: -50,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 1,
  },
});
