import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useEffect } from "react";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Register");
    }, 3000);
  }, []);

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
