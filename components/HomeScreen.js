import * as React from "react";
import { useState, useContext } from "react";

import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ContextAuth from "./InfoProvider";
import LoginScreen from "./LoginScreen";
import SignoScreen from "./SignoScreen";
import ListScreen from "./ListScreen";

import style from "./AppStyle";



const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  return (
    <View style={style.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Signo"
            component={SignoScreen}
            options={{
              title: "Signo",
            }}
          />
          <Tab.Screen
            name="Lista"
            component={ListScreen}
            options={{
              title: "Lista",
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
    </View>
  );
}

export default HomeScreen;
