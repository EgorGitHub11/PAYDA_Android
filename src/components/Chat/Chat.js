import React, { Component } from 'react';
import { View, Text,  StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client/dist/socket.io'
import {w,h} from '../../constants'
import Header from '../uikit/Header'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("ws://0.0.0.0:8000/ws/chat/", {json:false});
    console.log(this.socket)
    this.socket.on("chat message", msg => {
           this.setState({ chatMessages: [...this.state.chatMessages, msg]   
      });
   });
 }

submitChatMessage() {
  this.socket.emit('chat message', this.state.chatMessage);
  this.setState({chatMessage: ''});
}

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
    ));
    const {mainContainer, container, input} = styles
    return (
      <View  style={mainContainer}>
        <Header name="ЧАТ"/>
          <View style={container}>
          {chatMessages}
          <KeyboardAvoidingView behavior="padding" enabled>
              <TextInput
                  style={input}
                  placeholder='type..'
                  value={this.state.chatMessage}
                  onSubmitEditing={() => this.submitChatMessage()}
                  onChangeText={chatMessage => {
                    this.setState({chatMessage})
                  }}
              />
            </KeyboardAvoidingView>
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
    flex:1,
    backgroundColor: 'grey',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center'
  },
  input:{
    height: 40,
      margin: 20,
      direction: 'rtl',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      color: '#000',
      paddingHorizontal: 10,
  }
})