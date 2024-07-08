import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  faLocationCrosshairs,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import SelectionModal from "../../components/SelectionModal";
import ProfileModel from "../../components/ProfileModel";
import axios from "axios";
import ProfileAvatar from "../../components/ProfileAvatar";
import { useIsFocused } from "@react-navigation/native";
import AxiosInstance from "../../AxiosInstance";
import styles from "./HomeStyles";
import MapDetailsPanel from './MapDetailsPanel';

const apiKey = "AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U";

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
  const [userMaps, setUserMaps] = useState([]);
const [selectedMapId, setSelectedMapId] = useState(null);
const [selectedMapDetails, setSelectedMapDetails] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.get("/api/users/details");
        if (response.data.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  //get all maps of user
  useEffect(() => {
    const fetchUserMaps = async () => {
      try {
        const response = await AxiosInstance.get("/api/auth/mapTemplate/getAllTemplates");
        setUserMaps(response.data);
      } catch (error) {
        console.error("Failed to fetch user maps:", error);
      }
    };
  
    fetchUserMaps();
  }, []);

  //get the current location
  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); // Get current location
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

  //toggle the map type
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
    setShowCurrentLocation(!showCurrentLocation); // Toggle current location
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
        ); // Search for location by address using Google Maps Geocoding API
        const data = response.data;
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location; // Get latitude and longitude
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

  // handle the template press
  const handleTemplatePress = () => {
    navigation.navigate("SavedTemplatesScreen");
  };

  // Dismiss the keyboard when tapping outside the text input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleMapSelect = async (mapId) => {
    if (mapId === selectedMapId) {
      setSelectedMapId(null);
      setSelectedMapDetails(null);
    } else {
      setSelectedMapId(mapId);
      try {
        const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllmapData/${mapId}`);
        setSelectedMapDetails(response.data);
        
        // Zoom to the selected map
        const selectedMap = userMaps.find(map => map._id === mapId);
        if (selectedMap && mapRef.current) {
          const coordinates = selectedMap.locationPoints.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }));
          
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch map details:", error);
      }
    }
  };

  const getCenterOfPolygon = (points) => {
    const latitudes = points.map((p) => p.latitude);
    const longitudes = points.map((p) => p.longitude);
    const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
    const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
    return { latitude: centerLat, longitude: centerLng };
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={mapTypes[mapTypeIndex].value} // Set map type
          initialRegion={{
            latitude: 6.2427,
            longitude: 80.0607,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} // Initial region (Sri Lanka)
        >

        {userMaps.map((map, index) => (
          <React.Fragment key={map._id}>
            <Polygon
              coordinates={map.locationPoints.map((point) => ({
                latitude: point.latitude,
                longitude: point.longitude,
              }))}
              fillColor="rgba(255,255,255,0.1)"
              strokeColor="black"
              strokeWidth={3}
            />
            <Marker
              coordinate={getCenterOfPolygon(map.locationPoints)}
              onPress={() => handleMapSelect(map._id)}
            >
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>{index + 1}</Text>
              </View>
            </Marker>
          </React.Fragment>
        ))}

      {/* Show markers on the map for search location */}
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
        {selectedMapDetails && (
          <MapDetailsPanel
            mapDetails={selectedMapDetails}
            onClose={() => {
              setSelectedMapId(null);
              setSelectedMapDetails(null);
            }}
          />
        )}

        {/* Search bar */}
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

          {/* Clear search query icon */}
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
              <ProfileAvatar userData={userData} textSize={5} />
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
    </TouchableWithoutFeedback>
  );
}
