import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    navigation.navigate("Otp");
  };

  return (
    <View style={styles.container}>
      {/* Static section at the top */}
      <View style={styles.staticSection}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <BackButton navigation={navigation} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Forgot Password</Text>
          <Text style={styles.text}>
            The verification code will be sent to this email address
          </Text>
        </View>

        <View style={styles.field}>
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.button}>
          <Button title="Continue" onPress={handleForgotPassword} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "90%",
    marginLeft: 5,
    marginTop: 1,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: height * 0.01,
  },
  text: {
    fontSize: width * 0.04,
    marginTop: height * 0.01,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? height * 0.07 : height * 0.1,
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  field: {
    marginTop: height * 0.02,
  },
  button: {
    marginTop: height * 0.02,
  },
});
