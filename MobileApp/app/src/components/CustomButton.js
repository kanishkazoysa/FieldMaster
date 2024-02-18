import React from "react";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomButton = ({ onPress, text, iconName, iconColor, buttonColor, textStyle }) => {
  return (
    <Button
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}
      labelStyle={[styles.buttonText, textStyle]}
      icon={() => <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />}
    >
      {text}
    </Button>
  );
};

const styles = {
  button: {
    width: 337,
    height: 40,
    marginTop: 10,
    borderRadius: 11,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto", // Change the font family as needed
  },
};

export default CustomButton;
