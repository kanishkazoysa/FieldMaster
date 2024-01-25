import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        Alert.alert("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }

      const response = await fetch(
        "http://192.168.1.140:5000/api/users/register", //  Set your host variable here
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "User registered successfully");
        navigation.navigate("Login");
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* Static section at the top */}
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
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.header}>Hi !</Text>
            <Text style={styles.text}>Create a new account</Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={require("../images/register_img.png")}
              style={styles.img}
            />
          </View>

          <View style={styles.feild}>
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
              secureTextEntry={true}
              icon={faLock}
             showEyeIcon={true} 
              onPressEye={() => setShowPassword(!showPassword)} 
            />

            <InputField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
              icon={faLock}
            />
            <View style={styles.button}>
              <Button title="SIGN UP" onPress={handleSignUp} />
            </View>
          </View>

          <View style={styles.loginTextContainer}>
            <Text style={styles.signupText}>Have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.signupText, styles.signupLink]}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyTermsContainer}>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              By clicking "Sign up" you agree to our
            </Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={" "}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 14 }}> and </Text>
              <TouchableOpacity onPress={" "}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 5,
    top: 5,
  },
  text: {
    fontSize: 18,
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
  feild: {
    width: "100%",
    top: Platform.OS === "ios" ? 15 : 15,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
  },

  loginTextContainer: {
    flexDirection: "row",
    top: Platform.OS === "ios" ? 40 : 40,
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
  privacyTermsContainer: {
    top: Platform.OS === "ios" ? 180 : 110,
    alignItems: "center",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: 14,
  },
  imgContainer: {
    alignItems: "center",
    
  },
  img: {
    width: 120,
    borderRadius: 11,
    height: 120,
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: Platform.OS === "ios" ? 30 : 20,
  },
});
