import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import SignIn from '../Sign_In/LoginUI'
import SplashScreen from './SplashScreen'
import HomeScreen from '../HomeScreen/index'

export default class index extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const SplashNvigation = createStackNavigator(
    {
        SignIn:{screen:SignIn},
        SplashScreen:{screen:SplashScreen},
        Home:{screen:HomeScreen}
    },
    {
        headerMode: 'none',
        initialRouteName:'SplashScreen'
    }
)

const AppContainer = createAppContainer(SplashNvigation)
