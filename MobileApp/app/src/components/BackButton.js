import React from "react";
import { IconButton } from "react-native-paper";

const BackButton = ({ navigation }) => (
  <IconButton
  style={{marginTop: "8%", marginLeft: "1%",}}
    icon="arrow-left"
    iconColor="#fff"
    size={24}
    onPress={() => navigation.goBack()}
  />
);

export default BackButton;
