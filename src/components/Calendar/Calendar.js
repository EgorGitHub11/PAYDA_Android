import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, CalendarList, Agenda, CalendarTheme} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import Header from '../uikit/Header'
import {w,h} from '../../constants'

<Agenda
  items={{
    '2012-05-22': [{text: 'item 1 - any js object'}],
    '2012-05-23': [{text: 'item 2 - any js object'}],
    '2012-05-24': [],
    '2019-12-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
  }}
/>

export default class CalendarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {childMainContainer, mainContainer} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'КАЛЕНДАРЬ'}/>
        <View style={childMainContainer}>
          <Agenda/>
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
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  }
});
