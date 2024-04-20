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
  import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions";
  import axios from "axios";
  
  export default function EffortOutput({ route }) {
    const { laborCount,workHours,machineCount,plantCount,stonesCount } = route.params;
   
    const [searchItems] = useState();
    //get data
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.8.173:5000/api/clearLand/latestClearLand");
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
                style={styles.card1Content}
              >
                <Text
                  style={styles.card1Text1}
                >
                  Total Effort Cout
                </Text>
  
                <View style={styles.card1Left}>
                  <Image
                    style={{marginLeft:responsiveWidth(2),marginTop:responsiveHeight(0.8) }}
                    source={require("../../assets/Clock.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text2}>
                      Total Hours
                    </Text>
                    <Text
                      style={styles.card1Text3}
                    >
                      3456 hrs
                    </Text>
                  </View>
                </View>
  
                <View
                  style={styles.card1Right}
                >
                  <Image
                    style={{ marginLeft: responsiveWidth(45), marginTop: responsiveHeight(-5) }}
                    source={require("../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text4}>
                      {/* getting work hours from db */}
                    {latestData && (
                <Text>
                    {latestData.WorkHoursCount}
                </Text>
            )} hrs per day
                    </Text>
                    <Text
                      style={styles.card1Text5}
                    >
                      432 days
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <Card style={styles.card2}>
              <Card.Content
                style={styles.card2Content}
              >
                <View style={styles.card2Left}>
                  <Image
                    style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(4.5) }}
                    source={require("../../assets/Perimeter.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text1}>
                      Perimeter
                    </Text>
                    <Text
                      style={styles.card2Text2}
                    >
                      1.5km
                    </Text>
                  </View>
                </View>
  
                <View
                  style={styles.card2Right}
                >
                  <Image
                    style={{ marginLeft: responsiveWidth(50), marginTop: responsiveHeight(-5) }}
                    source={require("../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text3}>
                      Area
                    </Text>
                    <Text
                      style={styles.card2Text4}
                    >
                      100 acres
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <Card style={styles.card3}>
              <Card.Content
                style={{ display: "flex", flexDirection: "colum"}}
              >
                <Text
                  style={styles.card3Text1}
                >
                  Result Based on
                </Text>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                <MaterialCommunityIcons
                    name="account-hard-hat"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={23}
                  />
  
                  <Text
                    style={styles.card3Text2}
                  >
                    Labors :
                  </Text>
                  <Text style={styles.card3Text3}>
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
                    marginTop={24}
                  />
                  <View style={{ marginTop: responsiveHeight(3.5) }}>
                    <Text
                      style={styles.card3Text4}
                    >
                      Machinery :
                    </Text>
  
                    <View style={{ marginTop: responsiveHeight(-2.7), marginLeft: responsiveWidth(25) }}>
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
   
          <View style={styles.customButtons}>
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
      height: responsiveHeight(15),
      width: "87%",
      borderRadius: 11,
      backgroundColor: "#fff",
    },
    card1Content: {
      display: "flex",
      flexDirection: "column",
      marginTop: responsiveHeight(0.1),
    },
    card1Text1: {
      fontWeight: "bold",
      fontSize: responsiveFontSize(2.2),
      marginTop: responsiveHeight(-1),
      textAlign: "center",
    },
    card1Text2: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1)
    },
    card1Text3: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1), 
      fontWeight: "bold"
    },
    card1Text4: {
      marginTop: responsiveHeight(-5.9), 
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(0)
    },
    card1Text5: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1.2), 
      fontWeight: "bold"
    },
    card1Left: {
      display: "flex", 
      flexDirection: "row",
      marginTop: responsiveHeight(3)
    },
    card1Right: {
      display: "flex", 
      flexDirection: "row", 
      height: responsiveHeight(2.9)
    },
    card2: {
      height: responsiveHeight(10),
      marginTop: responsiveHeight(1.5),
      backgroundColor: "#fff",
      width: "93%",
      borderRadius: 11,
    },
    card2Content: {
      display: "flex",
      flexDirection: "column",
      marginTop: responsiveHeight(-3.6),
    },
    card2Left: { display: "flex", 
    flexDirection: "row"
    },
    card2Right: { 
      display: "flex", 
      flexDirection: "row", 
      height: responsiveHeight(3), 
      alignItems:"right"
    },
    card2Text1: {
      marginTop: responsiveHeight(3.8), 
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1)
    },
    card2Text2: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1) , 
      fontWeight: "bold"
    },
    card2Text3: {
      marginTop: responsiveHeight(-5.7), 
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1)
    },
    card2Text4: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(1) , 
      fontWeight: "bold"
    },
    card3: {
      height: "max-content",
      width: "87%",
      borderRadius: 11,
      backgroundColor: "#fff",
      marginTop: responsiveHeight(1.5),
    },
    card3Text1: {
      fontWeight: "bold",
      fontSize: responsiveFontSize(2.2),
      marginTop: responsiveHeight(0),
      marginLeft: responsiveWidth(3),
    },
    card3Text2: {
      marginTop: responsiveHeight(3),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    card3Text3: {
      fontSize: responsiveFontSize(2), 
      marginLeft: responsiveWidth(2), 
      marginTop: responsiveHeight(3)
    },
    card3Text4: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    customButtons: {
      display: "flex", 
      flexDirection: "column", 
      marginTop: responsiveHeight(3),
      justifyContent:"space-between"
    },
  });