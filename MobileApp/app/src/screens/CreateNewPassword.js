import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { Alert } from "react-native";
import BackButton from "../components/BackButton";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleChangePassword = () => {
    // Perform your password change logic here

    // Assuming your password change is successful, show the success message
    Alert.alert(
      "Password Changed Successfully",
      "Your password has been changed successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate to the desired screen or perform any other action
            navigation.navigate("Login"); // Change this to the screen you want to navigate to
          },
        },
      ],
      { cancelable: false }
    );
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
          <Text style={styles.header}>Create New Password</Text>
          <Text style={styles.text}>Password must be at least 8 digits</Text>
        </View>

        <View style={styles.field}>
          <InputField
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <View style={styles.button}>
          <Button title="Change Password" onPress={handleChangePassword} />
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
