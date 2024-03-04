import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

const CalculatorModel = ({
  calculatorModalVisible,
  setCalculatorModalVisible,
}) => {
  const [selectedValue, setSelectedValue] = useState("sqm");
  const closeModal = () => {
    setCalculatorModalVisible(false);
  };

  const navigation = useNavigation();

  return (
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

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              iconColor="#000"
              size={30}
              onPress={closeModal}
              style={styles.cancelButton}
            />

            <Text style={styles.headerText}>Manual Calculator</Text>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <AntDesign name="piechart" size={24} color="#65676B" />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Area</Text>
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
                    style={{ height: 40, width: 110,}}
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
              <MaterialCommunityIcons name="vector-rectangle" size={28} color="#65676B" />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Perimeter</Text>
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
                    style={{ height: 40, width: 110,}}
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
            >
              Calculate
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 30,
    backgroundColor: "#F0F2F5",
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#DDDFE2",
    overflow: "hidden",
  },

  iconContainer: {
    flexDirection: "row",
    
  },
  inputContainer: {
    marginTop: 30,
    width: "95%",
    marginBottom: 10,
  },
  input: {
    width: "60%",
    marginLeft: 5,
    height: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    marginTop: 5,
  },

  headerText: {
    fontSize: 16,
  },
  calculateButton: {
    position: "absolute",
    bottom: "5%",
    width: 200,
  },

  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
  },
  modalView: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
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
    height: "45%",
  },

  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default CalculatorModel;
