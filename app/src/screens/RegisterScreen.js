// RegisterScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { textStyles } from "../styles/styles";

export default function RegisterScreen({ }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // useEffect(() => {
  //   const onBackPress = () => {
  //     // Do nothing when the hardware back button is pressed
  //     return true;
  //   };

  //   // Disable the hardware back button
  //   const backHandler = navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //     onBackPress();
  //   });

  //   // Clean up the event listener when the component is unmounted
  //   return () => backHandler.remove();
  // }, [navigation]);

  const handleRegister = () => {
    console.log("Registering...", { username, email, password });

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.h1}>Register</Text>

      <InputField
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    padding: 16,
  },
});
