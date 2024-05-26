import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  PaperProvider,
  Appbar,
  Card,
  Button,
  Searchbar,
  placeholderStyle,
  TextInput,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import AxiosInstance from "../../AxiosInstance";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function ClearLand() {
  const [text, setText] = React.useState("");

  const [pressed, setPressed] = useState(null);
  const [plantTypeSelectedValue, setPlantTypeSelectedValue] = useState(null);
  const [plantCount, setPlantCount] = useState("");
  const [stoneTypeSelectedValue, setStoneTypeSelectedValue] = useState(null);
  const [stonesCount, setStonesCount] = useState("");
  const [laborCount, setLaborCount] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [machineCount, setMachineCount] = useState("");
  const navigation = useNavigation();

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "Bulldozers",
    "Excavators",
    "Backhoes",
    "Skid-steer loaders",
    "Chainsaws",
    "Brush cutters",
    "Tractors",
    "Land clearing rakes",
  ]);

  const handleSearch = (query) => {
    if (query === "") {
      setSearchSuggestions([]);
      return;
    }
    const filteredSuggestions = suggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchSuggestions(filteredSuggestions);
  };

  const handleSuggestionSelect = (item) => {
    setSearchItem(item);
    setSearchSuggestions([]);
  };

  const handlePlantCountChange = (text) => {
    setPlantCount(text);
  };

  const handleStoneCountChange = (text) => {
    setStonesCount(text);
  };
  const handleLaborCountChange = (text) => {
    setLaborCount(text);
  };
  const handleWorkHourChange = (text) => {
    setWorkHours(text);
  };
  const handleMachineCountChange = (text) => {
    setMachineCount(text);
  };

  const handleEffortOutput = () => {
    navigation.navigate("EffortOutput");
  };

  const placeholder1 = {
    label: "Select Type",
    value: null,
    color: "red",
  };

  const options1 = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  const placeholder = {
    label: "Select Type",
    value: null,
    color: "red",
  };

  const options = [
    { label: "Small", value: "Small" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  /display/;

  const [displayValues, setDisplayValues] = useState([]);

  const handleAdd = () => {
    //Validation plant count
    let errorMessage = "";
    let countInt = parseInt(plantCount, 10);

    switch (plantTypeSelectedValue) {
      case "Low":
        if (!(countInt >= 1 && countInt <= 3)) {
          errorMessage = "Enter a number between 0 and 4";
        }
        break;
      case "Medium":
        if (!(countInt > 3 && countInt <= 6)) {
          errorMessage = "Enter a number between 3 and 7";
        }
        break;
      case "High":
        if (!(countInt > 6 && countInt <= 10)) {
          errorMessage = "Enter a number between 6 and 11";
        }
        break;
      default:
        errorMessage = "Invalid plant type selection.";
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    //validation part Add button
    const combinedValue = plantCount + " x " + plantTypeSelectedValue;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setPlantTypeSelectedValue("");
    setPlantCount("");
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const [displayValues1, setDisplayValues1] = useState([]);

  const handleAdd1 = () => {
    //Validation for stone count
    let errorMessage = "";
    let countInt = parseInt(stonesCount, 10);

    switch (stoneTypeSelectedValue) {
      case "Small":
        if (!(countInt >= 1 && countInt <= 3)) {
          errorMessage = "Enter a number between 0 and 4";
        }
        break;
      case "Medium":
        if (!(countInt > 3 && countInt <= 6)) {
          errorMessage = "Enter a number between 3 and 7";
        }
        break;
      case "High":
        if (!(countInt > 6 && countInt <= 10)) {
          errorMessage = "Enter a number between 6 and 11";
        }
        break;
      default:
        errorMessage = "Invalid plant type selection.";
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    //validation part Add button
    const combinedValue1 = stonesCount + " x " + stoneTypeSelectedValue;
    const newDisplayValues1 = [...displayValues1, combinedValue1].filter(
      Boolean
    );
    setDisplayValues1(newDisplayValues1);
    setStoneTypeSelectedValue("");
    setStonesCount("");
  };

  const handleRemoveValue1 = (index) => {
    const newDisplayValues1 = [...displayValues1];
    newDisplayValues1.splice(index, 1);
    setDisplayValues1(newDisplayValues1);
  };

  const [displayValues2, setDisplayValues2] = useState([]);

  const handleAdd2 = () => {
    //validation part Add button

    const combinedValue2 = searchItem + " x " + machineCount;
    const newDisplayValues2 = [...displayValues2, combinedValue2].filter(
      Boolean
    );
    setDisplayValues2(newDisplayValues2);
    setSearchItem("");
    setMachineCount("");
  };

  const handleRemoveValue2 = (index) => {
    const newDisplayValues2 = [...displayValues2];
    newDisplayValues2.splice(index, 1);
    setDisplayValues2(newDisplayValues2);
  };

  const handleClear = async () => {
    AxiosInstance.post("/api/clearLand/clearLand", {
      pressed,
      plantTypeSelectedValue,
      plantCount,
      displayValues,
      stoneTypeSelectedValue,
      stonesCount,
      displayValues1,
      laborCount,
      workHours,
      searchItem,
      machineCount,
      displayValues2,
    })
      .then((response) => {
        if (
          !pressed ||
          !(displayValues.length > 0) ||
          !(displayValues1.length > 0) ||
          !laborCount ||
          !workHours ||
          !(displayValues2.length > 0)
        ) {
          // Display error message
          Alert.alert("Error", "Please fill in all fields");
          return; // Stop execution if fields are empty
        }
        navigation.navigate("EffortOutput", {
          data: displayValues,
          data1: displayValues1,
          data2: displayValues2,
          weedType: pressed,
          plantType: plantTypeSelectedValue,
          plantCount: plantCount,
          stoneType: stoneTypeSelectedValue,
          stonesCount: stonesCount,
          laborCount: laborCount,
          workHours: workHours,
          machineCount: machineCount,
        });

        setPressed(" ");
        setLaborCount(" ");
        setWorkHours(" ");
        setDisplayValues([]);
        setDisplayValues1([]);
        setDisplayValues2([]);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        Alert.alert("Error", "Something went wrong");
      });
  };

  return (
    <PaperProvider>
      {/* Status bar section */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      <Headersection navigation={navigation} title="Clear Land"></Headersection>

      {/* ScrollView section */}
      <ScrollView>
        <View style={styles.container2}>
          {/* Weeds box */}
          <Card style={styles.card1}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons
                name="sprout-outline"
                size={responsiveFontSize(3)}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Weeds
              </Text>
              <PaperProvider>
                <View style={styles.weedButton}>
                  <Button
                    style={[
                      styles.button,
                      pressed === "low" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "low" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("low")}
                  >
                    Low
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "medium" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "medium" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "high" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "high" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("high")}
                  >
                    High
                  </Button>
                </View>
              </PaperProvider>
            </Card.Content>
          </Card>

          {/* Plants box */}
          <Card style={styles.card1}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons
                name="sprout"
                size={responsiveFontSize(3)}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Plants
              </Text>
              <View style={styles.Dropdown1}>
                <RNPickerSelect
                  placeholder={placeholder1}
                  items={options1}
                  onValueChange={(value) => setPlantTypeSelectedValue(value)}
                  value={plantTypeSelectedValue}
                  style={{ cursor: "pointer" }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: responsiveHeight(3.5),
                }}
              >
                <Text style={styles.countText}>
                  Count :{" "}
                  <View style={{ marginTop: -1 }}>
                    <TextInput
                      style={{
                        backgroundColor: "transparent",
                        height: 20,
                        paddingHorizontal: 0,
                        width: 40,
                      }}
                      keyboardType="numeric"
                      placeholder="Count"
                      placeholderStyles={{ width: 40, paddingHorizontal: 3 }}
                      mode="flat"
                      value={plantCount}
                      onChangeText={handlePlantCountChange}
                      placeholderTextColor={"#838383"}
                      underlineStyle={{ width: 45, marginLeft: 3 }}
                    />
                  </View>
                </Text>
              </View>

              <Button
                style={styles.addButton}
                labelStyle={styles.addButtonText}
                buttonColor="#007BFF"
                mode="contained-tonal"
                onPress={handleAdd}
              >
                Add
              </Button>
            </Card.Content>

            {/* Display values */}
            <View style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={responsiveFontSize(2.7)}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Stones box */}
          <Card style={styles.card1}>
            <Card.Content style={styles.cardContent}>
              <Image source={require("../../../assets/Stones.png")} />
              <Text style={styles.cardTopText} variant="titleLarge">
                Stones
              </Text>
              <View style={styles.Dropdown1}>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={options}
                  onValueChange={(value) => setStoneTypeSelectedValue(value)}
                  value={stoneTypeSelectedValue}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: responsiveHeight(3.5),
                }}
              >
                <Text style={styles.countText}>
                  Count :{" "}
                  <View style={{ marginTop: -1 }}>
                    <TextInput
                      style={{
                        backgroundColor: "transparent",
                        height: 20,
                        paddingHorizontal: 3,
                        width: 40,
                      }}
                      keyboardType="numeric"
                      placeholder="Count"
                      placeholderStyles={{ width: 40, paddingHorizontal: 3 }}
                      mode="flat"
                      value={stonesCount}
                      onChangeText={handleStoneCountChange}
                      placeholderTextColor={"#838383"}
                      underlineStyle={{ width: 45, marginLeft: 5 }}
                    />
                  </View>
                </Text>
              </View>

              <Button
                style={styles.addButton}
                labelStyle={styles.addButtonText}
                buttonColor="#007BFF"
                mode="contained-tonal"
                onPress={handleAdd1}
              >
                Add
              </Button>
            </Card.Content>

            {/* Display values */}
            <View style={styles.displayValuesContainer}>
              {displayValues1.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue1(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Labors box */}
          <Card style={styles.card2}>
            <Card.Content style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="account-hard-hat"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Labors :
              </Text>
              <View style={{ marginTop: -5 }}>
                <TextInput
                  style={{
                    backgroundColor: "transparent",
                    height: 24,
                    width: 200,
                    fontSize: 16,
                    paddingHorizontal: 8,
                  }}
                  keyboardType="numeric"
                  placeholder="Enter count of Labors"
                  mode="flat"
                  onChangeText={handleLaborCountChange}
                  value={laborCount}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 157, marginLeft: 7 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Work hours box */}
          <Card style={styles.card2}>
            <Card.Content style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Work Hours :
              </Text>
              <View style={{ marginTop: -5 }}>
                <TextInput
                  style={{
                    backgroundColor: "transparent",
                    height: 24,
                    width: 200,
                    fontSize: 16,
                    paddingHorizontal: 8,
                  }}
                  keyboardType="numeric"
                  placeholder="Enter count of hours"
                  mode="flat"
                  onChangeText={handleWorkHourChange}
                  value={workHours}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 155, marginLeft: 6 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Machinery box */}
          <Card style={styles.card3}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons
                name="excavator"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Machinery
              </Text>
              <View
                style={{
                  marginLeft: -45,
                  width: 230,
                  marginTop: 25,
                  alignItems: "center",
                }}
              >
                <View style={styles.SearchbarContainer}>
                  <Searchbar
                    placeholder="Search for machines"
                    placeholderStyle={{ fontSize: 16, marginTop: -14 }}
                    inputStyle={{ fontSize: 16, marginTop: -14 }}
                    style={styles.Searchbar}
                    onChangeText={(text) => {
                      setSearchItem(text);
                      handleSearch(text);
                    }}
                    value={searchItem}
                  ></Searchbar>
                  {searchSuggestions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionSelect(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    marginLeft: -200,
                  }}
                  variant="titleLarge"
                >
                  Count :
                </Text>
                <View style={{ marginTop: -23 }}>
                  <TextInput
                    style={{
                      backgroundColor: "transparent",
                      height: 24,
                      width: 200,
                      fontSize: 16,
                      paddingHorizontal: 8,
                      marginLeft: 50,
                    }}
                    keyboardType="numeric"
                    placeholder="Enter count of machines"
                    mode="flat"
                    onChangeText={handleMachineCountChange}
                    value={machineCount}
                    placeholderTextColor={"#838383"}
                    underlineStyle={{ width: 180, marginLeft: 7 }}
                  />
                </View>
                <Button
                  style={styles.machineAddButton}
                  labelStyle={styles.addButtonText}
                  buttonColor="#007BFF"
                  mode="contained-tonal"
                  onPress={handleAdd2}
                >
                  Add
                </Button>
              </View>
            </Card.Content>

            {/* Display values */}
            <View style={styles.displayValuesContainer}>
              {displayValues2.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue2(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Calculate button */}
          <View style={styles.calButtton}>
            <CustomButton
              onPress={handleClear}
              text="Calculate"
              iconName="calculator"
              iconColor="white"
              buttonColor="#007BFF"
            />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container2: {
    alignItems: "center",
    flex: 1,
  },

  card1: {
    height: "max-content",
    borderRadius: 11,
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.3),
    width: "93%",
    backgroundColor: "#fff",
  },

  weedButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(-1),
    marginLeft: responsiveWidth(2.6),
  },
  card2: {
    height: "max-content",
    justifyContent: "center",
    marginTop: responsiveHeight(1),
    width: "93%",
    backgroundColor: "#fff",
    borderRadius: 11,
  },
  countText: {
    marginLeft: responsiveWidth(3.5),
    fontSize: responsiveFontSize(2.2),
  },
  card3: {
    height: "max-content",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3),
    paddingBottom: responsiveHeight(0.3),
    width: "93%",
    borderRadius: 11,
    backgroundColor: "#fff",
  },
  cardTopText: {
    marginLeft: responsiveWidth(1),
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: responsiveHeight(-1),
  },
  calButtton: {
    marginTop: responsiveHeight(4),
    bottom: responsiveHeight(2),
    alignItems: "center",
  },
  Searchbar: {
    backgroundColor: "#F0F2F5",
    height: responsiveHeight(4.5),
    width: responsiveWidth(65),
  },
  addButton: {
    width: responsiveWidth(5),
    height: responsiveHeight(3.5),
    borderRadius: 11,
    marginTop: responsiveHeight(3.5),
    marginLeft: responsiveWidth(4.5),
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    width: "45%",
    height: responsiveFontSize(2.5),
    marginTop: responsiveHeight(0.4),
    marginBottom: responsiveHeight(1),
  },

  displayValuesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: responsiveHeight(1),
    alignItems: "center",
    backgroundColor: "white",
    height: "max-content",
    borderRadius: 11,
    width: "100%",
  },
  displayValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "whitesmoke",
    marginRight: responsiveWidth(1.2),
    marginLeft: responsiveWidth(1.2),
    marginBottom: responsiveHeight(1),
    borderRadius: 8,
    padding: responsiveWidth(0.6),
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  displayValueText: {
    fontSize: responsiveFontSize(1.4),
    marginRight: responsiveWidth(1),
    color: "#007BFF",
  },
  closeButton: {},
  closeButtonText: {
    color: "white",
  },
  button: {
    borderColor: "#CED0D4",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 11,
    width: responsiveWidth(25),
    height: responsiveHeight(4.5),
    marginLeft: responsiveWidth(-20),
    marginTop: responsiveHeight(3),
  },
  pressedButton: {
    borderColor: "#0866FF",
  },
  text: {
    marginLeft: responsiveScreenFontSize(0.2),
    marginRight: responsiveFontSize(1),
    fontSize: responsiveFontSize(1.8),
    paddingVertical: responsiveHeight(0),
    paddingHorizontal: responsiveWidth(0),
    marginTop: responsiveHeight(0.4),
    marginBottom: responsiveHeight(1),
    color: "#CED0D4",
  },
  pressedText: {
    color: "#0866FF",
  },
  Dropdown1: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    width: "40%",
    height: responsiveHeight(4),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: responsiveWidth(-17),
    marginTop: responsiveHeight(3.5),
  },
  machineAddButton: {
    width: responsiveWidth(30),
    height: responsiveHeight(3.5),
    borderRadius: 11,
    marginTop: responsiveHeight(2),
    justifyContent: "center",
    alignItems: "center",
  },
  SearchbarContainer: {
    marginBottom: responsiveHeight(0.2),
  },
  suggestionItem: {
    borderWidth: responsiveWidth(0.1),
    borderColor: "#ccc",
    borderRadius: 5,
    padding: responsiveHeight(1),
    marginTop: responsiveHeight(0.5),
    backgroundColor: "#f9f9f9",
  },
});
