import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';

import Constants from 'expo-constants';
import firebaseConfig from './firebaseConfig';
import { AuthProvider } from './components/InfoProvider';



export default function App() {
  
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <HomeScreen/>
      </NavigationContainer>
    </AuthProvider>
  );
}
