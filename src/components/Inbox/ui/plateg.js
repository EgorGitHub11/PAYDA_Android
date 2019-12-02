import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {w,h} from '../../../constants'
import {stylesItemInbox} from '../../../constants'

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="account-balance-wallet" size={35} color="#F03C49" />;

export default class Plateg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={stylesItemInbox.mainContainer}>
        {myIcon}
        <Text style={stylesItemInbox.text}> Платежи </Text>
      </View>
    );
  }
}

