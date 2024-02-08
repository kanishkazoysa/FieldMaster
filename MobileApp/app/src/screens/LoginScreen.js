import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, InputField } from "../components";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Appbar  } from "react-native-paper";

  export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
    const handleLogin = async () => {
      try {
        if (!email || !password) {
          Alert.alert("Please fill in all fields");
          return;
        }
  
        const response = await fetch(
          "http://192.168.1.100:5000/api/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
  
        if (response.ok) {
          Alert.alert(
            "Success",
            "Login successfully",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Welcome"),
              },
            ],
            { cancelable: false }
          );
        } else {
          const data = await response.json();
          Alert.alert("Error", data.error || "Something went wrong");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        Alert.alert("Error", "Something went wrong");
      }
    };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    navigation.navigate("Forgot");
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={styles.header} >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white"
        />
      </Appbar.Header>

        <View style={styles.textSection}>
          <Text style={styles.welcomeText}>Welcome </Text>
          <Text style={styles.signInText}>Sign in to continue</Text>
        </View>

        <View style={styles.field}>
          <View>
            <Text style={styles.feildText}>Email</Text>
            <InputField value={email} onChangeText={(text) => setEmail(text)} />
          </View>
          <View>
            <Text style={styles.feildText}>Password</Text>
            <InputField
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={styles.button}>
            <Button title="LOGIN" onPress={handleLogin} />
          </View>

          <View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signupText, styles.signupLink]}>Sign up</Text>
          </TouchableOpacity>
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
  welcomeText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    top: responsiveHeight(0.1),
  },
  signInText: {
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(-1),
  },
  container: {
    flex: 1,
  },
  feildText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.1),
  },
  staticSection: {
    height:
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10),
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  textSection: {
    marginLeft: responsiveWidth(5),
  },
  button: {
    top: responsiveHeight(4),
  },

  field: {
    width: "100%",
    top: responsiveHeight(5),
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: responsiveFontSize(2),
    textDecorationLine: "none",
    textAlign: "right",
    top: responsiveHeight(3),
  },
  signupTextContainer: {
    flexDirection: "row",
    marginLeft: responsiveWidth(6),
    top: responsiveHeight(15),
  },
  signupText: {
    color: "#000",
    fontSize: responsiveFontSize(2),
  },
  signupLink: {
    color: "#007BFF",
    marginLeft: responsiveFontSize(0.5),
    textDecorationLine: "none",
  },
});
