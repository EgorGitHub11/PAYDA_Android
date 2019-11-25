import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity,} from 'react-native';
import Header from '../Header/Header'
import {h,w} from '../../constants'

import CofC from '../uikit/certificateOfCompletion'
import DeliveryNote from '../uikit/deliveryNote'
import Invoice from '../uikit/invoice'
import IForPay from '../uikit/invoiceForPayment'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {mainContainer, childMainContainer,container, containerG} = styles
    return (
      <View style={mainContainer}>
        <StatusBar backgroundColor="grey"/>
        <Header/>
        <View style={childMainContainer}>
            <TouchableOpacity>
              <IForPay/>
            </TouchableOpacity>

            <TouchableOpacity>
              <Invoice/>
            </TouchableOpacity>

            <TouchableOpacity>
              <CofC/>
            </TouchableOpacity>

            <TouchableOpacity>
              <DeliveryNote/>
            </TouchableOpacity>
        </View>

        <View style={[containerG, {marginBottom: 5,}]}></View>
        <View style={containerG}></View>
        <View style={container}></View>
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
  bottomContainer:{
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
},
container:{
  backgroundColor: '#F03C49',
  width:w,
  height: h / 12
},
containerG:{
  backgroundColor: 'grey',
  width:w,
  height: h / 12,
},
});
