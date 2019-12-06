import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import Header from '../uikit/Header'
import {w,h} from '../../constants'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

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
           <Calendar
        //    markedDates={{
        //     '2019-12-16': {selected: true, marked: true, selectedColor: 'blue'},
        //     '2019-12-17': {marked: true},
        //     '2019-12-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //     '2019-12-19': {disabled: true, disableTouchEvent: true}
        //   }}
           />
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
