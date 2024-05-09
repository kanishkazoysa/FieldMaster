import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { Appbar, TextInput, Button , Avatar } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const ProfileManagement = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
      </Appbar.Header>

      <View style={styles.section1}>
      <Avatar.Image size={responsiveFontSize(17)} style={styles.Avatar} />
      </View>
      <View style={styles.section2}>
        <Text style={styles.text1}>Your Information</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            //   value={email}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            //   value={email}
          />
          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            //   value={email}
          />
        </View>
        <Button mode="contained"  style={styles.button}>
            Confirm
          </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section2: {
    flex: 2,
  },
  text1: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(8),
  },
  inputContainer: {
    marginTop: responsiveHeight(3),
    alignItems: "center",
  },
  inputField: {
    width: responsiveWidth(87),
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(2),
    borderRadius: 15,
  },
  button: {
    marginTop: responsiveHeight(10),
    backgroundColor: "#007BFF",
    width: responsiveWidth(60),
    padding: responsiveHeight(0),
    alignSelf: "center",
  },
  Avatar: {
    
  },
});

export default ProfileManagement;
