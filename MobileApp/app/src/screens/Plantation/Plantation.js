import {
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
import { styles } from "./PlantationStyles";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from "../../AxiosInstance";
import { Appbar } from "react-native-paper";

export default function Plantation({ route }) {
  const { id, area, perimeter, item } = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  console.log(id, area, perimeter);

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

  const [selectedPlantType, setSelectedPlantType] = useState(null);
  const [textplantspace, setTextPlantSpace] = useState("");
  const [textRowspace, setTextRowSpace] = useState("");

  const navigation = useNavigation();

  const [PlantSpaceUnitselectedValue, PlantSpaceUnitSetSelectedValue] =
    useState(null);
  const PlantSpaceUnitPlaceholder = {
    label: "Unit",
    value: null,
    color: "blue",
  };

  const PlantSpaceUnitOptions = [
    { label: "cm", value: "cm" },
    { label: "m", value: "m" },
  ];

  const RowSpacingUnitPlaceholder = {
    label: "Unit",
    value: null,
    color: "blue",
  };

  const RowSpacingUnitOptions = [
    { label: "cm", value: "cm" },
    { label: "m", value: "m" },
  ];

  const plantOptions = [
    { label: "Tea", value: "tea" },
    { label: "Corn", value: "Corn" },
    { label: "Cocoa", value: "cocoa" },
    { label: "Rubber", value: "Rubber" },
    { label: "Paddy", value: "Paddy" },
    { label: "Wheat", value: "Wheat" },
    { label: "Sugarcane", value: "Sugarcane" },
    { label: "Coconut", value: "Coconut" },
    { label: "Other", value: "other" },
  ];

  let plantSpaceInMeters = textplantspace;
  let rowSpaceInMeters = textRowspace;

  // Convert to meters if the selected unit is 'cm'
  if (PlantSpaceUnitselectedValue === "cm") {
    plantSpaceInMeters = parseFloat(textplantspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    plantSpaceInMeters = plantSpaceInMeters;
  }

  if (PlantSpaceUnitselectedValue === "cm") {
    rowSpaceInMeters = parseFloat(textRowspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    rowSpaceInMeters = rowSpaceInMeters;
  }

  // Handles submission of plantation details and navigation to PlantationDetails
  const handlePlantationDetails = async () => {
    if (
      !selectedPlantType ||
      !textplantspace ||
      !textRowspace ||
      !PlantSpaceUnitselectedValue
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await AxiosInstance.post("/api/plantation/plantation", {
        plantType: selectedPlantType.value,
        textplantspace: plantSpaceInMeters,
        textRowspace: rowSpaceInMeters,
        PlantSpaceUnitselectedValue: "m", 
        id,
        area,
      });
      console.log(id);
      navigation.navigate("PlantationDetails", { id: id, item: item });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/* Header section */}
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.navigate("TemplateView", { item: item })}
            color="white"
          />
          <View style={{ marginTop: 40, left: 10, width: "70%" }}>
            <Text style={styles.headerText}>Plantation</Text>
          </View>
        </Appbar.Header>
      </View>

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
                  <Text style={styles.propertyValue}>{area} Perch</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}
          <View style={styles.Box2}>
            <View style={styles.TopText}>
              <MaterialCommunityIcons name="sprout" size={20} color="gray" />
              <Text style={styles.Box2titleText}>Plant              </Text>
            </View>
            <View style={styles.dropdownContainerPlant}>
              <RNPickerSelect
                placeholder={{ label: "Plant type", value: null }}
                items={plantOptions}
                onValueChange={(value) => setSelectedPlantType({ value })}
                value={selectedPlantType?.value}
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

          {/* Third section */}
          <View style={styles.Box3}>
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

          {/* Fourth section */}
          <View style={styles.Box3}>
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
                  placeholder={RowSpacingUnitPlaceholder}
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
