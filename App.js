import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';

import Constants from 'expo-constants';
<<<<<<< HEAD
=======
import  firebase from 'firebase/app'
>>>>>>> 640bea9bfc9ab211388793bf0edbfac55cef0242
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
