import React, { useState, useCallback } from "react";
import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,  // Import ActivityIndicator
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Appbar, Button } from "react-native-paper";

import { styles } from "./FenceDetailsStyles";
import AxiosInstance from "../../../AxiosInstance";
import { getFenceDetailsHtml } from "./fenceDetailPrint";
import { getFenceDetailsHtml } from "./fenceDetailPrint";

export default function FenceDetails({ route }) {
  const navigation = useNavigation();

  const { id, item } = route.params;
  const [numberOfSticks, setNumberOfSticks] = useState(null);
  const [fenceType, setFenceType] = useState(null);
  const [postSpace, setPostSpace] = useState(null);
  const [postSpaceUnit, setPostSpaceUnit] = useState(null);
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch data from database
  const fetchData = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/fence/numberOfSticks/${id}`
      );
      setNumberOfSticks(response.data.numberOfSticks);
      setFenceType(response.data.fenceType);
      setPostSpace(response.data.postSpace);
      setPostSpaceUnit(response.data.postSpaceUnit);
      setArea(response.data.Area);
      setPerimeter(response.data.Perimeter);
      setData1(response.data.gateDetails);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Refresh the screen
  useFocusEffect(
    useCallback(() => {
      fetchData(id);
    }, [id])
  );

  // Delete Fence model from the database
  const fenceDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/fence/deleteFence/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      // Log the detailed error response
      console.error(
        "Error deleting fence:",
        error.response ? error.response.data : error.message
      );
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  // Edit button pressed function

  // Edit button pressed function
  const handleIconPress = () => {
    Alert.alert(
      "Update Data",
      "Do you want to update data?",
      [
        {
          text: "No",
          onPress: () => console.log("No pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await fenceDelete(id);
              // Alert.alert('Success', 'Fence deleted successfully.');
              navigation.navigate("Fence", {
                id: id,
                Area: area,
                Perimeter: perimeter,
                item: item,
              });
            } catch (error) {
              // Show detailed error message
              const errorMessage = error.response
                ? error.response.data.message
                : error.message;
              Alert.alert("Error", `Failed to delete fence: ${errorMessage}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Back to home function
  const backToHome = () => {
    navigation.navigate("Home");
  };

  // HTML file to be printed
  const html = getFenceDetailsHtml(
    fenceType,
    numberOfSticks,
    postSpace,
    postSpaceUnit,
    data1
  );

  // Print
  const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/* Header section */}
      <Headersection navigation={navigation} title="Fence Details" />

      {loading ? (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
        <ActivityIndicator 
           color="#007BFF" 
           size={45} 
           />
      </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.top}>
            <View style={styles.topSection}>
              <TouchableOpacity style={styles.iconButton} onPress={backToHome}>
                <MaterialCommunityIcons name="home" size={26} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleIconPress}>
                <MaterialCommunityIcons name="square-edit-outline" size={26} color="#007BFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.box1}>
              <Text style={styles.titleText}>Total posts / Sticks</Text>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons name="format-align-justify" size={36} color="#65676B" rotation={270} />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Total Amount</Text>
                    <Text style={styles.propertyValue}>{numberOfSticks} Stick</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons name="format-line-spacing" size={36} color="#65676B" rotation={270} />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Post Gap</Text>
                    <Text style={styles.propertyValue}>{postSpace} {postSpaceUnit}{" "}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Second section */}
            <View style={styles.box2}>
              <View style={styles.box2Property}>
                <MaterialCommunityIcons name="vector-square" size={36} color="#65676B" />
                <View style={styles.box2PropertyDetails}>
                  <Text style={styles.box2PropertyLabel}>Perimeter</Text>
                  <Text style={styles.box2PropertyValue}>{perimeter} km</Text>
                </View>
              </View>
              <View style={styles.box2Property}>
                <MaterialCommunityIcons name="texture-box" size={36} color="#65676B" />
                <View style={styles.box2PropertyDetails}>
                  <Text style={styles.box2PropertyLabel}>Area</Text>
                  <Text style={styles.box2PropertyValue}>{area} perches</Text>
                </View>
              </View>
            </View>

            {/* Third section */}
            <View style={styles.box3}>
              <Text style={styles.innertopText}>Result based on</Text>
            {/* Third section */}
            <View style={styles.box3}>
              <Text style={styles.innertopText}>Result based on</Text>

              <View style={styles.innercenter}>
                <View style={styles.innersquareleft}>
                  <MaterialCommunityIcons name="gate" size={36} color="#65676B" />
                  <Text style={styles.perimeterText}>Fence Type :</Text>
                </View>
                <View style={styles.innersquareright}>
                  <Text style={styles.perimeterText}>{fenceType}</Text>
                </View>
              </View>

              <View style={styles.innercenter}>
                <View style={styles.innersquareleft}>
                  <MaterialCommunityIcons name="boom-gate" size={36} color="#65676B" />
                  <Text style={styles.perimeterText}>Gates :</Text>
                </View>
                <View style={styles.innersquareright1}>
                  {data1.map((value, index) => (
                    <Text key={index}>{value}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Bottom section */}
          <View style={styles.bottom}>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{
                    height: 40,
                    marginTop: 10,
                    borderRadius: 18,
                    borderColor: "red", // Add this line for the border color
                    borderWidth: 1, // Ensure the border is visible by setting the borderWidth
                  }}
                  mode="elevated"
                  onPress={print}
                  labelStyle={{ color: "red", fontSize: 14 }}
                  icon={() => (
                    <MaterialCommunityIcons
                      name="content-save-outline"
                      size={20}
                      color="red"
                    />
                  )}
                >
                  Save As PDF
                </Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{
                    height: 40,
                    marginTop: 10,
                    borderRadius: 18,
                    borderColor: "#007BFF", // Add this line for the border color
                    borderWidth: 1, // Ensure the border is visible by setting the borderWidth
                  }}
                  mode="elevated"
                  onPress={printToFile}
                  labelStyle={{ color: "#007BFF", fontSize: 14 }}
                  icon={() => (
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={20}
                      color="#007BFF"
                    />
                  )}
                >
                 Share PDF
                </Button>
              </View>
            </View>
            <Button
              style={{
                height: 40,
                marginTop: 15,
                borderRadius: 18,
                width: "87%",
                borderColor: "#007BFF", // Add this line for the border color
                borderWidth: 0.2, // Ensure the border is visible by setting the borderWidth
              }}
              mode="contained-tonal"
              onPress={backToHome}
              labelStyle={{  fontSize: 14 , color:"white" }}
              icon={() => (
                <MaterialCommunityIcons
                  name="home-import-outline"
                  size={20}
                  color="white"
                />
              )}
            >
              Back To Home
            </Button>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
