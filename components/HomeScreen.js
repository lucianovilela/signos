import * as React from "react";
import { useState, useContext } from "react";

import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ContextAuth from "./InfoProvider";
import BarcodeScreen from "./BarcodeScreen";
import LoginScreen from "./LoginScreen";

import style from "./AppStyle";


import { createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  return (
    <View style={style.container}>
      {authContext.state.isSignout ? (
        <LoginScreen />
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="BarCode"
            component={BarcodeScreen}
            options={{
              title: "Barcode",
            }}
          />

          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
            }}
          />
        </Tab.Navigator>
      )}
    </View>
  );
}

export default HomeScreen;
