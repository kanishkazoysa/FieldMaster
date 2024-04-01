import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

import Headersection from "../components/Headersection";
import CustomButton from "../components/CustomButton";
import axios from "axios";

export default function Fertilization() {
  const navigation = useNavigation();
  const handleFertilizationDetails = () => {

  if (!textFertilizationType || !textFertilizationNUmberoftime || !textFertilizationAmount || !FertilizerAmountUnitselectedValue || selectedButton === null) {
      // Display error message
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // connecting to backend
    try{

      const selectedButton= buttonNames[selectedButton];
      const response = axios.post("http://10.10.12.72:5000/api/fertilizer/fertilizer", {
        textFertilizationType,
        textFertilizationNUmberoftime,
        textFertilizationAmount,
        selectedButton
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
    // connection to backend


    navigation.navigate("FertilizationDetails",
    {
      
    FertilizerType : textFertilizationType,
    NumberOfTime: textFertilizationNUmberoftime,
    FertilizerAmount:textFertilizationAmount,
    FertilizerAmountUnit:FertilizerAmountUnitselectedValue,
    SelectedButton: selectedButton !== null ? buttonNames[selectedButton] : null,
    }
    );

  };

  /*button bar */
  const [selectedButton, setSelectedButton] = useState(null);

  const [pressedIndex, setPressedIndex] = useState(null);

  const handlePressButtonbar = (index) => {
    setPressedIndex(index === pressedIndex ? null : index);
    setSelectedButton(index === pressedIndex ? null : index);

  };

  const isPressed = (index) => {
    return index === pressedIndex;
  };

  const buttonNames = ["Daily","Weekly", "Monthly", "Quarter", "Yearly"];

  /*text area */
  const [textFertilizationType, setTextFertilizationType] = useState("");
  const [textFertilizationNUmberoftime, setTextFertilizationNUmberoftime] = useState("");
  const [textFertilizationAmount, setTextFertilizationAmount] = useState("");
  const [FertilizerAmountUnitselectedValue, FertilizerAmountUnitsetSelectedValue] = useState(null);

  const FertilizerAmountUnitplaceholder = {
    label: "KG",
    value: null,
    color: "blue",
  };

  const FertilizerAmountUnitOptions = [
    { label: "Kg", value: "Kg" },
    { label: "g", value: "g" },
    { label: "mg", value: "mg" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/*Header section*/}  
      <Headersection navigation={navigation} title="Fertilizing" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View  style={styles.top}>
        {/* Top section */}
          <View style={styles.Box1}>
            <View style={styles.innerContainer}>
              <Text style={styles.titleText}>Plantation Info</Text>
              {/* Property boxes */}
              <View style={styles.propertyBox}>
                {/* Row 1 */}
                <View style={styles.propertyboxtop}>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="sprout"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Plant</Text>
                      <Text style={styles.propertyValue}>Tea</Text>
                    </View>
                  </View>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="texture-box"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Area</Text>
                      <Text style={styles.propertyValue}>100 acres</Text>
                    </View>
                  </View>
                </View>
                {/* Row 2 */}
                <View style={styles.propertyboxtop}>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="square-opacity"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Density</Text>
                      <Text style={styles.propertyValue}>32 plants/m</Text>
                    </View>
                  </View>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="pine-tree"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Total Plants</Text>
                      <Text style={styles.propertyValue}>100</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

        {/* Second section */}

          <View style={styles.Box2}>

            <View style={styles.Box2innerContainer}>
              <View style={styles.TopText}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={22}
                  color="#65676B"
                />
                <Text style={styles.Box2titleText}>Time Period</Text>
              </View>
              <View style={styles.selectbuttonBox}>
                
                  {buttonNames.map((name, index) => (
                    <Button
                      labelStyle={{
                        fontSize: 12,
                        color: isPressed(index) ? "#007aff" : "#000",
                        width: "100%",
                      }}
                      key={index}
                      mode={isPressed(index) ? "contained-tonal" : "outlined"}
                      color={isPressed(index) ? "#007aff" : "#000"}
                      onPress={() => handlePressButtonbar(index)}
                      style={[
                        styles.button,
                        { borderColor: isPressed(index) ? "#007aff" : "#000" },
                      ]}
                    >
                      {name}
                    </Button>
                  ))}
                
              </View>
            </View>

          </View>

        {/* Third section */}

          <View style={styles.Box3}>
              <View style={styles.Box3TopText}>
                <MaterialCommunityIcons
                  name="flask-outline"
                  size={20}
                  color="#65676B"
                />
                <Text style={styles.Box3titleText}>Fertilizer Type :</Text>
              </View>
              <TextInput
                
                style={styles.Box2input}
                placeholder="Enter The name"
                value={textFertilizationType}
                onChangeText={setTextFertilizationType}
                placeholderTextColor={"#838383"}
                borderBottomColor="lightgray"
                borderBottomWidth={1}
                width={"36%"}
                height={20}
                marginbottom={10}
                marginLeft={10}
              />
            </View>

        {/* Forth section */}

          <View style={styles.Box3}>
              <View style={styles.Box3TopText}>
                <MaterialCommunityIcons
                  name="ticket-confirmation"
                  size={20}
                  color="#65676B"
                />
                <Text style={styles.Box3titleText}>Number of Times :</Text>
              </View>
              <TextInput
                keyboardType="numeric"
                style={styles.Box2input}
                placeholder="00"
                value={textFertilizationNUmberoftime}
                onChangeText={setTextFertilizationNUmberoftime}
                placeholderTextColor={"#838383"}
                borderBottomColor="lightgray"
                borderBottomWidth={1}
                width={"30%"}
                height={20}
                marginbottom={10}
                marginLeft={10}
              />
            </View>

        {/* Fifth section */}

          <View style={styles.Box5}>
            <View style={styles.Box2innerContainer}>
              <View style={styles.TopText}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={20}
                  color="#65676B"
                />
                <Text style={styles.Box2titleText}>Amount</Text>
              </View>
              <View style={styles.Box5propertyBox}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.Box2input}
                  placeholder="Enter Fertilization Amount"
                  value={textFertilizationAmount}
                  onChangeText={setTextFertilizationAmount}
                  placeholderTextColor={"#838383"}
                  borderBottomColor="lightgray"
                  borderBottomWidth={1}
                  width={"60%"}
                />
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={FertilizerAmountUnitplaceholder}
                    items={FertilizerAmountUnitOptions}
                    onValueChange={(value) => FertilizerAmountUnitsetSelectedValue(value)}
                    value={FertilizerAmountUnitselectedValue}

                    style={{
                      inputIOS: {
                        textAlign: "center",
                      },
                      inputAndroid: {
                        textAlign: "center",
                      },
                    }}
                  />
                </View>
              </View>
              <Text style={styles.Box5bottomText}>
                *Note that this amount of fertilizer is the amount of fertilizer
                for one tree{" "}
              </Text>
            </View>
          </View>
          </View>

        {/* Bottom section */}

          <View style={styles.bottom}>
            
            <CustomButton
              onPress={handleFertilizationDetails}
              text=" Calculate Fertilizing"
              iconName="calculator" // Change the icon name as needed
              iconColor="white" // Change the color of the icon
              buttonColor="#0866FF" // Change the background color of the button
            />


          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /*Top section*/

  scrollContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },

  top: {
    alignItems: "center",
    width: "100%",

   },

  Box1: {
    width: "87%",
    height: 161,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 40,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  innerContainer: {
    width: "100%",
    height: "85%",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 16,
  },
  propertyBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 110,
    width: "100%",
    backgroundColor: "white",
    marginTop: 7,
  },
  propertyboxtop: {
    flexDirection: "row",
  },

  property: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    backgroundColor: "white",
    width: "46%",
    height: 50,
  },
  propertyDetails: {
    flexDirection: "column",
    marginLeft: 5,
    width: "70%",
    height: 40,
    backgroundColor: "white",
  },
  propertyLabel: {
    fontSize: 14,
  },
  propertyValue: {
    fontSize: 16,
    fontWeight: "bold",
  },

  /*Second section*/

  Box2: {
    width: "95%",
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  Box2innerContainer: {
    flexDirection: "column",
    height: "80%",
    width: "90%",
    backgroundColor: "white",
  },

  TopText: {
    flexDirection: "row",
  },

  Box2titleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },

  selectbuttonBox: {
    flexDirection: "row",
    width: Platform.OS === "ios" ? "80%" : "100%",
    backgroundColor: "white",
    marginTop: 10,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    borderColor: "#CED0D4",
    borderWidth: 1,
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 1,
  },

  /*Third section*/

  Box3: {
    width: "95%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 12,
  },


  Box3TopText: {
    flexDirection: "row",
  },

  Box3titleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },

  /*Fifth Section*/
  Box5: {
    width: "95%",
    height: 85,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  Box5propertyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "Space-between",
    backgroundColor: "white",
    marginTop: 8,
    width: "100%",
  },

  dropdownContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    borderColor: "black",
    width: "36%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },

  Box5bottomText: {
    fontSize: 6,
  },

  /* bottom section */

  bottom: {
    alignItems: "center",
    bottom: 30,
  },
  
});