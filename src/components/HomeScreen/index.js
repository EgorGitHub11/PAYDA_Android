import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer,} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import invoiceForPayment from '../../screens/screen1/invoiceForPayment'
import invoice from '../../screens/screen2/invoice'
import certificateOfCompletion from '../../screens/screen3/certificateOfCompletion'
import deliveryNote from '../../screens/screen4/deliveryNote'
import HomeScreen from './HomeScreen';
import Inbox from '../Inbox/Inbox'
import Nofications from '../Notifications/Notifications'
import Profile from '../Profile/profile'
import CalendarEv from '../Calendar/Calendar'
import Chat from '../Chat/Chat'
import Agent from '../Agent/Agent'

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
      deliveryNote:{screen:deliveryNote},
      Inbox:{screen:Inbox},
      Profile:{screen:Profile},
      Nofications: {screen:Nofications},
      CalendarEv:{screen:CalendarEv},
      Chat:{screen:Chat},
      Agent: {screen:Agent}
    },
    {
      headerMode:'none',
      initialRouteName: 'Home'
    }
)


const AppConatiner = createAppContainer(AppNavigator)