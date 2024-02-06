import React, { useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";


WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId:"1002701216584-p77alfohcrqcd3seea2ht2ll1sk4knug.apps.googleusercontent.com",
  iosClientId:"1002701216584-p77alfohcrqcd3seea2ht2ll1sk4knug.apps.googleusercontent.com",
  webClientId:"1002701216584-e9rmdbv6rk7a0ffg9c6v55sl697v5r5m.apps.googleusercontent.com"
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);


  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === 'success') {
      await getUserInfo(response.authentication.accessToken);
      }
    }
    else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      
    }
  };

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
        "http://192.168.1.100:5000/api/users/register",
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
          "User registered successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Welcome"),
            },
          ],
          { cancelable: false }
        );
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      <View style={styles.textSection}>
        <Text style={styles.header}>Hi!</Text>
        <Text style={styles.text}>Create a new account</Text>
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
            secureTextEntry={!showPassword}
            showEyeIcon={true}
            onPressEye={() => setShowPassword(!showPassword)}
          />
        </View>

        <View>
          <Text style={styles.feildText}>Confirm Password</Text>
          <InputField
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showConfirmPassword}
            showEyeIcon={true}
            onPressEye={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        <View style={styles.button}>
          <Button title="SIGN UP" onPress={handleSignUp} />
        </View>
      </View>

      <View style={styles.loginTextContainer}>
        <Text style={styles.signupText}>Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.signupText, styles.signupLink]}>Log in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}> or</Text>
        <View style={styles.line}></View>
      </View>

     <View style={styles.userInfo}>
     <Text style={{fontSize:responsiveFontSize(1)}}>{JSON.stringify(userInfo , null ,2 )}</Text>
     </View>

      <View style={styles.Googlebutton}>
          <Button title="GOOGLE SIGN IN" onPress={ () => promptAsync()} />
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(5),
  },
  Googlebutton: {
    top: responsiveHeight(5),
    alignItems: "center",
  },
  header: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    top: responsiveHeight(0.1),
  },
  text: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(-1),
  },
  feildText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.1),
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
  textSection: {
    marginLeft: responsiveWidth(5),
  },
  field: {
    width: "100%",
    top: responsiveHeight(5),
    alignItems: "center",
  },

  button: {
    marginTop: responsiveHeight(3),
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(13),
  },

  line: {
    width: responsiveWidth(35),
    height: 1,
    backgroundColor: "#CED0D4",
  },
  orText: {
    fontSize: responsiveFontSize(2),
    marginHorizontal: responsiveWidth(2),
    color: "#000",
  },

  loginTextContainer: {
    
    flexDirection: "row",
    marginLeft: responsiveWidth(8),
    top: responsiveHeight(8),
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
    fontSize: responsiveFontSize(1.5),
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(0.5),
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: responsiveFontSize(1.5),
  },
  andText: {
    fontSize: responsiveFontSize(1.5),
  },
});
