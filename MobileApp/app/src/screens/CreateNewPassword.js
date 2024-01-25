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
import { Alert } from "react-native";
import BackButton from "../components/BackButton";

export default function ForgotPassword() {
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
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

        <View style={styles.feild}>
          <InputField
            placeholder="New Password"
            value={NewPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <InputField
            placeholder="Confirm Password"
            value={ConfirmPassword}
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
