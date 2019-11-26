import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer,} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import invoiceForPayment from '../screen1/invoiceForPayment'
import invoice from '../screen2/invoice'
import certificateOfCompletion from '../screen3/certificateOfCompletion'
import deliveryNote from '../screen4/deliveryNote'
import HomeScreen from './HomeScreen';

export default class index extends Component {
  render() {
    return (
        <AppConatiner/>
    );
  }
}

const AppNavigator = createStackNavigator(
    {
      Home:{screen:HomeScreen},
      invoiceForPayment:{screen:invoiceForPayment},
      invoice:{screen:invoice},
      certificateOfCompletion:{screen:certificateOfCompletion},
      deliveryNote:{screen:deliveryNote}
    },
    {
      headerMode:'none',
      initialRouteName: 'Home'
    }
)


const AppConatiner = createAppContainer(AppNavigator)