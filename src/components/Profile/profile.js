import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Finansu from './ui/finansu'
import Calendar from './ui/calendar'
import Agent from './ui/agent'
import Message from './ui/message'

import Header from '../uikit/Header'

import {w,h} from '../../constants'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {childMainContainer, mainContainer} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'МОЙ ПРОФИЛЬ'}/>
        <View style={childMainContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('')}>
              <Finansu navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('CalendarEv') }> 
              <Calendar navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('') }>
              <Agent navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('') }>
              <Message navigation={this.props.navigation}/>
            </TouchableOpacity>
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