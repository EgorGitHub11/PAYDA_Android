import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity,} from 'react-native';
import Header from '../Header/Header'
import {h,w} from '../../constants'

import CofC from '../uikit/certificateOfCompletion'
import DeliveryNote from '../uikit/deliveryNote'
import Invoice from '../uikit/invoice'
import IForPay from '../uikit/invoiceForPayment'
import Footer from '../uikit/footer'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {mainContainer, childMainContainer,bottomContainer} = styles
    return (
      <View style={mainContainer}>
        <StatusBar backgroundColor="grey"/>
        <Header/>
        <View style={childMainContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('invoiceForPayment')}>
              <IForPay/>
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

       <Footer/>

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
});
