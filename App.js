import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';

import Constants from 'expo-constants';
import  firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig';
import { AuthProvider } from './components/InfoProvider';



export default function App() {
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

  }
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <HomeScreen/>
      </NavigationContainer>
    </AuthProvider>
  );
}
