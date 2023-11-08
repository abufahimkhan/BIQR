import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from './Screens/UserScreen';
import PoliceScreen from './Screens/PoliceScreen';
import LandingPage from './Screens/LandingPage';
import OCRLicence from './Screens/OCRLicence';
import OCRRegistration from './Screens/OCRRegistration';
import OCRTax from './Screens/OCRTax';
import UserLoginScreen from './Screens/UserLoginScreen';
import UserSignupScreen from './Screens/UserSignupScreen';
import PoliceSignupScreen from './Screens/PoliceSignupScreen';
import PoliceLoginScreen from './Screens/PoliceLoginScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
        

        <Stack.Screen name="landing_page" options={{headerShown: false}} component={LandingPage}/>
        <Stack.Screen name="signup_user" options={{headerShown: false}} component={UserSignupScreen}/>
        <Stack.Screen name="login_user" options={{headerShown: false}} component={UserLoginScreen} />
        <Stack.Screen name="signup_police" options={{headerShown: false}} component={PoliceSignupScreen}/>
        <Stack.Screen name="login_police" options={{headerShown: false}} component={PoliceLoginScreen} />
        <Stack.Screen name="ocr_license" options={{headerShown: false}} component={OCRLicence} />
        <Stack.Screen name="ocr_registration" options={{headerShown: false}} component={OCRRegistration} />
        <Stack.Screen name="ocr_taxtoken" options={{headerShown: false}} component={OCRTax} />
        <Stack.Screen name="user_screen" options={{headerShown: false}} component={UserScreen} />
        <Stack.Screen name="police_screen" options={{headerShown: false}} component={PoliceScreen}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
