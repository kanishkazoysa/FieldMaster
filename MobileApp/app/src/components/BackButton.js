import React from "react";
import { Platform } from "react-native";
import { IconButton } from "react-native-paper";

const BackButton = ({ navigation }) => (
  <IconButton
    style={{ marginTop:Platform.OS === "ios" ? 60 : 20}}
    icon="arrow-left"
    iconColor="#fff"
    size={24}
    onPress={() => navigation.goBack()}
  />
);

export default BackButton;
