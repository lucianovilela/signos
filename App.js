import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import { AuthProvider } from './components/InfoProvider';
import "./firebaseConfig";

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <HomeScreen/>
      </NavigationContainer>
    </AuthProvider>
  );
}
