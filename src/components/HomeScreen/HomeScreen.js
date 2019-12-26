import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage,ScrollView, Image} from 'react-native';
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
import {mainUrl} from '../../config'
import { SimpleAnimation } from 'react-native-simple-animations';



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
    const url = mainUrl+`/api/clientNotifications/${pk}/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
        this.setState({arrNotify: response.data})
        console.log(this.state.arrNotify + ' ' + 'cool')
      })
      setTimeout( () => {
        this.getData()
      },60000)
  }



  render() {
    const { username, error, arrNotify, name} = this.state
    const {mainContainer, childMainContainer,bottomContainer, errorText, emailText,notiffy, 
      notifyInside, notifyInsideInfText, notifyInsideBlock,
      notifyText,notifyDateAndFromWho, notifyBlockk, logo} = styles
    return (
      <View style={mainContainer}>
        <StatusBar backgroundColor="#273c75"/>
        <Header navigation={this.props.navigation} name={'БУХГАЛТЕРИЯ'}/>
        <View style={childMainContainer}>
          
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('invoiceForPayment')}>
              <IForPay navigation={this.props.navigation}/>
            </TouchableOpacity>
        </SimpleAnimation>

        <SimpleAnimation delay={1100} duration={1000} fade staticType='zoom'>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('invoice') }> 
              <Invoice/>
            </TouchableOpacity>
        </SimpleAnimation>

        <SimpleAnimation delay={900} duration={1000} fade staticType='zoom'>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('certificateOfCompletion') }>
              <CofC/>
            </TouchableOpacity>
        </SimpleAnimation>

        <SimpleAnimation delay={700} duration={1000} fade staticType='zoom'>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('deliveryNote') }>
              <DeliveryNote/>
            </TouchableOpacity>
        </SimpleAnimation>
        </View>

        <View style={notifyBlockk}>
              <ScrollView>
              {
                 arrNotify.reverse(),
                arrNotify.length != 0 ?
              arrNotify.map(notify => (
              console.log(notify),
              <View style={notiffy}>
                   <View style={notifyInsideInfText}>
              <Text style={notifyText}>{notify.message}</Text>
              </View>
              <View style={notifyInsideBlock}>
                  <View style={notifyInside}>
                  <Text style={notifyDateAndFromWho}>{notify.created}</Text>
                  </View>
              </View>
          </View>
            ))
            :
            <View style={notifyBlockk}>
              {/* <Image style={logo} source={require('../../logo/empty.png')}/> */}
              <Text style={{fontSize:20, color:'grey'}}>Нет уведомлений</Text>
            </View>
            }
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
    backgroundColor: '#fff',
    paddingHorizontal:10
  },
  notifyBlockk:{
    height: h / 6,
    flexDirection: 'column-reverse',
    justifyContent:'center',
    alignItems: 'center',
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
  },
  logo:{
    width:60,
    height:60
  }
});
