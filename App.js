import React, {Component} from 'react';
import {} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import LoginScreen from "./components/screens/LoginScreen";
import ActivitiesScreen from "./components/screens/ActivitiesScreen";
import ActivitiesDetailScreen from "./components/screens/ActivitiesDetailScreen";
import DietListScreen from "./components/screens/DietListScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import SettingsScreen from "./components/screens/SettingsScreen";

export default class App extends Component{
  render() {
    return <AppStackNavigator/>
  }
}

export const AppStackNavigator = createStackNavigator({
  Login : LoginScreen,
  Home : HomeScreen,
  Activities : ActivitiesScreen,
  ActivitiesDetail : ActivitiesDetailScreen,
  Diet : DietListScreen,
  ResetPassword : ResetPasswordScreen,
  Settings : SettingsScreen
});