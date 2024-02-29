import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Button from "../components/Button";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const handleContinue = () => {
    // Implement logic to handle OTP verification
    console.log("Entered OTP:", otp.join(""));
    navigation.navigate("NewPassword");
  };

  const handleChangeOtp = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input when a digit is entered
    if (value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    // Handle "Backspace" key press to clear the previous input
    if (key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    // Reset OTP when the component is focused (navigated to)
    if (isFocused) {
      setOtp(["", "", "", "", "", ""]);
      inputRefs[0].current.focus();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}></View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>OTP</Text>
        <Text style={styles.text}>
          Please enter the code that was sent to your email
        </Text>

        <View style={styles.field}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeOtp(index, text)}
              maxLength={1}
              keyboardType="numeric"
              ref={inputRefs[index]}
              onSubmitEditing={() => {
                if (index < 5) {
                  inputRefs[index + 1].current.focus();
                }
              }}
              onKeyPress={({ nativeEvent: { key } }) =>
                handleKeyPress(index, key)
              }
            />
          ))}
        </View>

        <View style={styles.button}>
          <Button title="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </View>
  );
};

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
    top: 55,
    width: 337,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    padding: 16,
    height: 100,
    backgroundColor: "#007BFF",
    borderBottomWidth: 1,
    borderBottomColor: "#007BFF",
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
    borderColor: "#C4C4C4",
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

export default Otp;
