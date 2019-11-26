import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


import HomeScreen from '../HomeScreen/index'
import SignIn from './LoginUI'

export default class index extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const SignInNavigation = createStackNavigator(
    {
        Home:{screen:HomeScreen},
        SignIn: {screen:SignIn}
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignIn'
    }
)

const AppContainer = createAppContainer(SignInNavigation)
