// Import necessary modules and components
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../components/BackButton";

// Define the LoginScreen component
export default function LoginScreen() {
  // State variables for username and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigation hook
  const navigation = useNavigation();

  // Function to handle login
  const handleLogin = () => {
    console.log("Logging in...", { username, password });
    navigation.navigate("Welcome");
  };

  // Function to handle forgot password
  const handleForgotPassword = () => {
    console.log("Forgot Password");
    navigation.navigate("Forgot");
  };

  // Function to handle sign up
  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    // Main container
    <View style={styles.container}>
      {/* Static section */}
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      {/* Scrollable section with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={styles.scrollSection}
        behavior={Platform.OS === "ios" ? "padding" : "margin"}
        enabled
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Welcome text */}
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.welcomeText}>Welcome </Text>
            <Text style={styles.signInText}>Sign in to continue</Text>
          </View>

          {/* Image */}
          <View style={styles.imgContainer}>
            <Image
              source={require("../images/login_img.png")}
              style={styles.img}
            />
          </View>

          {/* Input fields, button, and other components */}
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

          {/* Sign up text */}
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

// Stylesheet
const styles = StyleSheet.create({
  // Define styles for various components
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 5,
    top: 5,
  },
  signInText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? 65 : 95,
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
  field: {
    width: "100%",
    marginBottom: 20,
    top: 20,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: 16,
    textDecorationLine: "none",
    textAlign: "right",
  },
  signupTextContainer: {
    flexDirection: "row",
    top: Platform.OS === "ios" ? 110 : 50,
    marginLeft: 20,
  },
  signupText: {
    color: "#000",
    fontSize: 16,
  },
  signupLink: {
    color: "#007BFF",
    marginLeft: 5,
    textDecorationLine: "none",
  },
  imgContainer: {
    alignItems: "center",
    
  },
  img: {
    width: "90%",
    borderRadius: 11,
    height: 240,
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
  },
});
