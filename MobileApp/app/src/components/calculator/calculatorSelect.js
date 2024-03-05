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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const CalculatorModel = ({
  calculatorSelectModalVisible,
  setCalculatorSelectModalVisible,
}) => {
  const [selectedValue, setSelectedValue] = useState("sqm");
  const closeModal = () => {
    setCalculatorSelectModalVisible(false);
  };

  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={calculatorSelectModalVisible}
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

            <View style={styles.buttonContainer}>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.Googlebutton}
                  onPress={() => promptAsync()}
                >
                <View style={{flexDirection:"row"}}>
                  <View style={{ left: -20 }}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="black"
                    />
                  </View>

                  <View>
                    <Text style={{ marginTop: 8, left: -3 }}>
                      SIGN WITH GOOGLE
                    </Text>
                  </View>
                  </View>

                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.Googlebutton}
                  onPress={() => promptAsync()}
                >
                  <View style={{ left: -20 }}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 8, left: -3 }}>
                      SIGN WITH GOOGLE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.Googlebutton}
                  onPress={() => promptAsync()}
                >
                  <View style={{ left: -20 }}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 8, left: -3 }}>
                      SIGN WITH GOOGLE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
 
  Googlebutton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 24,
    color: "#007BFF",
    width: 330,
    padding: 5.9,
  },
  buttonContainer: {
    marginTop: "20%",
    flexDirection: "column",
    width: 337,
  },
  button: {
    marginBottom: 20,
    justifyContent: "center",
  },

  headerText: {
    fontSize: 16,
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
