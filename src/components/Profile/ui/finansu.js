import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {w,h} from '../../../constants'
import {stylesItemInbox} from '../../../constants'

export default class Finansu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={stylesItemInbox.mainContainer}>
        <Text style={stylesItemInbox.text}> МОИ ФИНАНСЫ </Text>
      </View>
    );
  }
}
