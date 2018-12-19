import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Linking } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import * as Screens from "./app/screens";

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
global.url = "https://gymtrackingapp.herokuapp.com/api/";

export const Home = createStackNavigator({
  Home: {
    screen: Screens.HomeScreen
  }
});

export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Diet: { screen: Screens.DietListScreen },
    Profile: { screen: Screens.ProfileScreen },
    Exercise: { screen: Screens.ExerciseScreen }
    //ResetPassword: { screen: Screens.ResetPasswordScreen }
  },
  {
    //initialRouteName: "Home", //Başlangıç ekranı hangisi olacağını ayarlar
    //order: ["Home", "Diet", "Login", "Settings"], //Görünüş sırası
    navigationOptions: {
      tabBarVisible: false,
      header: null
    }
  }
);

export const Root = createStackNavigator({
  Login: {
    screen: Screens.LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  ResetPassword: {
    screen: Screens.ResetPasswordScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  ExerciseDetail: { screen: Screens.ExerciseDetailScreen }
});
