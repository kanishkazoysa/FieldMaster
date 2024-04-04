import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

import Headersection from "../components/Headersection";
import CustomButton from "../components/CustomButton";

//Data submission to the backend API is implemented using axios
import axios from "axios";
import AxiosInstance from "../AxiosInstance";

export default function Plantation() {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const [textPlant, setTextPlant] = useState("");
  const [textplantspace, setTextPlantSpace] = useState("");
  const [textRowspace, setTextRowSpace] = useState("");

  const navigation = useNavigation();

  const [PlantSpaceUnitselectedValue, PlantSpaceUnitSetSelectedValue] =
    useState(null);
  const [RowSpacingUnitselectedValue, RowSpacingUnitSetSelectedValue] =
    useState(null);

  const PlantSpaceUnitPlaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const PlantSpaceUnitOptions = [
    // { label: "cm", value: "cm" },
    { label: "m", value: "m" },

  ];

  const RowSpacingUnitplaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const RowSpacingUnitOptions = [
    //{ label: "cm", value: "cm" },
    { label: "m", value: "m" },
  ];

  //handles submission of plantation details and navigation to PlantationDetails
  const handlePlantationDetails = () => {
    if (
      !textPlant ||
      !textplantspace ||
      !textRowspace ||
      !PlantSpaceUnitselectedValue

    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    AxiosInstance.post("/api/plantation/plantation", {
      textPlant,
      textplantspace,
      textRowspace,
    })
      .then(async (response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Something went wrong");

      })
      navigation.navigate("PlantationDetails", {
        textPlant: textPlant,
        selectedValue: PlantSpaceUnitselectedValue,
        textplantspace: textplantspace,
        textRowspace: textRowspace,
        selectedValue1: RowSpacingUnitselectedValue,
      });

  }



//navigating to the "PlantationDetails" screen while passing some data as route parameters
  

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
      <View style={styles.top}>

        <View style={styles.Box1}>

          <Text style={styles.titleText}>Land Info</Text>
          <View style={styles.propertyBox}>
            <View style={styles.property}>
              <MaterialCommunityIcons name="grid" size={36} color="gray" />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyLabel}>Type</Text>
                <Text style={styles.propertyValue}>Flat</Text>
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
                <Text style={styles.propertyValue}>2 acres</Text>
              </View>
            </View>
          </View>
        </View>



        {/* Second section */}

        <View style={styles.Box2}>
          <View style={styles.TopText}>
            <MaterialCommunityIcons name="sprout" size={20} color="gray" />
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

        {/* Third section */}

        <View style={styles.Box2}>
          <View style={styles.TopText}>
            <MaterialCommunityIcons name="apps" size={20} color="gray" />
            <Text style={styles.Box2titleText}>Column Spacing</Text>
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
                onValueChange={(value) =>
                  PlantSpaceUnitSetSelectedValue(value)
                }
                value={PlantSpaceUnitselectedValue}
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

        {/* Forth section */}

        <View style={styles.Box2}>
          <View style={styles.TopText}>
            <MaterialCommunityIcons
              name="format-line-spacing"
              size={20}
              color="gray"
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
                onValueChange={(value) =>
                  PlantSpaceUnitSetSelectedValue(value)
                }
                value={PlantSpaceUnitselectedValue}
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

      {/* Bottom section */}

      {!isKeyboardVisible && (
        <View style={styles.bottom}>
          <CustomButton
            onPress={handlePlantationDetails}
            text="Calculate Plantation"
            iconName="calculator"
            iconColor="white"
            buttonColor="#0866FF"
          />
        </View>
      )}
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
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",

  },

  top: {
    alignItems: "center",
    width: "100%",
  },

  Box1: {
    width: "87%",
    height: 101,
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 30,
    padding: 12,
    marginBottom: 20,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
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
    width: "93%",
    height: 85,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    borderRadius: 11,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
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



  Box3propertyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "Space-between",
    backgroundColor: "white",
    marginTop: 10,
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

  /* bottom section */

  bottom: {
    alignItems: "center",
    bottom: 30,
  },
});
