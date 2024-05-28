import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

import {styles} from './FenceStyles';
import Headersection from "../../../components/Headersection";
import CustomButton from "../../../components/CustomButton";
import axios from "axios";
import AxiosInstance from "../../../AxiosInstance";

export default function Fence({route}) {
  const{id,Area,Perimeter} =  route.params;
  const [FenceTypeselectedValue, setFenceTypeSelectedValue] = useState(null);
  const [PostSpaceUnitselectedValue, setPostSpaceUnitSelectedValue1] =useState(null);
  const [inputValueFenceLength, setinputValueFenceLength] = useState("");
  const [inputValueFenceAmount, setinputValueFenceAmount] = useState("");
  const [inputValuePostspace, setinputValuePostspace] = useState("");
  // const [perimeter, setperimeter] = useState("1500");
  //const [Area, setArea] = useState("100");
  const [fenceLengthsArray, setFenceLengthsArray] = useState([]);
  const [fenceAmountsArray, setFenceAmountsArray] = useState([]);

  const navigation = useNavigation();

  const [displayValues, setDisplayValues] = useState([]);
  let inputValueFenceAmountRef = useRef(null);

  const handleInputPostspaceChange = (text) => {
    setinputValuePostspace(text);
  };
  const handleFenceLengthChange = (text) => {
    setinputValueFenceLength(text);
  };

  const handleFenceAmountChange = (text) => {
    setinputValueFenceAmount(text);
  };

  const handleAdd = () => {
    // Validation part Add button
    if (!inputValueFenceLength.trim() || !inputValueFenceAmount.trim()) {
      Alert.alert("Validation Error", "Both input fields are required.", [
        { text: "OK" },
      ]);
      return;
    }

    // Add values to arrays
    const length = parseFloat(inputValueFenceLength);
    const amount = parseInt(inputValueFenceAmount);
    setFenceLengthsArray([...fenceLengthsArray, length]);
    setFenceAmountsArray([...fenceAmountsArray, amount]);

    // Combine values from arrays
    const combinedValue = length + "m" + " x " + amount;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setinputValueFenceLength("");
    setinputValueFenceAmount("");
  };

  //remove Added values 
  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);

    const newFenceLengthsArray = [...fenceLengthsArray];
    newFenceLengthsArray.splice(index, 1);
    setFenceLengthsArray(newFenceLengthsArray);

    const newFenceAmountsArray = [...fenceAmountsArray];
    newFenceAmountsArray.splice(index, 1);
    setFenceAmountsArray(newFenceAmountsArray);
  };

  const placeholderFenceType = {
    label: "Select Type",
    value: null,
    color: "blue",
  };

  const fenceTypeOptions = [
    { label: "Wood", value: "Wood" },
    { label: "Metal", value: "Metal" },
    { label: "Fiber", value: "Fiber" },
  ];

  const placeholderPostSpaceUnit = {
    label: "M",
    value: null,
    color: "blue",
  };

  const lengthUnitOptions = [
    { label: "m", value: "m" },
    { label: "cm", value: "cm" },
  ];

  //calculate button click
  const handleFenceDetails = async () => {
    
    // send data to back end
    AxiosInstance.post("/api/fence/fence", {
      id,
      FenceTypeselectedValue,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray,
      fenceLengthsArray,
      Perimeter,
      
    })
      .then((response) => {
        if (
          !PostSpaceUnitselectedValue ||
          !FenceTypeselectedValue ||
          !inputValuePostspace
        ) {
          // Display error message
          Alert.alert("Error", "Please fill in all fields");
          return;
        }
        navigation.navigate("FenceDetails", {
          data: displayValues,
          fenceType: FenceTypeselectedValue,
          PostSpaceUnit: PostSpaceUnitselectedValue,
          postSpace: inputValuePostspace,
          Area:Area,
          Perimeter:Perimeter,
        });
        //console.log(response.data);
      })

      .catch((error) => {
        console.error("Error:", error.response.data);
        Alert.alert("Error", "Failed to create fence. Please try again.");
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
      <Headersection navigation={navigation} title="Fence" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top section */}
        <View style={styles.top}>
          <View style={styles.Box1}>
            <View>
              <Text style={styles.titleText}>Land Info</Text>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="vector-square"
                    size={36}
                    color="gray"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Perimeter</Text>
                    <Text style={styles.propertyValue}>{Perimeter} km</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="texture-box"
                    size={36}
                    color="gray"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Area</Text>
                    <Text style={styles.propertyValue}>{Area} perches</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.box2}>
            <View style={styles.box2Property}>
              <MaterialCommunityIcons
                name="gate"
                size={40}
                color="gray"
                style={styles.squareIcon}
              />
              <View style={styles.box2PropertyDetails}>
                <Text style={styles.Box2PropertyLabel}>Fence Type</Text>
              </View>
            </View>
            <View style={styles.box2Property}>
              <View style={styles.Box2DropdownContainer}>
                <RNPickerSelect
                  placeholder={placeholderFenceType}
                  items={fenceTypeOptions}
                  onValueChange={(value) => setFenceTypeSelectedValue(value)}
                  value={FenceTypeselectedValue}
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
          </View>

          {/* Third section */}

          <View style={styles.box3}>
            <View style={styles.box3Property}>
              <MaterialCommunityIcons
                name="format-line-spacing"
                size={30}
                color="gray"
                rotation={270}
              />
              <View style={styles.box3PropertyDetails}>
                <Text style={styles.Box3PropertyLabel}>Post Space</Text>
              </View>
            </View>
            <View style={styles.box3Property}>
              <View style={styles.box3inputContainer}>
                <TextInput
                  style={styles.box3input}
                  keyboardType="numeric"
                  placeholder="00"
                  value={inputValuePostspace}
                  onChangeText={handleInputPostspaceChange}
                />
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={placeholderPostSpaceUnit}
                    items={lengthUnitOptions}
                    onValueChange={(value) =>
                      setPostSpaceUnitSelectedValue1(value)
                    }
                    value={PostSpaceUnitselectedValue}
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
            </View>
          </View>

          {/* Forth section */}

          <View style={styles.box4}>
            <View style={styles.box4innertop}>
              <MaterialCommunityIcons name="boom-gate" size={36} color="gray" />
              <Text style={styles.Box4TopText}>Gates</Text>
            </View>
            <View style={styles.box4InnerCenter}>
              <View style={styles.line}>
                <Text style={styles.linetext}>Length :</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.linetextinput}
                  placeholder="Enter Lenght of Gate"
                  marginLeft={10}
                  borderBottomWidth={1}
                  height={20}
                  borderBottomColor="lightgray"
                  returnKeyType="next"
                  onChangeText={handleFenceLengthChange}
                  value={inputValueFenceLength}
                  onSubmitEditing={() => {
                    // Focus on the next input field
                    inputValueFenceAmountRef.focus();
                  }}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetext}>Count :</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.linetextinput}
                  placeholder="Enter Count of Gate"
                  marginLeft={10}
                  borderBottomWidth={1}
                  alignItems="center"
                  justifyContent="center"
                  height={20}
                  returnKeyType="done"
                  borderBottomColor="lightgray"
                  onChangeText={handleFenceAmountChange}
                  value={inputValueFenceAmount}
                  ref={(input) => {
                    inputValueFenceAmountRef = input;
                  }}
                  onSubmitEditing={handleAdd}
                />
              </View>
            </View>
            <View style={styles.Box4InnerBottom}>
              <TouchableOpacity style={styles.Box4Button} onPress={handleAdd}>
                <Text style={styles.Box4ButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

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
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>
          <CustomButton
            onPress={handleFenceDetails}
            text="Calculate"
            iconName="calculator"
            iconColor="white"
            buttonColor="#0866FF"
            style={styles.calculateButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

