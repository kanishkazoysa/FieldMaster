import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StatusBar,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Appbar, Button } from "react-native-paper";
import axios from "axios";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const Otp = ({ route }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());
  const { Otp, email } = route.params;


  // Implement logic to handle OTP verification
  const handleContinue = async () => {
    const enteredOTP = otp.join("");
    try {
      const response = await axios.post(`http://10.10.5.238:5000/api/mail/verify`, {email, enteredOTP});

      if (response.ok) {
        console.log("OTP is correct, navigating to NewPassword screen.");
        navigation.navigate("NewPassword", { email });
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error);
      }
    
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
  };
  const handleTryAgain = async () => {
    const response = await fetch("http://10.10.20.85:5000/api/mail/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
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
            <Text style={styles.head}>OTP</Text>
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

          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
          >
            Continue
          </Button>
          <Button
            mode="contained"
            onPress={handleTryAgain}
            style={styles.button}
          >
            Try Again
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10),
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
    margin:
      Platform.OS === "android" ? responsiveHeight(0.5) : responsiveHeight(0.5),
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  },
  button: {
    marginTop: responsiveHeight(5),
    backgroundColor: "#007BFF",
    width: 337,
    padding: 2,
  },
});

export default Otp;
