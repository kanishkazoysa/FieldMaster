import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert, // Import Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert("Please fill in all fields");
        return;
      }

      const response = await fetch("http://192.168.1.100:5000/api/mail/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert("OTP sent successfully");
        navigation.navigate("Otp", { email, Otp: data.otp});
      } else {
        const data = await response.json();
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
        <View style={styles.staticSection}>
          <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.Content}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Forgot Password</Text>
            <Text style={styles.text}>
              The verification code will be sent to this email address
            </Text>
          </View>

          <View style={styles.field}>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.button}>
            <Button title="Continue" onPress={handleForgotPassword} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "90%",
  },
  header: {
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
    marginTop: responsiveHeight(1),
  },
});
