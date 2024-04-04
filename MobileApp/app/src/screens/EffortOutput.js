import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    IconButton,
  } from "react-native";
  import React, { useState, useEffect } from 'react';
  import {
    PaperProvider,
    Appbar,
    Card,
    Button,
    Searchbar,
    placeholderStyle,
  } from "react-native-paper";
  import { useNavigation } from "@react-navigation/native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  
  import * as Print from 'expo-print';
  import { shareAsync } from 'expo-sharing';
  import Headersection from "../components/Headersection";
  import AlertButton from "../components/AlertButton";
  import CustomButton from "../components/CustomButton";
  import axios from "axios";
  
  export default function EffortOutput({ route }) {
    const { laborCount,workHours,machineCount,plantCount,stonesCount } = route.params;
   
    const [searchItems] = useState();
    //get data
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://10.10.0.153:5000/api/clearLand/latestClearLand");
                setLatestData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    //Generate pdf
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
                /* font-family: Product Sans; / / You need to import Product Sans if it's a custom font */
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
  
            <h2>Clear land Details</h2>
  
            <ul>
            <li> Total Effort Count= </li>
            
            <li> Number of labours = </li>
            <li> Fertilizer Type =  </li>
            
            </ul>
  
        </div>
    </body>
    </html>
    
  `;
  
       /print/
  
       const [selectedPrinter, setSelectedPrinter] = React.useState();
  
       const print = async () => {
         // On iOS/android prints the given html. On web prints the HTML from the current page.
         await Print.printAsync({
           html,
           printerUrl: selectedPrinter?.url, // iOS only
         });
       };
     
       const printToFile = async () => {
         // On iOS/android prints the given html. On web prints the HTML from the current page.
         const { uri } = await Print.printToFileAsync({ html });
         console.log('File has been saved to:', uri);
         await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
       };
     
       const selectPrinter = async () => {
         const printer = await Print.selectPrinterAsync(); // iOS only
         setSelectedPrinter(printer);
       };
    const navigation = useNavigation();
    return (
      <PaperProvider>
        <Headersection
          navigation={navigation}
          title="Effort Output"
        ></Headersection>
  
        <ScrollView>
          <AlertButton></AlertButton>
          <View style={styles.container2}>
            <Card style={styles.card1}>
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: -5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 2,
                    marginLeft: 80,
                  }}
                >
                  Total Effort Cout
                </Text>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    style={{ marginLeft: 20, marginTop: 30 }}
                    source={require("../../assets/Clock.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ marginTop: 25, fontSize: 15, marginLeft: 5 }}>
                      Total Hours
                    </Text>
                    <Text
                      style={{ fontSize: 15, marginLeft: 5, fontWeight: "bold" }}
                    >
                      3456 hrs
                    </Text>
                  </View>
                </View>
  
                <View
                  style={{ display: "flex", flexDirection: "row", height: 20 }}
                >
                  <Image
                    style={{ marginLeft: 170, marginTop: -35 }}
                    source={require("../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ marginTop: -40, fontSize: 15, marginLeft: 0 }}>
                      {/* getting work hours from db */}
                    {latestData && (
                <Text>
                    {latestData.WorkHoursCount}
                </Text>
            )} hrs per day
                    </Text>
                    <Text
                      style={{ fontSize: 15, marginLeft: 5, fontWeight: "bold" }}
                    >
                      432 days
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <Card style={styles.card2}>
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "colum",
                  marginTop: -25,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    style={{ marginLeft: 20, marginTop: 30 }}
                    source={require("../../assets/Perimeter.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ marginTop: 25, fontSize: 15, marginLeft: 5 }}>
                      Perimeter
                    </Text>
                    <Text
                      style={{ fontSize: 15, marginLeft: 5, fontWeight: "bold" }}
                    >
                      1.5km
                    </Text>
                  </View>
                </View>
  
                <View
                  style={{ display: "flex", flexDirection: "row", height: 20 }}
                >
                  <Image
                    style={{ marginLeft: 170, marginTop: -35 }}
                    source={require("../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ marginTop: -40, fontSize: 15, marginLeft: 5 }}>
                      Area
                    </Text>
                    <Text
                      style={{ fontSize: 15, marginLeft: 5, fontWeight: "bold" }}
                    >
                      100 acres
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <Card style={styles.card3}>
              <Card.Content
                style={{ display: "flex", flexDirection: "colum", marginTop: -5 }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 20,
                    marginLeft: 20,
                  }}
                >
                  Result Based on
                </Text>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                <MaterialCommunityIcons
                    name="account-hard-hat"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={30}
                  />
  
                  <Text
                    style={{
                      marginTop: 30,
                      fontSize: 15,
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Labors :
                  </Text>
                  <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 30 }}>
                    {/* get labourCount from db */}
                    {latestData && (
                <Text>
                    {latestData.LaborsCOunt}
                </Text>
            )}
                  </Text>
                </View>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                <MaterialCommunityIcons
                    name="excavator"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={38}
                  />
                  <View style={{ marginTop: 38 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 5,
                        fontWeight: "bold",
                      }}
                    >
                      Machinery :
                    </Text>
  
                    <View style={{ marginTop: -19, marginLeft: 100 }}>
                      {/* get Machine Details from db */}
                    {latestData && (
                    <Text>
                    {latestData.MachineDetails.join("\n")} {"\n"}
                </Text>
                     )}
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
   
          <View style={{ display: "flex", flexDirection: "column", marginTop: 90,justifyContent:"space-between" }}>
            <CustomButton
                onPress={print}
                text="Save As PDF"
                iconName="content-save-outline" // Change the icon name as needed
                iconColor="white" // Change the color of the icon
                buttonColor="#E41E3F" // Change the background color of the button
              />
  
            <CustomButton
                onPress={printToFile}
                text="Share PDF"
                iconName="share-variant" // Change the icon name as needed
                iconColor="white" // Change the color of the icon
                buttonColor="#007BFF" // Change the background color of the button
              />
          </View>
        </View>
        </ScrollView>
      </PaperProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card1: {
      height: 123,
      width: "87%",
      borderRadius: 11,
      backgroundColor: "#fff",
    },
    card2: {
      height: 74,
      marginTop: 10,
      backgroundColor: "#fff",
      width: 337,
      borderRadius: 11,
    },
    card3: {
      height: 245,
      width: "87%",
      borderRadius: 11,
      backgroundColor: "#fff",
  
      marginTop: 10,
    },
    calButtton: {
      justifyContent: "center",
      borderRadius: 11,
      width: "87%",
      height: 40,
  
      marginTop: 80,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });