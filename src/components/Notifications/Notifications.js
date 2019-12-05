import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Header from '../uikit/Header'

import {w,h} from '../../constants'

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {childMainContainer, mainContainer} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'УВЕДОМЛЕНИЯ'}/>
        <View style={childMainContainer}>
            
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  childMainContainer:{
    flex:1,
    width:w,
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent: 'center',
    flexWrap:'wrap'
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
  }
});