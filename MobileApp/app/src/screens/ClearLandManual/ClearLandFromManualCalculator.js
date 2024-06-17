import * as React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
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
  TextInput,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation ,useRoute} from "@react-navigation/native";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from "../../AxiosInstance";
import {styles} from "./ClearLandFromManualCalculatorStyles";
import { 
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function ClearLandFromManualCalculator({ route }) {
  const navigation = useNavigation();
  const { area , perimeter } = route.params;
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
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "Excavators",
    "Backhoes",
    "Chainsaws",
    "Excavator breakers"
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
  //validation part Add button
    const combinedValue1 = stoneTypeSelectedValue;
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
        if (
          !pressed ||
          !(displayValues.length > 0) ||
          !(displayValues1.length > 0) ||
          !laborCount ||
          !workHours ||
          !(displayValues2.length > 0)
        ) {
          Alert.alert("Error", "Please fill in all fields");
          return; 
        }
        try{
            const response = await AxiosInstance.post(
              "/api/clearLand/clearLandFromManualCalculator",
              {
                pressed,
                laborCount,
                workHours,
                displayValues,
                displayValues1,
                displayValues2,
                area,
              }
            );
            if(response.data.status==="ok"){
                const {effort,workDays} = response.data.data;
                console.log(effort,workDays);
                navigation.navigate("EffortOutputFromManualCalculator", {
                    area,
                    perimeter,
                    effort,
                    workHours,
                    workDays,
                    laborCount,
                    displayValues2,
                });
            } else {
                Alert.alert("Error", response.data.data);}
        } catch (error){
            console.error("Error:", error.response?.data || error.message);
            Alert.alert("Error", "Something went wrong");
        }
  };

  return (
    <PaperProvider>
      {/* Status bar section */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/* <Headersection navigation={navigation} title="Clear Land"></Headersection> */}

      {/* Header section */}
      <View>
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction 
              onPress={() => navigation.navigate("Home")}
              color="white"
            />
        <View style={{marginTop:40,left:10,width:"70%"}}>
          <Text style={styles.headerText}>Clear Land</Text>
        </View>
        </Appbar.Header>
      </View>
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
                      pressed === "Low" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "Low" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("Low")}
                  >
                    Low
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "Medium" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "Medium" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("Medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "High" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "High" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("High")}
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


