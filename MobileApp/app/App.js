// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { IconButton } from "react-native-paper";
import SplashScreen from "./src/screens/splashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import Otp from "./src/screens/Otp";
import CreateNewPassword from "./src/screens/CreateNewPassword";
import Home from "./src/screens/Home";
import BackButton from "./src/components/BackButton";
import Fence from "./src/screens/Fence";
import FenceDetails from "./src/screens/FenceDetails";
import Plantation from "./src/screens/Plantation";
import TemplateView from "./src/screens/TemplateView";
import PlantationDetails from "./src/screens/PlantationDetails";
import Fertilization from "./src/screens/Fertilization";
import FertilizationDetails from "./src/screens/FertilizationDetails";
import SavedTemplatesScreen from "./src/screens/SavedTemplatesScreen;";
import EditTemplate from "./src/screens/EditTemplate";
import ResizeMap from "./src/screens/ResizeMap";

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
        <Stack.Screen name="splashScreen" component={SplashScreen} />
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
            headerShown: false,
            title: "",
            headerTransparent: true,
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
            headerTransparent: true,
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
            headerTransparent: true,
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
            headerTransparent: true,
            headerLeft: () => <BackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="NewPassword"
          component={CreateNewPassword}
          options={({ navigation }) => ({
            headerShown: false,
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
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
          })}
        />
        <Stack.Screen name="TemplateView" component={TemplateView} />

        <Stack.Screen name="Fence" component={Fence} />
        <Stack.Screen name="FenceDetails" component={FenceDetails} />
        <Stack.Screen name="Plantation" component={Plantation} />
        <Stack.Screen name="PlantationDetails" component={PlantationDetails} />
        <Stack.Screen name="Fertilization" component={Fertilization} />
        <Stack.Screen name="FertilizationDetails" component={FertilizationDetails} />
        <Stack.Screen name="SavedTemplatesScreen" component={SavedTemplatesScreen} />
        <Stack.Screen name="EditTemplate" component={EditTemplate} />
        <Stack.Screen name="ResizeMap" component={ResizeMap} />




        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
