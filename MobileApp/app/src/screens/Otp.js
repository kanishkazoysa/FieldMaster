import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

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
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>OTP</Text>
          <Text style={styles.text}>
            Please enter the code that was sent to your email
          </Text>
        </View>

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
  headerContainer: {
    width: "90%",
    marginLeft: 5,
    marginTop: 1,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: height * 0.01,
  },
  text: {
    fontSize: width * 0.04,
    marginTop: height * 0.01,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? height * 0.07 : height * 0.1,
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  field: {
    flexDirection: "row",
    marginTop: height * 0.02,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 11,
    width: width * 0.1,
    height: width * 0.1,
    margin: Platform.OS === "android" ? width * 0.02 : width * 0.02,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: width * 0.06,
  },
  button: {
    marginTop: height * 0.03,
  },
});

export default Otp;
