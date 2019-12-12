import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage} from 'react-native';
import Header from '../uikit/Header'
import {h,w} from '../../constants'

import axios from 'axios'
import {Button} from '../Sign_In/ui/Button'

import CofC from '../uikit/certificateOfCompletion'
import DeliveryNote from '../uikit/deliveryNote'
import Invoice from '../uikit/invoice'
import IForPay from '../uikit/invoiceForPayment'
import Footer from '../uikit/footer'



export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
      jwt: ''
    }
  }



  render() {
    const { username, error} = this.state
    const {mainContainer, childMainContainer,bottomContainer, errorText, emailText} = styles
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
    flexDirection:'row',
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
  }
});
