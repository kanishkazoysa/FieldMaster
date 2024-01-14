// App.js
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import StartScreen from "./src/screens/StartScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { IconButton } from "react-native-paper";
import SplashScreen from "./src/screens/splashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide-in/slide-out animation
        }}
      >
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                iconColor="#fff"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                iconColor="#fff"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
