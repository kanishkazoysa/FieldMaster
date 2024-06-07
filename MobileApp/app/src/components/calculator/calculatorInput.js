import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import CalculatorSelect from "./calculatorSelect";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const CalculatorSelectModel = ({
  calculatorModalVisible,
  setCalculatorModalVisible,
}) => {
  const [calculatorSelectModalVisible, setCalculatorSelectModalVisible] =
    useState(false);
  const [selectedValue, setSelectedValue] = useState("sqm");

  const closeModal = () => {
    setCalculatorModalVisible(false);
  };

  const handleCalculate = () => {
    setCalculatorSelectModalVisible(true);
    setCalculatorModalVisible(false);
  };

  const navigation = useNavigation();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={calculatorModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeModal}
          />
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <IconButton
                  icon="close"
                  iconColor="#000"
                  size={responsiveFontSize(3.2)}
                  onPress={closeModal}
                  style={styles.cancelButton}
                />

                <Text style={styles.headerText}>Manual Calculator</Text>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign
                      name="piechart"
                      size={responsiveFontSize(3)}
                      color="#65676B"
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.9),
                        marginLeft: responsiveWidth(2),
                      }}
                    >
                      Area
                    </Text>
                  </View>

                  <View style={styles.iconContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={"00.00"}
                      keyboardType="numeric"
                    />

                    <View style={styles.dropdown}>
                      <Picker
                        selectedValue={selectedValue}
                        style={{
                          height: responsiveHeight(6),
                          width: responsiveWidth(30),
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <Picker.Item label="Square Meters" value="sqm" />
                        <Picker.Item label="Square Feet" value="sqft" />
                        <Picker.Item label="Acres" value="acres" />
                        {/* Add more items as needed */}
                      </Picker>
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="vector-rectangle"
                      size={responsiveFontSize(3.4)}
                      color="#65676B"
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.9),
                        marginLeft: responsiveWidth(2),
                      }}
                    >
                      Perimeter
                    </Text>
                  </View>

                  <View style={styles.iconContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={"00.00"}
                      keyboardType="numeric"
                    />

                    <View style={styles.dropdown}>
                      <Picker
                        selectedValue={selectedValue}
                        style={{
                          height: responsiveHeight(6),
                          width: responsiveWidth(30),
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <Picker.Item label="m" value="m" />
                        <Picker.Item label="Km" value="km" />

                        {/* Add more items as needed */}
                      </Picker>
                    </View>
                  </View>
                </View>

                <Button
                  mode="contained"
                  style={styles.calculateButton}
                  buttonColor="#007BFF"
                  onPress={handleCalculate}
                >
                  Calculate
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <CalculatorSelect
        calculatorSelectModalVisible={calculatorSelectModalVisible}
        setCalculatorSelectModalVisible={setCalculatorSelectModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    right: responsiveWidth(-5),
    backgroundColor: "#F0F2F5",
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#DDDFE2",
    overflow: "hidden",
  },

  iconContainer: {
    marginTop: responsiveHeight(-0.7),
    flexDirection: "row",
  },
  inputContainer: {
    marginTop: responsiveHeight(4),
    width: responsiveWidth(85),
    marginBottom: responsiveHeight(2),
  },
  input: {
    width: responsiveWidth(50),
    marginLeft: 5,
    height: responsiveHeight(4.5),
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    marginTop: responsiveHeight(0.5),
  },

  headerText: {
    fontSize: responsiveFontSize(2),
  },
  calculateButton: {
    position: "absolute", // This line
    marginTop: responsiveHeight(49),
    width: "85%",
  },

  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
  },
  modalView: {
    marginTop: responsiveHeight(40),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "100%",
    height: responsiveHeight(60),
  },

  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default CalculatorSelectModel;
