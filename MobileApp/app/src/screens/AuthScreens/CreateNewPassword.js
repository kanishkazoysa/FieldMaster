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
import { Alert } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Appbar, Button, TextInput } from "react-native-paper";
import axios from "axios";

export default function ForgotPassword({ route }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const { email } = route.params;

  const handleChangePassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (!(newPassword === confirmPassword)) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
      const response = await fetch('http://10.10.1.130:5000/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }
        ),
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
    } catch {
      Alert.alert("Error", "An error occurred while changing password");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
        </Appbar.Header>

        <View style={styles.Content}>
          <View style={styles.headerContainer}>
            <Text style={styles.head}>Create New Password</Text>
            <Text style={styles.text}>Password must be at least 8 digits</Text>
          </View>

          <View style={styles.field}>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                label="New Password"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                width={responsiveWidth(85)}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
            </View>

            <TextInput
              label="confirm Password"
              mode="outlined"
              outlineColor="#d9d7d2"
              activeOutlineColor="#007BFF"
              width={responsiveWidth(85)}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleChangePassword}
            style={styles.button}
          >
            Change Password
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  headerContainer: {
    width: "90%",
  },
  head: {
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
    height:
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10), // Adjusted height based on screen height
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
    marginTop: responsiveHeight(5),
    backgroundColor: "#007BFF",
    width: 337,
    padding: 2,
  },
});
