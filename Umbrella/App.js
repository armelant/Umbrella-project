import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveRentalsScreen from './screens/ActiveRentalsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import UmbrellasScreen from './screens/UmbrellasScreen.js';
import VerifyEmailScreen from './screens/VerifyEmailScreen.js';
import BottomTabNavigator from './navigation/BottomTabNavigator.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SingupScreen from './screens/SignupScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SingupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
