import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';

import Header from '../uikit/Header'
import {w,h} from '../../constants'
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios'
import {mainUrl} from '../../config'
import moment from 'moment'



export default class CalendarEvents extends Component {
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.state = {
      selectedStartDate: null,
      selectedDayColor: null,
      pk:'',
      name:'',
      jwt:'',
      arr:[],
      selectedDatesEvents: []
    };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {pk,name,access_token} = dataJson
            this.setState(prevState => ({
              pk: prevState.pk + pk,
              name: prevState.name + name,
              jwt: prevState.jwt + access_token
            }))
            console.log('I am in showData' + ' ' + this.state.pk)
            return dataJson
        }
    } catch (error) {
        console.log(error)
    }
    }
    this.showData().then(() => this.getData())
  }

  getData(){
    const {pk,jwt,arrAgent} = this.state
    const url = mainUrl+`/api/calendar/`
    console.log(url)

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
          console.log(response.data) 
          this.setState({arr:response.data})
          console.log(this.state.arr)
      })
  }

  onDateChange(date) {
    const {arr} = this.state
    console.log(date._i)
    console.log(date._i.month)

    let currentDate = moment(`${date._i.year}/${date._i.month + 1}/${date._i.day}`).format('YYYY-MM-DD').toString();

    console.log(currentDate)

    let newDates = arr.filter( i => i.date == currentDate )
    // let data = {
    //   name: eventName,
    // }
    
    this.setState({
      selectedDatesEvents: newDates,
      selectedStartDate: newDates,
    });
    console.log(this.state.selectedDatesEvents)
  }

  render() {
    const {childMainContainer, mainContainer} = styles
    const { selectedStartDate, selectedDayColor, selectedDatesEvents} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'КАЛЕНДАРЬ'}/>

        <View style={childMainContainer}>

        <CalendarPicker 
        onDateChange={this.onDateChange}
        selectedDayColor="skyblue"
        />
        
        <View>
          {
              selectedDatesEvents.map( i => {
                return <Text> - {i.title}</Text>
              })
          }
        </View>

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

