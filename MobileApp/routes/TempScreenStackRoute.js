import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* importing screens */
import SavedTemplatesScreen from '../app/src/screens/TempScreens/SavedTemplatesScreen/SavedTemplatesScreen';
import SaveScreen from '../app/src/screens/TempScreens/SaveScreen/SaveScreen';
import ResizeMap from '../app/src/screens/TempScreens/ResizeMap/ResizeMap';
import TemplateView from '../app/src/screens/TempScreens/TemplateView/TemplateView';
import EditTemplate from '../app/src/screens/TempScreens/EditTemplate/EditTemplate';

const Stack = createNativeStackNavigator();

const TempScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SaveScreen' component={SaveScreen} />
        <Stack.Screen name='ResizeMap' component={ResizeMap} />
        <Stack.Screen name='TemplateView' component={TemplateView} />
        <Stack.Screen name='EditTemplate' component={EditTemplate} />
        <Stack.Screen
          name='SavedTemplatesScreen'
          component={SavedTemplatesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
