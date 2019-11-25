import React, { Component } from 'react';
import { 
    Text, StyleSheet, TextInput, 
    TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, View
} from 'react-native';

import Toast from 'react-native-tiny-toast'
import {h,w} from '../../constants'

export default class LoginLogic extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
 
  render() {
    const {input, containerTitle, container, buttonContainer, buttonText, title} = styles
    return (
      <KeyboardAvoidingView behavior="padding" style={container}>
        <View style={containerTitle}>
          <Text style={title}>ПАЙДАБУХГАЛТЕРИЯ</Text>
        </View>
        <ScrollView>
          <TextInput 
          placeholder='Введите номер'
          style={input}/> 

          <TextInput 
          placeholder='Введите пароль'
          style={input}/>

          <TouchableOpacity onPress={() => {Toast.showSuccess('Cool!')}}
          style={buttonContainer}>
            <Text style={buttonText}>
                ВОЙТИ
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      padding: 20,
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
    },
    buttonContainer:{
      marginTop: 10,
      backgroundColor: '#528156',
      paddingVertical: 15,
      shadowColor: '#000',
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.4,
      elevation: 3,
      marginBottom: 10
    },
    buttonText:{
      textAlign: 'center',
      color: '#fff',
      fontWeight: '700'
    },
    containerTitle:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize:35,
      paddingBottom: h / 20
    }
});