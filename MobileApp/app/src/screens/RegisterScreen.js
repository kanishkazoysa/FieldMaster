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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");

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
        "http://192.168.1.140:5000/api/users/register",
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
          <View style={styles.scrollContent}>
            <View style={styles.textSection}>
              <Text style={styles.header}>Hi!</Text>
              <Text style={styles.text}>Create a new account</Text>
            </View>
            <View style={styles.imgContainer}>
              <Image
                source={require("../images/register_img.png")}
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
                secureTextEntry={!showPassword}
                icon={faLock}
                showEyeIcon={true}
                onPressEye={() => setShowPassword(!showPassword)}
              />

              <InputField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={!showPassword}
                icon={faLock}
              />
              <View style={styles.button}>
                <Button title="SIGN UP" onPress={handleSignUp} />
              </View>
            </View>

            <View style={styles.loginTextContainer}>
              <Text style={styles.signupText}>Have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.signupText, styles.signupLink]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.privacyTermsContainer}>
              <Text style={styles.privacyText}>
                By clicking "Sign up" you agree to our
              </Text>
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.link}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.andText}> and </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.link}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    top: responsiveHeight(0.1),
  },
  text: {
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(-1),
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height:
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10), // Adjusted height based on screen height
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
    marginLeft: responsiveWidth(5),
  },
  imgContainer: {
    alignItems: "center",
  },
  img: {
    resizeMode: "contain",
    borderRadius: 11,
    width: responsiveWidth(30),
    height: responsiveHeight(20),
    marginTop: responsiveHeight(1),
  },
  field: {
    width: responsiveWidth(100),
    top: responsiveHeight(1.2),
    alignItems: "center",
  },
  button: {
    marginTop: responsiveHeight(2),
  },
  loginTextContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: responsiveWidth(6),
    top: responsiveHeight(10),
  },

  signupText: {
    color: "#000",
    fontSize: responsiveFontSize(2),
  },

  signupLink: {
    color: "#007BFF",
    marginLeft: 7,
    textDecorationLine: "none",
  },
  privacyTermsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:
      Platform.OS === "android" ? responsiveHeight(1) : responsiveHeight(2.5),
  },

  privacyText: {
    fontSize: width * 0.035,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.005,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: width * 0.035,
  },
  andText: {
    fontSize: width * 0.035,
  },
});
