import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, InputField } from "../components";
import { Alert } from "react-native";
import BackButton from "../components/BackButton";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default function ForgotPassword({ route}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const { email } = route.params;

  const handleChangePassword =async () => {
    try{

      if (!newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (!(newPassword===confirmPassword)){
        Alert.alert("Error", "Passwords do not match");
        return;
      }
      const response = await fetch('http://192.168.1.100:5000/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Pass the relevant email here
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Password Changed Successfully",
          "Your password has been changed successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Error", data.error || "Password change failed.");
      }

    }
    catch{
      Alert.alert("Error", "An error occurred while changing password");
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
      
      <View style={styles.Content}>
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
      </View>
    </View>
    </TouchableWithoutFeedback>
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
  Content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  field: {
    marginTop: responsiveHeight(3),
  },
  button: {
    marginTop: responsiveHeight(3),
  },
});
