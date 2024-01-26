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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


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
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginTop: "3%",
  },
  text: {
    fontSize: responsiveFontSize(2),
    marginTop: "1%",
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height: Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10), // Adjusted height based on screen height
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  field: {
    marginTop: responsiveHeight(3),
  },
  button: {
    marginTop: responsiveHeight(1),
  },
});
