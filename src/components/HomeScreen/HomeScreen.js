import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage,ScrollView} from 'react-native';
import Header from '../uikit/Header'
import {h,w} from '../../constants'

import axios from 'axios'
import {Button} from '../Sign_In/ui/Button'

import CofC from '../uikit/certificateOfCompletion'
import DeliveryNote from '../uikit/deliveryNote'
import Invoice from '../uikit/invoice'
import IForPay from '../uikit/invoiceForPayment'
import Footer from '../uikit/footer'
import { array } from 'prop-types';



export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
      jwt: '',
      arrNotify: [],
      name: '',
      pk: '',
    }
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
    const {pk,jwt} = this.state
    const url = `http://192.168.31.237:8000/api/clientNotifications/${pk}/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
        this.setState({arrNotify: response.data})
        console.log(this.state.arrNotify + ' ' + 'cool')
      })
      setTimeout( () => {
        this.getData()
      },1000)
  }



  render() {
    const { username, error, arrNotify, name} = this.state
    const {mainContainer, childMainContainer,bottomContainer, errorText, emailText,notiffy, 
      notifyInside, notifyInsideInfText, notifyInsideBlock,
      notifyText,notifyDateAndFromWho, notifyBlockk} = styles
    return (
      <View style={mainContainer}>
        <StatusBar backgroundColor="grey"/>
        <Header navigation={this.props.navigation} name={'БУХГАЛТЕРИЯ'}/>
        <View style={childMainContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('invoiceForPayment')}>
              <IForPay navigation={this.props.navigation}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('invoice') }> 
              <Invoice/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('certificateOfCompletion') }>
              <CofC/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('deliveryNote') }>
              <DeliveryNote/>
            </TouchableOpacity>
        </View>

        <View style={notifyBlockk}>
              <ScrollView>
              {
              arrNotify.reverse(),
              arrNotify.map(notify => (
              console.log(notify),
              <View style={notiffy}>
              <View style={notifyInsideBlock}>
                  <View style={notifyInside}>
                  <Text style={notifyDateAndFromWho}>{notify.created}</Text>
                  </View>
              </View>

              <View style={notifyInsideInfText}>
              <Text style={notifyText}>{notify.message}</Text>
              </View>
          </View>

            ))}
              </ScrollView>
            </View>

       <Footer navigation={this.props.navigation}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  childMainContainer:{
    flex:1,
    backgroundColor:'#fff',
    flexDirection:'column',
    justifyContent:'center',
    alignContent: 'center',
    flexWrap:'wrap'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  notiffy:{
    width: w,
    height: 'auto',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEEFF3',
  },
  notifyBlockk:{
    height: h / 6,
    flexDirection: 'column-reverse',
    justifyContent:'center',
    alignItems: 'center'
  },
  notifyInside:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  notifyInsideBlock:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10,
  },
  notifyInsideInfText:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:20,
    marginBottom:20,
    marginRight:20,
  },
  notifyText:{
    fontSize:20,
    color:'black'
  },
  notifyDateAndFromWho:{
    fontSize:17,
    color:'grey'
  }
});
