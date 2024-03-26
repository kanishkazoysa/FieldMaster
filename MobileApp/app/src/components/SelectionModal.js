import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CalculatorInput from "./calculator/calculatorInput";

const SelectionModal = ({ modalVisible, setModalVisible, options  }) => {
  const closeModal = () => {
    setModalVisible(false);
  };
  const [calculatorModalVisible, setCalculatorModalVisible] = useState(false);
  const navigation = useNavigation();

 

  const handleOptionClick = (option, index) => {
    if (index === 0) {
      navigation.navigate("WalkaroundLand");
    }
    if (index === 2) {
     
        setCalculatorModalVisible(true);
      
    }
    closeModal();
  };

  return (
    <View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1} 
          onPress={closeModal}
        />

        <View style={styles.centeredView}>
          <IconButton
            icon="close"
            iconColor="white"
            size={30}
            onPress={closeModal}
            style={styles.cancelButton}
          />
          <View style={styles.modalView}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleOptionClick(option, index)}
              >
                <View style={styles.innerView1}>
                  <IconButton icon={option.icon} iconColor="white" size={45} />
                </View>
                <View style={styles.innerView2}>
                  <Text style={styles.modelHeader}>{option.Header}</Text>
                  <Text style={styles.modelText}>{option.Text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    
    </Modal>
    <CalculatorInput
    calculatorModalVisible={calculatorModalVisible} 
    setCalculatorModalVisible={setCalculatorModalVisible} 
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7 )", // Semi-transparent overlay color
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "80%",
    height: "50%",
  },
  modalOption: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 11,
  },
  modelHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modelText: {
    marginTop: 10,
    color: "white",
    fontSize: 12,
  },

  innerView1: {
    alignItems: "center",
    flex: 1.2,
    height: "100%",
  },
  innerView2: {
    flex: 4,
    height: "100%",
  },
  cancelButton: {
    position: "absolute",
    top: 160,
    right: 25,
  },
});

export default SelectionModal;
