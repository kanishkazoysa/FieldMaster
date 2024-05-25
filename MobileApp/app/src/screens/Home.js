import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Avatar } from "react-native-paper";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  faLocationCrosshairs,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import SelectionModal from "../components/SelectionModal";
import ProfileModel from "../components/ProfileModel";
import axios from "axios";
import Config from "react-native-config";
import ProfileAvatar from "../components/ProfileAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

const apiKey = Config.GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [isfocused, setIsFocused] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const mapRef = React.useRef(null);
  const [userData, setUserData] = useState(null);

  const isFocused = useIsFocused();
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          "http://192.168.1.106:5000/api/users/details",
          {
            headers: { Authorization: token },
          }
        );
        if (response.data.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);
  

  //get the current location
  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const startMeasure = () => {
    setModalVisible(true);
  };
  const ProfileManage = () => {
    setProfileModalVisible(true);
  };

  //options for the selection modal
  const options = [
    {
      icon: "walk",
      Header: "Walk around the land",
      Text: "Click on Start button and it will track your phone’s live position.",
    },
    {
      icon: "map-marker-radius",
      Header: "Point edges on map",
      Text: "Add points to map manually,drag and drop to specific place.",
    },
    {
      icon: "calculator",
      Header: "Manual Calculator",
      Text: "Manually add area and perimeter for the calculation.",
    },
  ];

  // Map types
  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
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

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const focusOnCurrentLocation = () => {
    setShowCurrentLocation(!showCurrentLocation);
    setSearchedLocation(null); // Clear searched location
    // Animate to current location
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
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchQuery
          )}&key=${apiKey}`
        );
        const data = response.data;
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setShowCurrentLocation(false); // Hide current location
          setSearchedLocation({ latitude: lat, longitude: lng });
          if (mapRef.current) {
            // Animate to searched location
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
  //clear the search query
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  const handleTemplatePress = () => {
    navigation.navigate("SavedTemplatesScreen");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: -responsiveHeight(10),
        })}
      >
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            mapType={mapTypes[mapTypeIndex].value}
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
            <View style={styles.locationIconContainer}>
              <MaterialIcons
                name="location-on"
                size={responsiveFontSize(2.9)}
                color="#007BFF"
              />
            </View>
            <TextInput
              placeholder="Search Location"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onFocus={onFocus}
              onBlur={onBlur}
              style={[
                styles.searchbarInput,
                isfocused ? styles.searchbarInputFocused : null,
              ]}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onSubmitEditing={searchLocation}
            />
            {searchQuery !== "" && (
              <TouchableOpacity
                onPress={clearSearchQuery}
                style={styles.clearIconContainer}
              >
                <MaterialIcons
                  name="cancel"
                  size={responsiveFontSize(2.9)}
                  color="#707070"
                />
              </TouchableOpacity>
            )}
            <View style={{ marginLeft: responsiveWidth(3) }}>
            <TouchableOpacity onPress={ProfileManage}>
              <ProfileAvatar userData={userData}  textSize={5} />
              </TouchableOpacity>
              </View>
          </View>

          <TouchableOpacity
            style={styles.layerIconContainer}
            onPress={toggleMapType}
          >
            <FontAwesomeIcon
              icon={faLayerGroup}
              size={responsiveFontSize(2.7)}
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

          <TouchableOpacity
            style={styles.button2}
            onPress={focusOnCurrentLocation}
          >
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              size={responsiveFontSize(2.7)}
              color="#fff"
            />
          </TouchableOpacity>

          <SelectionModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            options={options}
          />

          <ProfileModel
            profileModalVisible={profileModalVisible}
            setProfileModalVisible={setProfileModalVisible}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                buttonColor="#007BFF"
                icon="walk"
                mode="contained"
                onPress={startMeasure}
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
                onPress={handleTemplatePress}
                style={styles.button}
              >
                Templates
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  locationIconContainer: {
    position: "absolute",
    left: responsiveWidth(5),
    top: "50%",
    transform: [{ translateY: responsiveHeight(-1.4) }], // Adjust translateY to vertically center the icon
    zIndex: 1,
  },
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    right: responsiveWidth(3),
    top: responsiveHeight(24),
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
  button2: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    top: responsiveHeight(17),
    right: responsiveWidth(3),
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: responsiveHeight(4),
    left: 16,
    right: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: responsiveWidth(3),
  },
  button: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchbar: {
    width: "99%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: Platform.OS === "android" ? "4%" : "8%",
    zIndex: 1,
  },
  searchbarInput: {
    borderRadius: 30,
    paddingLeft: 40,
    height: responsiveHeight(6),
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: "#000",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },
  searchbarInputFocused: {
    backgroundColor: "#fff",
    borderColor: "#007BFF", // Change border color when focused
  },
  map: {
    width: "100%",
    height: "100%",
  },
  clearIconContainer: {
    position: "absolute",
    right: "20%",
    top: "50%",
    transform: [{ translateY: responsiveHeight(-1.4) }], // Adjust translateY to vertically center the icon
    zIndex: 1,
  },
});
