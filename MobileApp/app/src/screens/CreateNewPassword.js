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
import { Alert } from "react-native";


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
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.staticSection}></View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Create New Password</Text>
        <Text style={styles.text}>
        Password must be at least 8 digits
        </Text>

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

        <View style={styles.button}  >
          <Button title="Change Password" onPress={handleChangePassword} />
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
    top: 55,
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
    top: 120,
  },
  button: {
    position: "absolute",
    top: 280,
  },
});
