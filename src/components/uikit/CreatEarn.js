import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, FlatList } from 'react-native';

import Reinput from 'reinput'
import axios from 'axios'

import Header from './Header'
import Footer from './footer'
import {Input,Button,Loading} from '../Money/ui'
import BButton from './mainBigBtn'
import {w,h} from '../../constants'
import {mainUrl} from '../../config'
import DatePicker from 'react-native-datepicker'


export default class CreateEarn extends Component {
  constructor(props) {
    super(props);
    this.postData = this.postData.bind(this)
    this.state = {
        loading: false,
        date: '',
        money: '',
        name:'',
        jwt:'',
        flag: true,
    };
  }

  componentDidMount(){
    this.showData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            const dataJson = JSON.parse(value)
            const {access_token} = dataJson
            this.setState(prevState => ({
              jwt: prevState.jwt + access_token
            }))
            return dataJson
        }
    } catch (error) {
        console.log(error)
    }
    }
    this.showData()
  }

  postData(){
    const {date,money,name,flag,jwt} = this.state
    const url = mainUrl+`/api/finance/`
  
    axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
    axios.post(url, {
      date: date,
      money: money,
      name: name,
      flag: flag
    })
    .then(function (response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        console.log('ura!')
      }
    })
    .then(() => {
        this.setState({date: ""})
        this.setState({money: ""})
        this.setState({name: ""})
    })
    .then(() => {
      this.props.navigation.navigate('Money')
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }



  
  render() {
    const {date,money,name,loading} = this.state
    const {mainContainer, titleBlock, formBlock, titleText, addBlock, mainBtn} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'СОЗДАТЬ ЧЕК'}/>
            <View style={formBlock}>
               <View style={addBlock}>
                <Text style={titleText}>Заполните поля</Text>
              </View>
              <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="выберете дату"
        format="YYYY-MM-DD"
        minDate="2019-12-01"
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
              <Reinput
              label="Сумма"
              value={money}
              onChangeText = {money => this.setState({money})}
              />
               <Reinput
              label="Наименование"
              value={name}
              onChangeText = {name => this.setState({name})}
              />
              <View style={mainBtn}>
              {!loading ?
                <Button onPress={() => this.postData()}>
                  <Text style={{fontSize:24}}>Отправить</Text>
                </Button>
                :
                <Loading size={'large'} />
              }
              </View> 
            </View>
 
        <Footer navigation={this.props.navigation}/>                                                          
      </View>
    );
  }
}



const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: '#fff',
  },
  titleBlock:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor: '#F03C49'
  }, 
  formBlock:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'column',
    padding: 20
  },
  addBlock:{
    width:w,
    justifyContent:'center',
    alignItems:'center',
  },
  titleText:{
    fontSize:24,
    paddingVertical:5
  },
  mainBtn:{
    justifyContent:'center',
    alignItems:'center',
  },
  itemsContainer:{
      maxWidth: w ,
      paddingVertical: 15,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      borderRadius: 16,
      elevation: 8,
      marginBottom: 10
  },

  itemsText:{
    fontSize: 20,
    color: 'grey',
    padding:10
  }
});