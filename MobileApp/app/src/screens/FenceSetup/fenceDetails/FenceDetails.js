import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import axios from "axios";

import { styles } from "./FenceDetailsStyles";
import Headersection from "../../../components/Headersection";
import CustomButton from "../../../components/CustomButton";
import AxiosInstance from "../../../AxiosInstance";

export default function FenceDetails({ route }) {
  const navigation = useNavigation();
  const { fenceType, postSpace, PostSpaceUnit, data,Area,Perimeter } = route.params;
  const [numberOfSticks, setnumberOfSticks] = useState(null);

  // get number of Sticks from  database
  useEffect(() => {
    const fetchData = async () => {
      
        AxiosInstance.get("/api/fence/numberOfSticks")
        .then((response) => {
          setnumberOfSticks(response.data.data);
        })
        
      .catch((error) => {
        console.error(error);
      })
    };
    fetchData();
  }, []);

// html file to be printed
const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Details</title>
      <style>
          body {
              /* font-family: Arial, sans-serif; */
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 800px;
              margin: 10px auto;
              padding: 20px;
              border: 5px solid #ccc;
          }
  
          .logo-container {
              display: flex;
              align-items: center;
              background-color: #fff;
          }
  
          .App-logo {
              margin-left: 5px;
          }
  
          .logo-text {
              margin-left: 70px;
              margin-top: 40px;
              color: #007BFF;
              font-size: 40px;
              /* font-family: Product Sans; */ /* You need to import Product Sans if it's a custom font */
              font-family: sans-serif; /* Fallback font */
          }

          Description-text1 {
            margin-top: 50px;
          }
  
          .Description-text {
              width: 100%;
              border-radius: 12px; /* Corrected typo */
          }
  
          .logo {
              max-width: 150px;
              margin-bottom: 20px;
          }
          h1, p {
              margin: 10px 0;
        
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo-container">
              <img class="App-logo" src="https://s3-alpha-sig.figma.com/img/0402/a49c/79d6086f4997c8eeba9d160fa7b869ed?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bT1vIy5S2dJUVkDABMFzScUJX5Iws21riRotOmacpZl1bhA8yPqJLJNeF5-wc8kBpk4jyD81fp-8bBYVTVwO6cplKgVuos2HMwvvf3vA5yh0td6H5z5AqoKTIcV8sy6pPF9DsiJmzHLRn5QjfYk~o8ow0bxsqErV5jJfH1S4~4yDdn6O54pXqPBjgydtWdDEhlCUXmzQo1ZozcGTapshAhnzm3YNdYd5leb1AwnPhuURNJ7YO80jOE3QN3pqNxv2XESHYnKDOilaPqvuVKVTyG3AV2mxdnyg-U8iEkRBgQJNDH0YjrWMKTRb3GatXSa5KVA9zQDL5JLoTn9DOvqa-Q__" alt="Your App Logo" class="logo" width="130">
              <h1 class="logo-text">Field Master</h1>
          </div>
          <h2 class="Description-text1">Description</h2>
          <div class="Description-text">
              <p>Welcome to FieldMaster, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
          </div>
          <h2>Map Information</h2>
          <ul>
              <li>Perimeter = 1.5 km</li>
              <li>Area = 100 accres</li>
          </ul>

          <h2>Fence Details</h2>

          <ul>
          <li>Fence Typpe = ${fenceType}</li>
          
          <li> Total Stick Amount = ${numberOfSticks}</li>
          <li> Post Space = ${postSpace} ${PostSpaceUnit}</li>
          <!-- Loop through the 'data' array and generate list items -->
          <li> Gate values  <ul>
          ${data.map((value) => `<li>${value}</li>`).join("")}
          </ul></li>
          
          </ul>

      </div>
  </body>
  </html>
  
  

`;

  /*print*/
  const [selectedPrinter, setSelectedPrinter] = React.useState();

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

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/*Header section*/}
      <Headersection navigation={navigation} title="Fence Details" />

      {/* Top section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.top}>
          <View style={styles.box1}>
            <Text style={styles.titleText}>Total posts / Sticks</Text>
            <View style={styles.propertyBox}>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="format-align-justify"
                  size={36}
                  color="#65676B"
                  rotation={270}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Total Amount</Text>
                  <Text style={styles.propertyValue}>
                    {numberOfSticks} Stick
                  </Text>
                </View>
              </View>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="format-line-spacing"
                  size={36}
                  color="#65676B"
                  rotation={270}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Post Gap</Text>
                  <Text style={styles.propertyValue}>
                    {postSpace} {PostSpaceUnit}{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.box2}>
            <View style={styles.box2Property}>
              <MaterialCommunityIcons
                name="vector-square"
                size={36}
                color="#65676B"
              />
              <View style={styles.box2PropertyDetails}>
                <Text style={styles.Box2PropertyLabel}>Perimeter</Text>
                <Text style={styles.Box2PropertyValue}>{Perimeter} km</Text>
              </View>
            </View>
            <View style={styles.box2Property}>
              <MaterialCommunityIcons
                name="texture-box"
                size={36}
                color="#65676B"
              />
              <View style={styles.box2PropertyDetails}>
                <Text style={styles.Box2PropertyLabel}>Area</Text>
                <Text style={styles.Box2PropertyValue}>{Area} perches</Text>
              </View>
            </View>
          </View>

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
                <MaterialCommunityIcons
                  name="boom-gate"
                  size={36}
                  color="#65676B"
                />
                <Text style={styles.perimeterText}>Gates           :</Text>
              </View>
              <View style={styles.innersquareright1}>
                {data.map((value, index) => (
                  <Text key={index}>{value}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>
          <CustomButton
            onPress={print}
            text="Save a PDF"
            iconName="content-save-outline"
            iconColor="white" 
            buttonColor="#E41E3F"
          />

          <CustomButton
            onPress={printToFile}
            text="Share As PDF"
            iconName="share-variant"
            iconColor="white" 
            buttonColor="#007BFF" 
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

