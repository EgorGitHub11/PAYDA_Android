import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';

import Header from '../uikit/Header'
import io from 'socket.io-client/dist/socket.io'
import {w,h} from '../../constants'
import axios from 'axios'

var ws;

export default class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNotify: [],
      name: '',
      pk: '',
      jwt:'',
      connected: false
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

  // handleWebSockets = () => { 
  //   const pk = this.state.pk
  //   console.log('I am in handleWebSockets' + ' ' + pk)
  //   const url = `ws://192.168.31.237:8001/ws/chat/notify/${pk}/`
  
  //     ws = new WebSocket(url);
  
  //     ws.onopen = () => {
  //     this.setState(prevState => ({
  //       connected: prevState.connected = true,
  //     }))
  //     console.log('connection' + ' ' + this.state.connected)
  //   };
  
  
  
  //   ws.onmessage = (e) => {
  //     console.log('new notify')
  //     console.log(typeof(JSON.parse(e.data)) + ' ' + 'E DATAAAAAAAAAA');
  //     var jsonData = JSON.parse(e.data)
  //     console.log(jsonData);
  //     this.setState({ arrNotify: jsonData});
  //     console.log(jsonData,'data json')
  //   };
  
  
  //   ws.onerror = (e) => {
  //     this.setState(prevState => ({
  //       connected: prevState.connected = false,
  //     }))
  //     console.log(e.message);
  //   };
  // };


  getData(){
    const {pk,jwt} = this.state
    const url = `http://192.168.31.237:8000/api/clientNotifications/${pk}/`

      axios.defaults.headers.common['Authorization'] = 'Token ' + jwt;
      axios.get(url)
      .then((response) => {
        this.setState({arrNotify: response.data})
        console.log(this.state.arrNotify + ' ' + 'cool')
      })
  }


  render() {

    const {arrNotify, name} = this.state

    const {childMainContainer, mainContainer, notiffy, 
           notifyInside, notifyInsideInfText, notifyInsideBlock,
           notifyText,notifyDateAndFromWho} = styles
    return (
      <View style={mainContainer}>
         <Header navigation={this.props.navigation} name={'УВЕДОМЛЕНИЯ'}/>
        <View style={childMainContainer}>
          {
            arrNotify.map(notify => (
              console.log(notify),
              <View style={notiffy}>
              <View style={notifyInsideBlock}>
                  <View style={notifyInside}>
                  <Text style={notifyDateAndFromWho}>{notify.created}</Text>
                  </View>
                  <View style={notifyInside}>
                  <Text style={notifyDateAndFromWho}>{name}</Text>
                  </View>
              </View>

              <View style={notifyInsideInfText}>
              <Text style={notifyText}>{notify.message}</Text>
              </View>
          </View>

            ))}
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
  },
  notiffy:{
    width: w,
    height: 'auto',
    backgroundColor: '#EEEFF3',
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  notifyInside:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  notifyInsideBlock:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10
  },
  notifyInsideInfText:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:10,
    marginTop:20,
    marginBottom:20
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