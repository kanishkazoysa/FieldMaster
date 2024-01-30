import React, { useState ,useCallback } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation ,useFocusEffect } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../components/BackButton";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

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
  
      const response = await fetch("http://192.168.1.100:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
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

  return (
    <View style={styles.container}>
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      <KeyboardAvoidingView
        style={styles.scrollSection}
        behavior={Platform.OS === "ios" ? "padding" : "margin"}
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
    width: responsiveWidth(90),
    borderRadius: 11,
    height: responsiveHeight(35),
    marginTop: responsiveHeight(2),
  },
  field: {
    width: "100%",
    top: responsiveHeight(3),
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007BFF",
    fontSize: responsiveFontSize(2),
    textDecorationLine: "none",
    textAlign: "right",
  },
  signupTextContainer: {
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
    marginLeft: responsiveFontSize(0.5),
    textDecorationLine: "none",
  },
});
