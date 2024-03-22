import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Appbar, TextInput, Button } from "react-native-paper";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        "http://10.10.29.38:5000/api/mail/otp",
        { email }
      );

      if (response.status == 200) {
        const data = await response.data.otp;

        Alert.alert("OTP sent successfully");

        navigation.navigate("Otp", { email, Otp: data });
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Internal Server Error");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
        </Appbar.Header>

        <View style={styles.Content}>
          <View style={styles.headerContainer}>
            <Text style={styles.head}>Forgot Password</Text>
            <Text style={styles.text}>
              The verification code will be sent to this email address
            </Text>
          </View>

          <View style={styles.field}>
            <TextInput
              label="email"
              mode="outlined"
              outlineColor="#d9d7d2"
              activeOutlineColor="#007BFF"
              width={responsiveWidth(85)}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleForgotPassword}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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

  headerContainer: {
    width: "90%",
  },
  head: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginTop: "3%",
  },
  text: {
    fontSize: responsiveFontSize(2),
    marginTop: "1%",
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height:
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10), // Adjusted height based on screen height
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  field: {
    marginTop: responsiveHeight(3),
  },
  button: {
    marginTop: responsiveHeight(5),
    backgroundColor: "#007BFF",
    width: 337,
    padding: 2,
  },
});
