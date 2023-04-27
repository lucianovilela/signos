import * as React from 'react';
import { useState, useContext } from 'react';

import { View, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, ThemeProvider } from 'react-native-elements';

import ContextAuth from './InfoProvider';
//import LoginScreen from "./LoginScreen";
import SignoScreen from './SignoScreen';
import ListScreen from './ListScreen';

import style from './AppStyle';
/*
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
*/
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  return (
    <ThemeProvider>
      <SafeAreaView style={style.container}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="signs"
            component={SignoScreen}
            options={{
              title: 'signs',
              tabBarIcon: () => <Icon name="search" size={20} />,
            }}
          />
          <Tab.Screen
            name="Lista"
            component={ListScreen}
            options={{
              title: 'history',
              tabBarIcon: () => <Icon type="material" name="list" size={20} />,
            }}
          />
          {/*
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
            }}
          />
          */}
        </Tab.Navigator>
        {
/*
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
  */
        }
      </SafeAreaView>
    </ThemeProvider>
  );
}
export default HomeScreen;
