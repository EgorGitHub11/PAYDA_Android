import React, { Component } from 'react';
import { View, Text,  StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native';
import io from 'socket.io-client/dist/socket.io'
import {w,h} from '../../constants'
import Header from '../uikit/Header'
import {Button} from './ui'
import Bbtn from '../uikit/mainBigBtn'
import {mainUrlWs} from '../../config'

//var ws = new WebSocket('ws://0.0.0.0:8000/ws/chat/');

var ws;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      connected: false,
      pk: '',
      name: ''
    };
  }

  componentDidMount() {

      this.showData = async () => {
        try {
          const value = await AsyncStorage.getItem('key');
          if (value !== null) {
              const dataJson = JSON.parse(value)
              const {pk,name} = dataJson
              this.setState(prevState => ({
                pk: prevState.pk + pk,
                name: prevState.name + name
              }))
              console.log('I am in showData' + ' ' + this.state.pk)
              // console.log( dataJson);
              return dataJson
          }
      } catch (error) {
          console.log(error)
      }
      }
      this.showData().then(() => this.handleWebSockets())
}



handleWebSockets = () => { 
  const pk = this.state.pk
  console.log('I am in handleWebSockets' + ' ' + pk)
  const url = mainUrlWs+`/ws/chat/${pk}/`

  ws = new WebSocket(url);

    ws.onopen = () => {
    this.setState(prevState => ({
      connected: prevState.connected = true,
    }))
    console.log('connection' + ' ' + this.state.connected)
  };



  ws.onmessage = (e) => {
    console.log('new message')
    console.log(typeof(JSON.parse(e.data)) + ' ' + 'E DATAAAAAAAAAA');
    var jsonData = JSON.parse(e.data)
    console.log(jsonData);
    this.setState({ chatMessages: jsonData});
    console.log(jsonData,'data json')
  };


  ws.onerror = (e) => {
    this.setState(prevState => ({
      connected: prevState.connected = false,
    }))
    console.log(e.message);
  };
};


submitChatMessage() {
  ws.send(this.state.chatMessage);
  this.state.chatMessages.push(this.state.chatMessage);
  this.setState({chatMessage: ''});
}


  render() {
    const {chatMessages, name} = this.state
    const {mainContainer, container, input, btn, containerInputAndButton,notifyClient, notifyAdmin,
      notifyInside, notifyInsideInfText, notifyInsideBlock,
      notifyText,notifyDateAndFromWho} = styles
  return (
  
      <View  style={mainContainer}>

        <Header name="СООБЩЕНИЯ"/>
          <View style={container}>

            <ScrollView>
                {chatMessages.map(msg => (
                console.log(msg),
                msg.from_client === true 
                ? 
                <View style={{justifyContent: 'center', alignItems:'flex-end'}}>
                <View style={notifyClient}>
                <View style={notifyInsideBlock}>
                    <View style={notifyInside}>
                      <Text style={notifyDateAndFromWho}>{msg.date}</Text>
                    </View>
                    <View style={notifyInside}>
                    <Text style={notifyDateAndFromWho}>Я</Text>
                    </View>
                </View>

                <View style={notifyInsideInfText}>
                  <Text style={notifyText}>{msg.message}</Text>
                </View>
            </View>
            </View>
                : 
                <View style={{justifyContent: 'flex-start'}}>
                      <View style={notifyAdmin}>
                      <View style={notifyInsideBlock}>
                      <View style={notifyInside}>
                      <Text style={notifyDateAndFromWho}>{msg.date}</Text>
                      </View>
                      <View style={notifyInside}>
                      <Text style={notifyDateAndFromWho}>{name}</Text>
                      </View>
                      </View>

                      <View style={notifyInsideInfText}>
                      <Text style={notifyText}>{msg.message}</Text>
                      </View>
                      </View>
                </View>
              
                ))}
            </ScrollView>
          </View>
              <View style={containerInputAndButton}>
                  <TextInput
                      style={input}
                      placeholder='напишите..'
                      value={this.state.chatMessage}
                      onChangeText={chatMessage => {
                        this.setState({chatMessage})
                      }}
                  />
                  <Bbtn onPress={() => this.submitChatMessage()}
                        style={btn}>
                    <Text>Send</Text>
                  </Bbtn>
              </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container:{
    width:w,
    flex:1,
    backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  mainContainer:{
    flex:8,
    backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  input:{
      width:w,
      height: 40,
      direction: 'rtl',
      backgroundColor: '#fff',
      color: '#000',
  },
  btn:{
    backgroundColor:'red'
  },
  containerInputAndButton:{
    width:w,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  notifyClient:{
    width: w /2 ,
    height: 'auto',
    backgroundColor: '#EEEFF3',
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:'#fff',
    borderRadius:25,
    padding:10
  },
  notifyAdmin:{
    width: w / 2,
    height: 'auto',
    backgroundColor: 'lightgreen',
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:'#fff',
    borderRadius:25,
    padding:10
  },
  notifyInside:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  notifyInsideBlock:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
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
})