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
global.url = "http://3d5afff0.ngrok.io";

import LoginScreen from "./app/screens/LoginScreen";
import ActivitiesScreen from "./app/screens/ActivitiesScreen";
import ActivitiesDetailScreen from "./app/screens/ActivitiesDetailScreen";
import DietListScreen from "./app/screens/DietListScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ResetPasswordScreen from "./app/screens/ResetPasswordScreen";
import SettingsScreen from "./app/screens/SettingsScreen";

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
    Settings: { screen: SettingsScreen },
    Activities: { screen: ActivitiesScreen },
    ActivitiesDetail: { screen: ActivitiesDetailScreen },
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
