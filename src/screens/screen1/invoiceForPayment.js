import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Divider } from 'react-native-material-ui';

export default class invoiceForPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navIndex: 0,
    };
  }

  render() {
    return(
     <View>
       <Text>Test</Text>
     </View>
    );
  }
}
