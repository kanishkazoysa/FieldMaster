import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Button } from "../components";
import BackButton from "../components/BackButton";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";



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
    height: Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10),
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
    marginTop: responsiveHeight(3),
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 11,
    width: responsiveWidth(13),
    height: responsiveHeight(7),
    margin: Platform.OS === "android" ? responsiveHeight(0.5) :responsiveHeight(0.5),
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  },
  button: {
    marginTop: responsiveHeight(4),
  },
});

export default Otp;
