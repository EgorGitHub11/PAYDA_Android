import React, { Component } from 'react';
import { 
    Text, StyleSheet, TextInput, 
    TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, View
} from 'react-native';

import Toast from 'react-native-tiny-toast'
import {h,w} from '../../constants'
import Icon from 'react-native-vector-icons/MaterialIcons';


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
          <Text style={title}>
            <Text style={{color:'red'}}>ПАЙДА</Text>
            <Text style={{color:'grey'}}>БУХГАЛТЕРИЯ</Text>
          </Text>
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
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20,
      direction: 'rtl',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      color: '#000',
      paddingHorizontal: 10,
    },
    buttonContainer:{
      marginTop: 10,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'grey',
      paddingVertical: 15,
    },
    buttonText:{
      textAlign: 'center',
      color: 'grey',
      fontSize: 20,
    },
    containerTitle:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize:35,
      paddingBottom: h / 15
    }
});