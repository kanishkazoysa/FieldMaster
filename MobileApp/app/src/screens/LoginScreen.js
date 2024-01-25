import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../components/BackButton";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Logging in...", { username, password });
    navigation.navigate("Welcome");
  };
  const handleForgotPassword = () => {
    // Handle the logic for forgot password (e.g., navigate to the forgot password screen)
    console.log("Forgot Password");
    navigation.navigate("Forgot");
  };

  const handleSignUp = () => {
    // Navigate to the register screen when "Sign in" is pressed
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}>
        <BackButton navigation={navigation} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Welcome !</Text>
        <Text style={styles.text}>Sign in to continue</Text>

        <View style={styles.feild}>
          <InputField
            placeholder="Email"
            value={username}
            onChangeText={(text) => setUsername(text)}
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
        </View>

        <Image source={require("../images/login_img.png")} style={styles.img} />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signupText, styles.signupLink]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    position: "absolute",
    top: 1,
    left: 20,
  },
  text: {
    fontSize: 20,
    position: "absolute",
    top: 43,
    left: 20,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    flex: 0.12,
    flexDirection: "row",
    justifyContent:"  center",
    alignItems: "center",
    backgroundColor: "#007BFF", // Set your desired background color
  },
  scrollContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  feild: {
    position: "absolute",
    alignItems: "center",
    top: "45%",
  },
  forgotPasswordText: {
    position: "absolute",
    color: "#007BFF",
    left: 20,
    top: "70%",
    fontSize: 16,
    textDecorationLine: "none",
  },
  signupTextContainer: {
    flexDirection: "row",
    marginTop: 490,
  },
  signupText: {
    color: "#000",
    fontSize: 16,
  },
  signupLink: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: 16,
  },
  img: {
    top: 100,
    width: 170,
    height: 170,
  },
});
