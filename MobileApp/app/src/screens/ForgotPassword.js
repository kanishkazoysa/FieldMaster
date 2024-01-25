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
import { Button, InputField } from "../components";
import BackButton from "../components/BackButton";

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
            The verification code will be send to this email address
          </Text>
        </View>

        <View style={styles.feild}>
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
    width: "100%",
    left: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    top: 10,
  },
  text: {
    fontSize: 16,
    top: 20,
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? 65 : 95,
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  feild: {
    top: 60,
  },
  button: {
    top: 80,
  },
});
