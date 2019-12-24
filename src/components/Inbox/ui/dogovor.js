import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {w,h} from '../../../constants'
import {stylesItemInbox} from '../../../constants'

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="description" size={35} color="#2980b9" />;

export default class Dogovor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={stylesItemInbox.mainContainer}>
        {myIcon}
        <Text style={stylesItemInbox.text}> Договора </Text>
      </View>
    );
  }
}

