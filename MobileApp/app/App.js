// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import { IconButton } from 'react-native-paper';
import SplashScreen from './src/screens/splashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import Otp from './src/screens/Otp';
import CreateNewPassword from './src/screens/CreateNewPassword';
import Home from './src/screens/Home';
import WalkaroundLand from './src/screens/WalkaroundLand';
import Fence from './src/screens/Fence';
import FenceDetails from './src/screens/FenceDetails';

/* Template screens importing */
import SaveScreen from './src/screens/TempScreens/SaveScreen/SaveScreen';
import ResizeMap from './src/screens/TempScreens/ResizeMap/ResizeMap';
import TemplateView from './src/screens/TempScreens/TemplateView/TemplateView';
import EditTemplate from './src/screens/TempScreens/EditTemplate/EditTemplate';
import SavedTemplatesScreen from './src/screens/TempScreens/SavedTemplatesScreen/SavedTemplatesScreen';

import PointAddingScreen from './src/screens/PointAddingScreen/PointAddingScreen';

import Fertilization from './src/screens/Fertilization';
import PlantationDetails from './src/screens/PlantationDetails';
import FertilizationDetails from './src/screens/FertilizationDetails';
import Plantation from './src/screens/Plantation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide-in/slide-out animation
        }}
      >
        <Stack.Screen name='splashScreen' component={SplashScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Forgot' component={ForgotPassword} />
        <Stack.Screen name='Otp' component={Otp} />
        <Stack.Screen name='NewPassword' component={CreateNewPassword} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='WalkaroundLand' component={WalkaroundLand} />
        <Stack.Screen name='Fence' component={Fence} />
        <Stack.Screen name='FenceDetails' component={FenceDetails} />
        {/* Template Screens */}
        <Stack.Screen
          name='SavedTemplatesScreen'
          component={SavedTemplatesScreen}
        />
        <Stack.Screen name='SaveScreen' component={SaveScreen} />
        <Stack.Screen name='ResizeMap' component={ResizeMap} />
        <Stack.Screen name='TemplateView' component={TemplateView} />
        <Stack.Screen name='EditTemplate' component={EditTemplate} />
        <Stack.Screen name='Plantation' component={Plantation} />
        <Stack.Screen name='PlantationDetails' component={PlantationDetails} />
        <Stack.Screen name='Fertilization' component={Fertilization} />
        <Stack.Screen
          name='FertilizationDetails'
          component={FertilizationDetails}
        />

        <Stack.Screen name='PointAddingScreen' component={PointAddingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
