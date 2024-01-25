// InputField.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, icon, showEyeIcon, onPressEye }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    onPressEye && onPressEye(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#C5C7CB"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
      />
      {showEyeIcon && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.touchableArea}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    width: "90%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 11,
    position: "relative",
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
  iconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableArea: {
    padding: 10, // Increase padding here
  },
  eyeIcon: {
    color: "#65676b",
  },
});

export default InputField;
