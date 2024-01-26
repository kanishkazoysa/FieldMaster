import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // code for when back button is pressed on the device see the animation again

  //start
  const isFocused = useIsFocused();
  // Declare refs for Animatable.Image components
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    if (isFocused) {
      // Reset animations when the component is focused
      if (img1Ref.current) {
        img1Ref.current.bounceInDown(3500);
      }
      if (img2Ref.current) {
        img2Ref.current.bounceIn(5000);
      }
    }
  }, [isFocused]);

  //end

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <View style={styles.imgSection}>
        {/* <Image source={require("../images/logo.png")} style={styles.logo} /> */}
        <Animatable.Image
          ref={img2Ref}
          source={require("../images/new.png")}
          style={styles.img2}
          duration={5000}
          animation="bounceIn"
        />
        <Animatable.Image
          ref={img1Ref}
          source={require("../images/welcome_1.png")}
          style={styles.img1}
          duration={3500}
          animation="bounceInDown"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.header}>Hello !</Text>
        <Text style={styles.text}>
          Your app for accurate and efficient measurements in the real world.
        </Text>
        <Button
          title="SIGN UP"
          onPress={() => navigation.navigate("Register")}
        />
        <Button title="LOGIN" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imgSection: {
    flex: 1.1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  contentSection: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  img1: {
    resizeMode: "contain",
    position: "absolute",
    top: "49%",
    left: "50%",
  },

  img2: {
    resizeMode: "contain",
    position: "absolute",
    top: "40%",
    width: "100%",
  },
  header: {
    position: "absolute",
    top: "0.1%",
    fontWeight: "bold",
    fontSize: 28,
  },
  text: {
    position: "absolute",
    top: "10%",
    width: 337,
    textAlign: "center",
  },
});
