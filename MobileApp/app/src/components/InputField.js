// InputField.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, icon }) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    width: 337,
    backgroundColor: "#fff",  
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 11,
  
  },
  input: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    color: "#65676b",
  },
});

export default InputField;
