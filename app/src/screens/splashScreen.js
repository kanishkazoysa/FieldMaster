import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useEffect } from "react";
import * as Animatable from 'react-native-animatable';
import { CommonActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset the navigation stack to "Welcome" screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        })
      );
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.Image 
      source={require("../images/logo.png")} 
      style={styles.image} 
      duration={2000}
      animation="zoomIn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    marginTop: -100,
    resizeMode: "contain",
  },
});

export default SplashScreen;
