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

import { useNavigation } from "@react-navigation/native";

import ButtonForWeed from "../components/ButtonForWeed";
import DropdownPlants from "../components/DropdownPlants";
// import LaborInputField from "../components/LaborInputField";
// import WorkHourInput from "../components/WorkHourInput";
// import PlantInput from "../components/PlantInput";
import DropdownStones from "../components/DropdownStones";
// import AddButton from "../components/AddButton";
// import MachineInput from "../components/MachineInput";
import Headersection from "../components/Headersection";
import CustomButton from "../components/CustomButton";

export default function ClearLand() {
  const [text, setText] = React.useState("");

  const [searchItem, setSearchItem] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const handleSearchItem = () => {
    if (searchItem.trim() !== "") {
      setSearchItems([...searchItems, { item: searchItem, machineCount }]);
      setSearchItem("");
      setMachineCount(""); // Reset machineCount after adding
    }
  };

  const [laborCount, setLaborCount] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [machineCount, setMachineCount] = useState("");
  const [plantCount, setPlantCount] = useState("");
  const [stonesCount, setStonesCount] = useState("");
  const navigation = useNavigation();
  const handleEffortOutput = () => {
    navigation.navigate("EffortOutput");
  };

  const handleClear = () => {
    navigation.navigate("EffortOutput", {
      laborCount: laborCount,
      workHours: workHours,
      machineCount: machineCount,
      plantCount: plantCount,
      stonesCount: stonesCount,
    });
  };

  /displAY/

  const [displayValues, setDisplayValues] = useState([]);

  const handleAdd = () => {
    //validation part Add button

    const combinedValue = plantCount + " x " + "low";
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setPlantCount("");
    //setinputValueFenceAmount("");
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const [displayValues1, setDisplayValues1] = useState([]);

  const handleAdd1 = () => {
    //validation part Add button

    const combinedValue1 = plantCount + " x " + "low";
    const newDisplayValues1 = [...displayValues1, combinedValue1].filter(
      Boolean
    );
    setDisplayValues1(newDisplayValues1);
    setStonesCount("");
    //setinputValueFenceAmount("");
  };

  const handleRemoveValue1 = (index) => {
    const newDisplayValues1 = [...displayValues1];
    newDisplayValues1.splice(index, 1);
    setDisplayValues1(newDisplayValues1);
  };

  const [displayValues2, setDisplayValues2] = useState([]);

  const handleAdd2 = () => {
    //validation part Add button

    const combinedValue2 = plantCount + " x " + "low";
    const newDisplayValues2 = [...displayValues2, combinedValue2].filter(
      Boolean
    );
    setDisplayValues2(newDisplayValues2);
    setPlantCount("");
    //setinputValueFenceAmount("");
  };

  const handleRemoveValue2 = (index) => {
    const newDisplayValues2 = [...displayValues2];
    newDisplayValues2.splice(index, 1);
    setDisplayValues2(newDisplayValues2);
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
            <Card.Content
              style={{ display: "flex", flexDirection: "row" }}
            >
              <MaterialCommunityIcons
                name="sprout-outline"
                size={20}
                color="#65676B"
              />
              <Text style={{ marginLeft: 5 }} variant="titleLarge">
                Weeds
              </Text>
              <ButtonForWeed></ButtonForWeed>
            </Card.Content>
          </Card>

          {/* Plants box */}
          <Card style={styles.card1}>
            <Card.Content
              style={{ display: "flex", flexDirection: "row", marginTop: -5 }}
            >
              <MaterialCommunityIcons name="sprout" size={20} color="#65676B" />
              <Text style={{ marginLeft: 5 }} variant="titleLarge">
                Plants
              </Text>
              <DropdownPlants />
              <Text style={{ marginTop: 30, marginLeft: 10, fontSize: 16 }}>
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
                    value={plantCount}
                    onChangeText={(count) => setPlantCount(count)}
                    placeholderTextColor={"#838383"}
                    underlineStyle={{ width: 45, marginLeft: 5 }}
                  />
                </View>
              </Text>
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
                      size={20}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Stones box */}
          <Card style={styles.card1}>
            <Card.Content
              style={{ display: "flex", flexDirection: "row", marginTop: -5 }}
            >
              <Image
                style={{ marginRight: 5 }}
                source={require("../../assets/Stones.png")}
              />
              <Text style={{}} variant="titleLarge">
                Stones
              </Text>
              <DropdownStones />
              <Text style={{ marginTop: 30, marginLeft: 10, fontSize: 16 }}>
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
                    onChangeText={(count) => setStonesCount(count)}
                    placeholderTextColor={"#838383"}
                    underlineStyle={{ width: 45, marginLeft: 5 }}
                  />
                </View>
              </Text>
              <Button
                style={styles.addButton}
                labelStyle={styles.addButtonText}
                buttonColor="#007BFF"
                mode="contained"
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
            <Card.Content
              style={{ display: "flex", flexDirection: "row",  }}
            >
              <MaterialCommunityIcons
                name="account-hard-hat"
                size={20}
                color="#65676B"
              />
              <Text style={{ marginLeft: 5 }} variant="titleLarge">
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
                  value={laborCount}
                  onChangeText={(count) => setLaborCount(count)}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 157, marginLeft: 7 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Work hours box */}
          <Card style={styles.card2}>
            <Card.Content
              style={{ display: "flex", flexDirection: "row",  }}
            >
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={20}
                color="#65676B"
              />
              <Text style={{ marginLeft: 5 }} variant="titleLarge">
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
                  value={workHours}
                  onChangeText={(count) => setWorkHours(count)}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 155, marginLeft: 6 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Machinery box */}
          <Card style={styles.card3}>
            <Card.Content
              style={{ display: "flex", flexDirection: "row", marginTop: -5 }}
            >
              <MaterialCommunityIcons
                name="excavator"
                size={20}
                color="#65676B"
              />
              <Text style={{ marginLeft: 5 }} variant="titleLarge">
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
                <Searchbar
                  placeholder="Search for machines"
                  placeholderStyle={{ fontSize: 16, marginTop: -14 }}
                  inputStyle={{ fontSize: 16, marginTop: -14 }}
                  style={styles.Searchbar}
                  onChangeText={setSearchItem}
                ></Searchbar>
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
                    value={machineCount}
                    onChangeText={(count) => setMachineCount(count)}
                    placeholderTextColor={"#838383"}
                    underlineStyle={{ width: 180, marginLeft: 7 }}
                  />
                </View>
                <Button
                  style={{
                    width: 119,
                    height: 35,
                    borderRadius: 11,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  labelStyle={styles.addButtonText}
                  buttonColor="#007BFF"
                  mode="contained-tonal"
                  onPress={handleAdd2}
                >
                  Add
                </Button>
                {/* <Text>{searchItem}*{machineCount}</Text> */}
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
              iconName="calculator" // Change the icon name as needed
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
    alignItems: "center",
  },

  card1: {
    height: "max-content",
    borderRadius: 11,
    marginTop: 10,
    paddingBottom: 5,
    width: "93%",
    backgroundColor: "#fff",
  },
  card2: {
    height: "max-content",	
    justifyContent: "center",
    marginTop: 10,
    width: "93%",
    backgroundColor: "#fff",
    borderRadius: 11,
  },
  card3: {
    height: "max-content",
    marginTop: 10,
    paddingBottom: 10,
    width: "93%",
    borderRadius: 11,
    backgroundColor: "#fff",
  },
  calButtton: {
    
   
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeholder: {
    fontSize: 1,
  },
  Searchbar: {
    backgroundColor: "#F0F2F5",
    height: 29,
    width: 253,
  },
  addButton: {
    width: 20,
    height: 35,
    borderRadius: 11,
    marginTop: 27,
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    width: "80%",
    height: 20,
  },

  displayValuesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    alignItems: "center",
    backgroundColor: "white",
    height: "max-content",
    borderRadius: 11,
  },
  displayValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "whitesmoke",
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 8,
    padding: 2,
    width: "25%",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  displayValueText: {
    fontSize: 14,
    marginRight: 5,
    color: "#007BFF",
  },
  closeButton: {},
  closeButtonText: {
    color: "white",
    fontSize: 14,
  },
});