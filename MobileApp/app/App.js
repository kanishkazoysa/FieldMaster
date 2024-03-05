// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import RegisterScreen from "./src/screens/AuthScreens/RegisterScreen";
import LoginScreen from "./src/screens/AuthScreens/LoginScreen";
import { IconButton } from "react-native-paper";
import SplashScreen from "./src/screens/splashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ForgotPassword from "./src/screens/AuthScreens/ForgotPassword";
import Otp from "./src/screens/AuthScreens/Otp";
import CreateNewPassword from "./src/screens/AuthScreens/CreateNewPassword";
import Home from "./src/screens/Home";
import WalkaroundLand from "./src/screens/WalkaroundLand";
import Fence from "./src/screens/Fence";
import FenceDetails from "./src/screens/FenceDetails";

/* Template screens importing */


import SaveScreen from "./src/screens/TempScreens/SaveScreen/SaveScreen";
import ResizeMap from "./src/screens/TempScreens/ResizeMap/ResizeMap";
import TemplateView from "./src/screens/TempScreens/TemplateView/TemplateView";
import EditTemplate from "./src/screens/TempScreens/EditTemplate/EditTemplate";
import SavedTemplatesScreen from "./src/screens/TempScreens/SavedTemplatesScreen/SavedTemplatesScreen";


import Fertilization from "./src/screens/Fertilization";
import PlantationDetails from "./src/screens/PlantationDetails";
import FertilizationDetails from "./src/screens/FertilizationDetails";
import Plantation from "./src/screens/Plantation";
import Clearland from './src/screens/Clearland';
import EffortOutput from './src/screens/EffortOutput';


import testScreen from "./src/screens/testScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TemplatesScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide-in/slide-out animation
        }}
      >
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="NewPassword" component={CreateNewPassword} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WalkaroundLand" component={WalkaroundLand} />
        <Stack.Screen name="Fence" component={Fence} />
        <Stack.Screen name="FenceDetails" component={FenceDetails} />
        <Stack.Screen name="SaveScreen" component={SaveScreen} />
        <Stack.Screen name="ResizeMap" component={ResizeMap} />
        <Stack.Screen name="TemplateView" component={TemplateView} />
        <Stack.Screen name="EditTemplate" component={EditTemplate} />
        <Stack.Screen
          name="SavedTemplatesScreen"
          component={SavedTemplatesScreen}
        />
        <Stack.Screen name="Plantation" component={Plantation} />
        <Stack.Screen name="PlantationDetails" component={PlantationDetails} />
        <Stack.Screen name="Fertilization" component={Fertilization} />
        <Stack.Screen
          name="FertilizationDetails"
          component={FertilizationDetails}
        />

<Stack.Screen
          name="Clearland"
          component={Clearland}
          
        />

<Stack.Screen
          name="EffortOutput"
          component={EffortOutput}
          
        />

        <Stack.Screen name="testScreen" component={testScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
