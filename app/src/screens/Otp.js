import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();

  const handleContinue = () => {
    // Implement logic to handle OTP verification
    console.log("Entered OTP:", otp.join(""));
    navigation.navigate("NewPassword");
  };

  const handleChangeOtp = (index, value) => {
    // Update the OTP array when a digit is entered
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}></View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>OTP</Text>
        <Text style={styles.text}>
          Please enter the code that was sent to your email
        </Text>

        <View style={styles.field}>
          {/* Render 6 TextInput components for OTP entry */}
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeOtp(index, text)}
              maxLength={1}
              keyboardType="numeric"
            />
          ))}
        </View>

        <View style={styles.button}>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    left: 25,
  },
  text: {
    fontSize: 16,
    position: "absolute",
    top:55,
    width: 337,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    padding: 16,
    height: 100,
    backgroundColor: "#007BFF", // Set your desired background color
    borderBottomWidth: 1,
    borderBottomColor: "#007BFF", // Set your desired border color
    color: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  field: {
    flexDirection: "row",
    marginTop: 100,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 11,
    width: 45,
    height: 45,
    margin: 7,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    position: "absolute",
    top: 200,
  },
});
