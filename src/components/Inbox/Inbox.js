import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../uikit/Header'

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Header/>
        <Text> Inbox </Text>
      </View>
    );
  }
}
