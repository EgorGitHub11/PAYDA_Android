import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import HomeScreen from '../HomeScreen/index'
import SplashScreen from './SplashScreen'

export default class index extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const SplashNvigation = createStackNavigator(
    {
        Home:{screen:HomeScreen},
        SplashScreen:{screen:SplashScreen}
    },
    {
        headerMode: 'none',
        initialRouteName:'SplashScreen'
    }
)

const AppContainer = createAppContainer(SplashNvigation)
