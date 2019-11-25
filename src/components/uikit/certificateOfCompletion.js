import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import{w,h} from '../../constants'

export default class certificateOfCompletion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>АКТ ВЫПЛНЕНЫХ РАБОТ</Text>
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
    borderColor: 'grey',
    borderTopStartRadius: 90,
    borderBottomEndRadius: 90
  },
  text:{
    textAlign:'center',
    fontSize: 22,
    color:'gray'
  },
});