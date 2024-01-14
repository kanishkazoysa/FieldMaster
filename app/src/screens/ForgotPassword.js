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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    navigation.navigate("Otp");
  }
  return (
    <View style={styles.container}>
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}></View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Forgot Password</Text>
        <Text style={styles.text}>
          The verification code will be send to this email address
        </Text>

        <View style={styles.feild}>
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.button}  >
          <Button title="Continue" onPress={handleForgotPassword} />
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    left: 25,
  },
  text: {
    fontSize: 16,
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
    top: 140,
  },
  button: {
    position: "absolute",
    top: 210,
  },
});
