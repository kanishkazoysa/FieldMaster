import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Logging in...", { email, password });
    navigation.navigate("Welcome");
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    navigation.navigate("Forgot");
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      <KeyboardAvoidingView
        style={styles.scrollSection}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.textSection}>
            <Text style={styles.welcomeText}>Welcome </Text>
            <Text style={styles.signInText}>Sign in to continue</Text>
          </View>

          <View style={styles.imgContainer}>
            <Image
              source={require("../images/login_img.png")}
              style={styles.img}
            />
          </View>

          <View style={styles.field}>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              icon={faEnvelope}
            />

            <InputField
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              icon={faLock}
            />

            <Button title="LOGIN" onPress={handleLogin} />

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[styles.signupText, styles.signupLink]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: width * 0.07, // Adjusted font size based on screen width
    fontWeight: "bold",
    paddingBottom: 5,
    top: 5,
  },
  signInText: {
    fontSize: width * 0.035, // Adjusted font size based on screen width
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? height * 0.07 : height * 0.1, // Adjusted height based on screen height
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  scrollSection: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  textSection: {
    marginLeft: width * 0.05, // Adjusted margin based on screen width
  },
  imgContainer: {
    alignItems: "center",
  },
  img: {
    width: width * 0.9,
    borderRadius: 11,
    height: height * 0.33,
    marginTop: Platform.OS === "ios" ? height * 0.03 : height * 0.02,
    marginBottom: Platform.OS === "ios" ? height * 0.02 : height * 0.02,
  },
  field: {
    width: "100%",
    marginBottom: height * 0.03, // Adjusted margin based on screen height
    top: height * 0.03, // Adjusted top based on screen height
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: width * 0.035, // Adjusted font size based on screen width
    textDecorationLine: "none",
    textAlign: "right",
  },
  signupTextContainer: {
    flexDirection: "row",
    top: Platform.OS === "ios" ? height * 0.11 : height * 0.09, // Adjusted top based on screen height
    marginLeft: width * 0.05, // Adjusted margin based on screen width
  },
  signupText: {
    color: "#000",
    fontSize: width * 0.035, // Adjusted font size based on screen width
  },
  signupLink: {
    color: "#007BFF",
    marginLeft: width * 0.02, // Adjusted margin based on screen width
    textDecorationLine: "none",
  },
});
