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
    Alert ,
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { Appbar } from "react-native-paper";
  import RNPickerSelect from "react-native-picker-select";
  import { useNavigation } from "@react-navigation/native";
  
  import Headersection from "../components/Headersection";
  import CustomButton from "../components/CustomButton";
  
  
  export default function Plantation() {
    const [textPlant, setTextPlant] = useState("");
    const [textplantspace, setTextPlantSpace] = useState("");
    const [textRowspace, setTextRowSpace] = useState("");
  
    const navigation = useNavigation();
  
    const [PlantSpaceUnitselectedValue, PlantSpaceUnitSetSelectedValue] = useState(null);
    const [RowSpacingUnitselectedValue, RowSpacingUnitSetSelectedValue] = useState(null);
  
    const PlantSpaceUnitPlaceholder = {
      label: "M",
      value: null,
      color: "blue",
    };
  
    const PlantSpaceUnitOptions = [
      { label: "cm", value: "cm" },
      { label: "m", value: "m" },
      { label: "inch", value: "inch" },
    ];
  
    const RowSpacingUnitplaceholder = {
      label: "M",
      value: null,
      color: "blue",
    };
  
    const RowSpacingUnitOptions = [
      { label: "cm", value: "cm" },
      { label: "m", value: "m" },
      { label: "inch", value: "inch" },
    ];
  
    const handlePlantationDetails = () => {
  
      if (!textPlant || !textplantspace || !textRowspace || !PlantSpaceUnitselectedValue || !RowSpacingUnitselectedValue) {
        // Display error message
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      navigation.navigate("PlantationDetails", {
        textPlant: textPlant,
        selectedValue: PlantSpaceUnitselectedValue,
        textplantspace: textplantspace,
        textRowspace: textRowspace,
        selectedValue1: RowSpacingUnitselectedValue,
      });
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
        <Headersection navigation={navigation} title="Plantation" />
  
  
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Top section */}
  
          <View style={styles.box}>
            <View style={styles.Box1}>
              <View style={styles.innerContainer}>
                <Text style={styles.titleText}>Land Info</Text>
                <View style={styles.propertyBox}>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="grid"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Type</Text>
                      <Text style={styles.propertyValue}>Flat</Text>
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
              </View>
            </View>
          </View>
  
          {/* Second section */}
  
          <View style={styles.box}>
            <View style={styles.Box2}>
              <View style={styles.Box2innerContainer}>
                <View style={styles.TopText}>
                  <MaterialCommunityIcons
                    name="sprout"
                    size={20}
                    color="#65676B"
                  />
                  <Text style={styles.Box2titleText}>Plant</Text>
                </View>
                <TextInput
                  keyboardType="default"
                  style={styles.Box2input}
                  placeholder="Enter Name of the plant"
                  value={textPlant}
                  onChangeText={setTextPlant}
                  placeholderTextColor={"#838383"}
                  borderBottomColor="lightgray"
                  borderBottomWidth={1}
                  width={"100%"}
                  marginTop={12}
  
                  
                />
              </View>
            </View>
          </View>
  
          {/* Third section */}
  
          <View style={styles.box}>
            <View style={styles.Box3}>
              <View style={styles.Box2innerContainer}>
                <View style={styles.TopText}>
                  <MaterialCommunityIcons name="apps" size={20} color="#65676B" />
                  <Text style={styles.Box2titleText}>Plant Spacing</Text>
                </View>
                <View style={styles.Box3propertyBox}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.Box2input}
                    placeholder="Enter Plant Space"
                    value={textplantspace}
                    onChangeText={setTextPlantSpace}
                    placeholderTextColor={"#838383"}
                    borderBottomColor="lightgray"
                    borderBottomWidth={1}
                    width={"60%"}
                  />
                  <View style={styles.dropdownContainer}>
                    <RNPickerSelect
                      placeholder={PlantSpaceUnitPlaceholder}
                      items={PlantSpaceUnitOptions}
                      onValueChange={(value) => PlantSpaceUnitSetSelectedValue(value)}
                      value={PlantSpaceUnitselectedValue}

                      style={{
                        inputIOS: {
                          textAlign: "center", // Center text horizontally
                          // Add additional styles if needed
                        },
                        inputAndroid: {
                          textAlign: "center", // Center text horizontally
                          // Add additional styles if needed
                        },
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
  
          {/* Forth section */}
  
          <View style={styles.box}>
            <View style={styles.Box3}>
              <View style={styles.Box2innerContainer}>
                <View style={styles.TopText}>
                  <MaterialCommunityIcons
                    name="format-line-spacing"
                    size={20}
                    color="#65676B"
                  />
                  <Text style={styles.Box2titleText}>Row Spacing</Text>
                </View>
                <View style={styles.Box3propertyBox}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.Box2input}
                    placeholder="Enter Row Space"
                    value={textRowspace}
                    onChangeText={setTextRowSpace}
                    placeholderTextColor={"#838383"}
                    borderBottomColor="lightgray"
                    borderBottomWidth={1}
                    width={"60%"}
                  />
                  <View style={styles.dropdownContainer}>
                    <RNPickerSelect
                      placeholder={RowSpacingUnitplaceholder}
                      items={RowSpacingUnitOptions}
                      onValueChange={(value) => RowSpacingUnitSetSelectedValue(value)}
                      value={RowSpacingUnitselectedValue}

                      style={{
                        inputIOS: {
                          textAlign: "center", // Center text horizontally
                          // Add additional styles if needed
                        },
                        inputAndroid: {
                          textAlign: "center", // Center text horizontally
                          // Add additional styles if needed
                        },
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
  
          {/* Bottom section */}
  
          <View style={styles.box}>
            <View style={styles.bottom}>
              
              <CustomButton
                onPress={handlePlantationDetails}
                text="Calculate Plantation"
                iconName="calculator" // Change the icon name as needed
                iconColor="white" // Change the color of the icon
                buttonColor="#0866FF" // Change the background color of the button
              />
  
            </View>
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
  
    box: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    Box1: {
      width: "87%",
      height: 101,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 30,
      borderRadius: 11,
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: "100%",
      backgroundColor: "white",
      marginTop: 7,
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
      width: "50%",
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
      height: 85,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 30,
      borderRadius: 11,
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
      marginLeft: 10,
    },
  
    Box2input: {},
  
    /*Third section*/
  
    Box3: {
      width: "95%",
      height: 85,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 10,
      borderRadius: 11,
    },
  
    Box3propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "Space-between",
      backgroundColor: "white",
      marginTop: 12,
      width: "100%",
    },
  
    dropdownContainer: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      borderColor: "black",
      width: "36%",
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "flex-end",
      justifyContent: "flex-end",
      marginTop: 170,
    },
  });
  