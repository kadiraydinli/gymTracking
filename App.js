import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Linking } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
//import * as Screens from "./app/screens";

export default class App extends Component<Props> {
  render() {
    return <Root />;
  }
}
global.url = "http://629a3d45.ngrok.io";

import LoginScreen from "./app/screens/LoginScreen";
import ExerciseScreen from "./app/screens/ExerciseScreen";
import ExerciseDetailScreen from "./app/screens/ExerciseDetailScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ResetPasswordScreen from "./app/screens/ResetPasswordScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import DietListScreen from "./app/screens/DietListScreen";

/*export const AppStackNavigator = createStackNavigator({
  Login : LoginScreen,
  Home : HomeScreen,
  Activities : ActivitiesScreen,
  ActivitiesDetail : ActivitiesDetailScreen,
  Diet : DietListScreen,
  ResetPassword : ResetPasswordScreen,
  Settings : SettingsScreen
});*/

export const Home = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Diet: { screen: DietListScreen },
    Profile: { screen: ProfileScreen },
    Exercise: { screen: ExerciseScreen },
    ExerciseDetail: { screen: ExerciseDetailScreen },
    ResetPassword: { screen: ResetPasswordScreen }
  },
  {
    initialRouteName: "Home", //Başlangıç ekranı hangisi olacağını ayarlar
    //order: ["Home", "Diet", "Login", "Settings"], //Görünüş sırası
    navigationOptions: {
      tabBarVisible: false,
      header: null
    }
    /*tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "gray"
    }*/
  }
);

export const Root = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
  /*PasswordRecovery: {
    screen: Screens.PasswordRecovery,
    navigationOptions: {
      header: null
    }
  }*/
});
