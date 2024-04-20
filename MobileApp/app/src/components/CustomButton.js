import React from "react";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

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
    width: responsiveWidth(95),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(1.5),
    borderRadius: 11,
  },
  buttonText: {
    color: "white",
    fontSize: responsiveFontSize(2),
 
  },
};

export default CustomButton;
