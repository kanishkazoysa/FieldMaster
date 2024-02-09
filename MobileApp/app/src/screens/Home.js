import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Searchbar, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";


export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [mapType, setMapType] = useState("standard");
 

  const toggleMapType = () => {
    setMapType(mapType === "standard" ? "satellite" : "standard");
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.container}>

      <MapView 
      style={styles.map}
      provider={PROVIDER_GOOGLE} // Needed for Google Maps
      mapType={mapType} 
      /> 


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
        />
        <View style={styles.profileIconContainer}>
          <MaterialIcons name="account-circle" size={45} color="#007BFF" />
        </View>
      </View>


      <TouchableOpacity style={styles.button1} onPress={toggleMapType}>
        <Text style={styles.buttonText}>
          {mapType === "standard" ? "Satellite" : "Standard"}
        </Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
    bottom: 100,
    left: 20,
  },
  buttonText: {
    fontSize: 16,
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
