import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer,} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

export default class index extends Component {
  render() {
    return (
        <AppConatiner/>
    );
  }
}

const AppNavigator = createStackNavigator(
    
)


const AppConatiner = createAppContainer(AppNavigator)