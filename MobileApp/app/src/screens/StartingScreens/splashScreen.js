import { StyleSheet, View, StatusBar} from "react-native";
import React, { useEffect } from "react";
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
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animatable.Image 
        source={require("../../images/logo.png")} 
        style={styles.image} 
        duration={2000}
        animation="zoomIn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#888",
  },
});

export default SplashScreen;
