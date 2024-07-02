import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  PaperProvider,
  Appbar,
  Card,
  Button,
  Searchbar,
  placeholderStyle,
} from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { styles } from "./EffortOutputStyles";
import Headersection from "../../components/Headersection";
import AlertButton from "../../components/AlertButton";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import AxiosInstance from "../../AxiosInstance";
import { effortOutputPrint } from "./EffortOutputPrint";

export default function EffortOutput({ route }) {
  const navigation = useNavigation();

  const { id, item } = route.params;
  const [workHours, setworkHours] = useState(null);
  const [laborCount, setlaborCount] = useState(null);
  const [data1, setdata1] = useState([]);
  const [Area, setArea] = useState(null);
  const [Perimeter, setPerimeter] = useState(null);
  const [effortOutput, setEffortOutput] = useState(null);
  const [workDays, setWorkDays] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  //Fetch data from database
  const fetchData = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/clearLand/effortOutput/${id}`
      );
      setworkHours(response.data.workHours);
      setlaborCount(response.data.laborCount);
      setdata1(response.data.machineDetails);
      setArea(response.data.Area);
      setPerimeter(response.data.Perimeter);
      setEffortOutput(response.data.effortOutput);
      setWorkDays(response.data.workDays);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //Refresh the screen
  useFocusEffect(
    useCallback(() => {
      fetchData(id);
    }, [id])
  );

  //delete clear land model from the database
  const ClearLandDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/clearLand/deleteClearLand/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      //log the detailed error response
      console.error(
        "Error deleting clear land:",
        error.response ? error.response.data : error.message
      );
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  //edit button pressed function
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
              await ClearLandDelete(id);
              navigation.navigate("Clearland", {
                id: id,
                Area: Area,
                Perimeter: Perimeter,
                item: item,
              });
            } catch (error) {
              const errorMessage = error.response
                ? error.response.data.message
                : error.message;
              Alert.alert(
                "Error",
                `Failed to delete clear land: ${errorMessage}`
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  //back to home function
  const backToHome = () => {
    navigation.navigate("Home");
  };

  //Generate pdf
  const html = effortOutputPrint(Perimeter, Area, laborCount, workHours);

  // Print
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
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <PaperProvider>
      

<Appbar.Header style={styles.top_Bar} dark={true} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
            color = "white";
          }}
        />

        <Text style={styles.headerText}>Effort Output</Text>

        {/* pencil/ pen icon  */}
        <TouchableOpacity onPress={handleIconPress}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={23}
            color="white"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      </Appbar.Header>

      {loading ? (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            <ActivityIndicator color="#007BFF" size={45} />
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container2}>
            <Card style={styles.card1}>
              <Card.Content style={styles.card1Content}>
                <Text style={styles.card1Text1}>Total Effort Cout</Text>
                <AlertButton></AlertButton>
                <View style={styles.card1Left}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(1.6),
                      marginTop: responsiveHeight(0.4),
                    }}
                    source={require("../../../assets/Clock.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text2}>Total Hours</Text>
                    <Text style={styles.card1Text3}>{effortOutput}</Text>
                  </View>
                </View>

                <View style={styles.card1Right}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(45),
                      marginTop: responsiveHeight(-5),
                    }}
                    source={require("../../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text4}>
                      {workHours} hrs per day
                    </Text>
                    <Text style={styles.card1Text5}>{workDays} days</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card2}>
              <Card.Content style={styles.card2Content}>
                <View style={styles.card2Left}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(3),
                      marginTop: responsiveHeight(4.5),
                    }}
                    source={require("../../../assets/Perimeter.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text1}>Perimeter</Text>
                    <Text style={styles.card2Text2}>{Perimeter} km</Text>
                  </View>
                </View>

                <View style={styles.card2Right}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(50),
                      marginTop: responsiveHeight(-5),
                    }}
                    source={require("../../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text3}>Area</Text>
                    <Text style={styles.card2Text4}>{Area} perches</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card3}>
              <Card.Content style={{ display: "flex", flexDirection: "colum" }}>
                <Text style={styles.card3Text1}>Result Based on</Text>

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="account-hard-hat"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={23}
                  />

                  <Text style={styles.card3Text2}>Labors :</Text>
                  <Text style={styles.card3Text3}>{laborCount}</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="excavator"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={24}
                  />
                  <View style={{ marginTop: responsiveHeight(3) }}>
                    <Text style={styles.card3Text4}>Machinery :</Text>

                    <View
                      style={{
                        marginTop: responsiveHeight(-2.7),
                        marginLeft: responsiveWidth(25),
                      }}
                    >
                      {data1.map((machine, index) => (
                        <Text key={index}>{machine}</Text>
                      ))}
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
            </View>
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
                marginTop: 10,
                borderRadius: 18,
                width: "87%",
                borderColor: "black", // Add this line for the border color
                borderWidth: 0.2, // Ensure the border is visible by setting the borderWidth
              }}
              mode="contained-tonal"
              onPress={backToHome}
              labelStyle={{  fontSize: 14 }}
              icon={() => (
                <MaterialCommunityIcons
                  name="home-import-outline"
                  size={20}
                  color="black"
                />
              )}
            >
              Back To Home
            </Button>
          </View>
          
        </ScrollView>
      )}
    </PaperProvider>
  );
}
