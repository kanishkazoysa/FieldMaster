import React, { useState, useEffect, useRef } from "react";
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
  TouchableOpacity,
} from "react-native";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PlantationStyles";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from "../../AxiosInstance";

export default function Plantation({route}) {
  const{id,Area,Perimeter} =  route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [textPlantSpace, setTextPlantSpace] = useState("");
  const [PlantSpaceUnitselectedValue, setPlantSpaceUnitSelectedValue] = useState(null);
  const [RowSpacingUnitselectedValue, setRowSpacingUnitSelectedValue] = useState(null);

  const PlantSpaceUnitPlaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const PlantSpaceUnitOptions = [
    { label: "m", value: "m" },
  ];

  const RowSpacingUnitPlaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const RowSpacingUnitOptions = [
    { label: "m", value: "m" },
  ];

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
  const handlePlantationDetails = async () => {
    if (
      !textPlant ||
      !textplantspace ||
      !textRowspace ||
      !PlantSpaceUnitselectedValue
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    try {
      const response = await AxiosInstance.post("/api/plantation/plantation", {
        textPlant,
        textplantspace,
        textRowspace,
        PlantSpaceUnitselectedValue,
        id,
      });
      console.log(response.data);
      navigation.navigate("PlantationDetails", { id: id });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong");
    }
  };
  

//navigating to the "PlantationDetails" screen while passing some data as route parameters
  

return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "margin"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
  >
    <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
    <Headersection navigation={navigation} title="Plantation" />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.top}>
        <View style={styles.Box1}>
          <Text style={styles.titleText}>Land Info</Text>
          <View style={styles.propertyBox}>
            <View style={styles.property}>
              <MaterialCommunityIcons name="grid" size={36} color="gray" />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyLabel}>Type</Text>
                <Text style={styles.propertyValue}>{type}</Text>
              </View>
            </View>
            <View style={styles.property}>
              <MaterialCommunityIcons name="texture-box" size={36} color="gray" />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyLabel}>Area</Text>
                <Text style={styles.propertyValue}>{area} acres</Text>
              </View>
            </View>
          </View>
        </View>

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
              value={textPlantSpace}
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
                onValueChange={(value) => setPlantSpaceUnitSelectedValue(value)}
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

        <View style={styles.Box2}>
          <View style={styles.TopText}>
            <MaterialCommunityIcons name="format-line-spacing" size={20} color="gray" />
            <Text style={styles.Box2titleText}>Row Spacing</Text>
          </View>
          <View style={styles.Box3propertyBox}>
            <TextInput
              keyboardType="numeric"
              style={styles.Box2input}
              placeholder="Enter Row Space"
              value={textRowSpace}
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
                onValueChange={(value) => setRowSpacingUnitSelectedValue(value)}
                value={RowSpacingUnitselectedValue}
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
