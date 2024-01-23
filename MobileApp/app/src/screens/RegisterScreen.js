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
import { textStyles } from "../styles/styles";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Logging in...", { username, password });
    navigation.navigate("Login");
  };
 

  return (
    <View style={styles.container}>
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}></View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Hi !</Text>
        <Text style={styles.text}>Create a new account</Text>

        <View style={styles.feild}>
          <InputField
            placeholder="Email"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <InputField
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <InputField
            placeholder="Confirm Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        <View style={styles.button}>
          <Button title="SIGN UP" onPress={handleLogin} />
        </View>

        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.signupText, styles.signupLink]}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.privacyTermsContainer}>
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            By clicking "Sign up" you agree to our
          </Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={" "}>
              <Text style={styles.link}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12 }}> and </Text>
            <TouchableOpacity onPress={" "}>
              <Text style={styles.link}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
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
    top: 20,
    left: 25,
  },
  text: {
    fontSize: 20,
    position: "absolute",
    top: 70,
    left: 25,
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
  feild: {
    position: "absolute",
    top: 220,
  },
  button: {
    position: "absolute",
    top: 480,
  },
  forgotPasswordText: {
    marginTop: 440,
    color: "#007BFF",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "none",
  },
  signupTextContainer: {
    flexDirection: "row",
    marginTop: 550,
    width: 337,
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
  privacyTermsContainer: {
    width: 337,
    marginTop: 100,
    marginBottom: 12,
    alignItems: "center",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: 12,
  },
});
