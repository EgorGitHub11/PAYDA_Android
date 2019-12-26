import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {h,w} from '../../constants'


export default class invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>СЧЕТ ФАКТУРА</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width:w / 2.1,
    height: h / 3.6,
    margin:2,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:10,
    borderColor: '#273c75',
    borderTopStartRadius: 90,
    borderBottomEndRadius: 90
  },
  text:{
    textAlign:'center',
    fontSize: 18,
    color:'#2980b9'
  },
});
