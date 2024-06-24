import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dialog, Portal, Button, IconButton } from "react-native-paper";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const CustomAlert = ({ isVisible, onClose, title, message, type }) => {
  let backgroundColor;
  let iconName;
  let iconColor;

  switch (type) {
    case "success":
      backgroundColor = "#d4edda";
      iconName = "check-circle";
      iconColor = "#28a745";
      break;
    case "error":
      backgroundColor = "#f8d7da";
      iconName = "alert-circle";
      iconColor = "#dc3545";
      break;
    default:
      backgroundColor = "#fff";
      iconName = "information";
      iconColor = "#17a2b8";
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onClose} style={[styles.dialog, { backgroundColor }]}>
        <Dialog.Title>
          <View style={styles.titleContainer}>
            <IconButton icon={iconName} color={iconColor} size={24} />
            <Text style={styles.title}>{title}</Text>
          </View>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} mode="text">
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 10,
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: 5,
  },
  message: {
    fontSize: responsiveFontSize(2),
  },
});

export default CustomAlert;
